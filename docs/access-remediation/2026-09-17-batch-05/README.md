# Access point remediation batch 05

Reviewed September 17, 2026 with the [access-point remediation runbook](../../access-point-remediation-runbook.md). The ten physical sites were frozen from the cached quality queue before research. Because the full audit cannot be regenerated without @paddletoday/geo, ranks are prioritization leads only; current source review controls every decision.

Four coordinates were corrected: Steel Creek’s campground pin was replaced with the mapped slipway water-entry feature; Riggins City Park was moved to its named boat-ramp slipway; Wilkinson Pioneer Park and the 248th Trail access were replaced with current Iowa DNR feature coordinates. Lusby remains a supported WGFD access-area anchor, but its uncertainty is now 300 feet because the agency map center does not isolate the ramp. Driscoll Road and Waid Park remain documented area/facility anchors; no water snap was justified.

The Lewis Channel northern shallow point was removed from the access list because it is a wade/line hazard zone, not a landing. Givhans Ferry and Kendrick remain unresolved: Givhans’ current park notice closes the cabin-area river stairs and distinguishes drop-off from the boat ramp three miles away; the Kendrick endpoint is a paddling-database pin without verified legal landing, parking or carry. Their dependent terminal routes remain held. Two independent Edisto routes had Givhans bailout claims removed and remain valid without that exit.

The edits affect 15 held routes: seven Buffalo routes at Steel Creek, one Little Salmon route, two Iowa routes, one Yellowstone route, three Givhans terminal routes, and one Big Bear Creek route. Two additional Edisto routes have corrected intermediate-bailout wording and are not held for Givhans.

Source findings and reopening criteria are in [review.json](review.json). Retrieval results and SHA-256 values are in [source-metadata.json](source-metadata.json). Several bad or blocked responses are retained as rejected retrieval records; the Iowa HTML directory response is not the GIS evidence, and Riggins council PDFs returned 403 to direct download.

## Repeatable steps for a weaker model

1. Read the repository runbook, this README, selection.json, and review.json. Keep the ten frozen physical sites in this batch; do not substitute easier routes.
2. For each site, separate public-access identity from coordinate accuracy. Confirm the owner/manager’s current access and closure status first; only then evaluate the coordinate’s role (water entry, access area, parking, or hazard).
3. Prefer current manager GIS/map geometry. Record feature ID, attributes, coordinate reference, and retrieval hash. If a map feature is community-maintained, use it only for geometry and obtain public-access identity from the manager; state that distinction.
4. Keep uncertainty honest. Do not treat decimal precision or proximity to mapped water as survey accuracy. Preserve supported access-area anchors rather than snapping them to a river centerline.
5. For every corrected site, search route source and trip-detail copies. Update all copies, names, notes, source links and provenance. For a false access marker, remove it only if the route narrative keeps the hazard warning.
6. Add a route hold when an endpoint is unresolved or corrected coordinates need regenerated geometry/catalog assets. Preserve prior hold reasons. If an intermediate exit is optional and the route remains independently viable, remove the unsupported bailout claim rather than holding the whole route.
7. Regenerate the withheld-route list, run node docs/access-remediation/2026-09-17-batch-05/verify.mjs, then run available route typechecks, the full audit, route geometry generation and catalog assembly in the runbook order.
8. Do not clear geometry holds until corrected route lines have been regenerated and inspected and the served catalog/manifest no longer contains stale endpoints. If a required package is missing, record the exact blocker and leave dependent routes withheld.
