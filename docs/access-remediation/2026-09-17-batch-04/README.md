# Access remediation batch 04

Reviewed September 17, 2026 under the [step-by-step access point remediation runbook](../../access-point-remediation-runbook.md). The ten physical sites were frozen from the cached quality-audit queue before the source review. The audit snapshot is stale because the workspace is missing `@paddletoday/geo`, so every candidate was checked against current official sources before a decision.

Two coordinates were corrected from published source geometry/GPS: Fertile Mill Park from Iowa DNR FeatureServer object 275, and Sayre PFBC from the 2021 North Branch guide. The Stuyvesant Falls candidate could not be verified as a lawful public launch and its route is held. Seven other locations remain documented access-area, parking, carry, or facility anchors; their larger hydrography offsets do not justify snapping them to water. Review all ten findings and reopening conditions in [review.json](review.json); the source retrievals, URLs, retrieval results, and hashes are in [source-metadata.json](source-metadata.json).

The Fertile and Sayre source coordinates are now correct in route and trip-detail records. Those three routes remain temporarily withheld until route geometry and served catalog assets can be regenerated. The canonical geometry generator stops before processing any route because `@paddletoday/geo` is absent. The corrected Iowa source snapshot is valid JSON and matches object 275; an earlier malformed HTML directory response was rejected and is not used as coordinate evidence.

The batch verifier checks the frozen site count, access-control roles, source snapshot hashes, corrected coordinate copies, route holds, and immutable backups. Full typecheck, audit, geometry, registry/catalog generation, and Vitest remain pending the missing shared workspace dependencies; see [validation.json](validation.json). No deployment was made.

## Repeatable steps for the next reviewer

1. Read `selection.json`, this review, and source metadata. Treat cached audit ranks only as leads when the full audit cannot run.
2. For each point, confirm facility identity and current public use from its managing agency or municipality. Distinguish the launch from parking, a carry trailhead, road crossing, or park centroid.
3. Compare map/GIS coordinates with the named waterbody and route role. Keep access anchors labeled as anchors; do not snap them to NHD or another generic water layer.
4. Update every source and trip-detail copy, provenance, and any dependent route hold. Preserve the original coordinate and source note in the frozen selection/review.
5. Regenerate the withheld-route list and run the batch verifier. Then regenerate and inspect canonical geometry for every changed public route before assembling the served catalog/registry.
6. If exact access or continuity is still unverified, keep the route held and record what evidence would reopen it.