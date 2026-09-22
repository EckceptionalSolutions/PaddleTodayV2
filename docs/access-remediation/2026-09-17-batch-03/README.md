# Access remediation batch 03

Reviewed September 17, 2026 using the [access-point remediation runbook](../../access-point-remediation-runbook.md). This was the next ten physical sites in the frozen public-route queue after batches 01 and 02. Read `selection.json` first to see the original names, coordinates, queue rank, route roles, offset distances, and audit-cache limitation. `review.json` records a decision for every selected site; `source-metadata.json` identifies the exact sources, retrieval status, local snapshots, and hashes.

The source-backed coordinate correction is the Sidney end of `unadilla-river-rockdale-sidney`: NYSDEC lists a public Susquehanna River hand launch at **42.315483, -75.414102** with parking for 30 cars. The route map's prior confluence pin did not identify a public landing. The route now names and uses the DEC launch; its 8-mile figure remains a planning estimate.

Three dependent routes are held because the sources do not establish a lawful public terminal water entry: `beaver-kill-cooks-falls-peakville`, `cohocton-river-bath-campbell`, and `salmon-river-route-2a-black-hole`. Their route/control evidence remains available for later review. The Cohocton Wood Road launch was not substituted for the separate Campbell endpoint because that would shorten the reach.

The optional `gunpowder-big-falls-road` waypoint was removed from the Masemore-to-Monkton route. Maryland DNR says the river enters private property downriver of Big Falls Road and does not identify a public launch there. The remaining route does not depend on that waypoint.

Four large mapped-water offsets were explained by access-area geometry rather than bad pins: Moyie Reservoir is a named public day-use/takeout area; Laurel Hill's official Beach Area launch is on the lake while the stored coordinate is a park anchor; Polaris Bridge's coordinate is the parking area before a 0.3-mile carry; Jamestown Falls' coordinate is trailhead parking before a 100-foot carry. Warnerville remains an official county-published access-area anchor with campus permission and the exact carry still requiring current confirmation. The point roles and names now distinguish those anchors from wet-edge coordinates.

## Repeat the work

1. Read the repository instructions, current `git status`, and the runbook. Leave unrelated edits untouched.
2. Freeze the next batch from the current public-route audit and withholding manifest. Do not silently replace a hard site with an easy one.
3. For each site, establish facility identity, current permission, exact water entry, map evidence, route fit, and dependent routes. Use official GIS or current managing-agency sources first. A water offset is a review signal, not permission to move a pin.
4. Choose `keep`, `fix`, `reject-invalid`, or `reject-unverified` for each site. Decide publication separately. Hold dependent routes when a terminal is unresolved; remove an optional point only when the route stands without it.
5. Update route literals, control provenance, route holds, and generated withholding list. Back up/hash each source file before editing. Write the evidence and reopening condition for every site.
6. Run the batch verifier and appropriate tests, then follow the runbook's geometry, registry, and full-audit checks. If a shared dependency blocks those checks, record that blocker and leave stale generated assets untouched.

The audit now labels a far-away point with a documented `authoritative-access-anchor` role as `documented-access-anchor-offset`; it stays in the review queue, but the report no longer describes a known parking/carry anchor as if it were an unexplained pin. `mapped-water-offset` remains for coordinates without that access-anchor evidence. Run `npx vitest run src/lib/access-water-quality.test.ts` to check the distinction.

The direct full audit, access-registry generation, route typecheck, and route geometry/catalog regeneration could not run in this workspace because the shared `@paddletoday/geo` and `@paddletoday/api-contract` packages are missing. Withholding generation and targeted batch checks are recorded in `validation.json`. No deployment was made.
