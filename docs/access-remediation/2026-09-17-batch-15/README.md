# Access point remediation batch 15

Reviewed September 17, 2026 under the [step-by-step operator runbook](../../access-point-remediation-runbook.md). The ten physical sites at cached quality-audit ranks 173–183 were frozen in [selection.json](selection.json) before source research. Rank 175 was already held and skipped by the frozen selection rule.

The audit that supplied these ranks is a cached snapshot. Missing `@paddletoday/geo` prevents a fresh run, so rank and mapped-water distance are prioritization hints only. Several candidates already had official-access or water-entry controls added after the cached audit was produced. This batch therefore checked the live sources and the existing controls before making edits.

## Result

The batch corrected one public route endpoint: Buena Vista Whitewater Park. CPW’s current Facilities GIS has feature 2120 classified as a universal boat ramp at **38.847248805868695, -106.12221661900705**. The former pin, 38.842, -106.131, was about 0.95 mile west of that mapped ramp area. CPW’s AHRA page confirms that Buena Vista Whitewater Park is a public ramp/slide site managed by the Town. The replacement is an access-area anchor with 125-foot uncertainty; it is not represented as a surveyed ramp toe.

The Peconic River River Road West coordinate already matched NYSDEC’s current access-site coordinate. NYSDEC specifies a 100-yard carry to water, so the coordinate is an access pin, not a wet-edge point. The shared three-site control was reclassified from `authoritative-water-entry` to `authoritative-access-anchor`, and the carry distinction was recorded for River Road East and West. This lets a refreshed audit report the documented offset honestly instead of treating these site pins as unexplained water-entry coordinates.

The other eight sites were retained as access-area, launch, trailhead/carry, or separately mapped facility/shoreline anchors. Current managing-agency sources confirmed their public-access identity. No site was rejected and no route was newly withheld. One earlier Bolton-to-Floodplain route remains in the pre-existing withholding manifest.

## Repeatable review for a weaker model

1. Read the frozen list in `selection.json`; do not replace a difficult location with a simpler one. Ranks only set work order.
2. For each named feature, read the operator’s current page first. Record public-use status, managing body, name/address, bank or dam side, carry length, parking, seasonal hours, and closures.
3. Search the existing `route-access-official-map-controls.json` before changing a point. A source coordinate may already be documented even when an older cached queue still calls it a mapped-water offset.
4. Separate the feature’s coordinates from the water entry. A hand-carry coordinate, trailhead, parking lot, address pin, or campground center is an access-area anchor. Keep a separate entry point only when a source or properly georeferenced imagery supports it.
5. Prefer the operator’s GIS/map feature. For ArcGIS, request geometry in EPSG:4326 and confirm that the response says `x = longitude`, `y = latitude`. Record the feature ID, classification, query URL, retrieval date, response hash, and an uncertainty that matches the source.
6. Follow the source into the river route: check dam side, mandatory carries, legal exit/re-entry, route role, and any existing holds. A public endpoint does not prove a public portage or route between endpoints.
7. Decide the coordinate separately from publication. Keep a supported area anchor; fix only when a replacement point identifies the same public site; reject and withhold only when access identity or lawful continuity is contradicted or remains unverified.
8. Before editing, save byte-for-byte backups of every source file and snapshot the old control rows. Update every route, trip-detail, and control copy. Do not rewrite unrelated data or normalize line endings.
9. Run the withholding generator, the batch verifier, and the route-data typecheck. Regenerate every changed public route geometry before assembling catalogs. Refresh the full access audit before registry generation. If a package blocks a check, record it and leave dependent served artifacts untouched.
10. Report retained sites, coordinate fixes, control-role changes, rejected sites, held routes, and stale generated outputs as separate counts.

## Site decisions

| Rank | Site | Decision | Reason the point stays or moves |
|---:|---|---|---|
| 173 | Peconic River River Road West | Keep coordinate; classify as access anchor | NYSDEC publishes the exact site pin and a 100-yard hand carry. |
| 174 | Bolton Canoe Access | Keep access-area anchor | Richmond verifies the public access and parking; no source supports a more precise water-edge move. |
| 176 | Inner Harbor Bear Street | Keep seasonal launch anchor | Syracuse confirms the west-shore dock and May–October seasonal installation. |
| 177 | North Nebraska Street | Keep municipal launch-area anchor | Horicon confirms the named launch at 202 N Nebraska Street, north of the dam. |
| 178 | Buena Vista Whitewater Park | Fix coordinate | CPW GIS feature 2120 is the public Boat Ramp point at the verified access area. |
| 179 | Moody Falls | Keep trailhead/carry anchor | NYSDEC publishes the trailhead coordinate and 0.1-mile carry; Moody Falls remains a portage hazard. |
| 180 | Aqua Lane / Rice Lake | Keep separate facility and shore-entry anchors | Anoka County and Minnesota DNR document the public carry-in; existing controls distinguish facility from water entry. |
| 181 | Kents Lane Portage Park | Keep county access-area anchor | Wythe County confirms public small-craft launch/take-out use and the facility address. |
| 182 | Fish Creek WMA Route 184 | Keep DEC access anchor | NYSDEC publishes the coordinate near the Black Creek launch and confirms hand-launch parking. |
| 183 | Pulltite | Keep campground/landing-area anchor | NPS confirms a designated river landing; the stored campground pin is not an NPS surveyed wet-edge coordinate. |

## Validation and limits

The batch verifier checks the frozen ranks, site decisions, route coverage, coordinate propagation, official control records, source-response hashes, backup hashes, manifest count, and TypeScript syntax. The CPW correction changes one still-public route geometry. The route typecheck, fresh full audit, focused access tests, geometry generation, and served catalog rebuild are recorded in `validation.json`; generated public geometry and the full access registry must not be treated as fresh until those blocked commands can run.
