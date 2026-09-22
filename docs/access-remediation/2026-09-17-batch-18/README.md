# Access point remediation batch 18

Reviewed September 17, 2026 under the [access point remediation runbook](../../access-point-remediation-runbook.md). The ten physical sites at cached audit ranks 204–214 (rank 209 was already held and skipped by the frozen selection) are in [selection.json](selection.json). The queue is a cache-only prioritization aid because `@paddletoday/geo` is unavailable; it is not current field evidence.

## Result

No coordinate was moved. Seven named public access sites received source-backed access-anchor controls, and the existing Popp Park control was reclassified from water-entry to access-anchor. NYSDEC already publishes the Chenango Bridge Route 12A hand-launch coordinate, so its existing control was retained. Access-area coordinates are not ramp-toe coordinates; the notes now explain the role and remaining uncertainty.

Two terminal access sites could not be verified to the runbook standard. The Boiceville supermarket take-out is a private-business pullout without current permission or a verified public carry. The Baker Creek route start is named by American Whitewater, but no current source reviewed verifies paddlecraft staging and entry to the upper Big Wood from the stored point. Both route records remain intact and their slugs are held from publication. The generated withholding count should rise from 152 to 154.

Falls Dam now names Raleigh’s public paddlecraft launch. The current City directions distinguish it from the separate USACE Tailrace Fishing Area lot. The stored coordinate remains a legacy access-area anchor because Raleigh does not publish a GPS entry point. Turner Bend’s trip-detail endpoint now states that it is a private-fee landing and that its bridge-corridor coordinate is generalized. Teton Dam is now described as an access corridor/carry-in because the route point does not match IDFG’s facility-map marker; the discrepancy and need to verify the actual gated-road carry are explicit.

The decisions affect 15 unique route IDs: 2 newly withheld and 13 still public. Because none of the coordinates changed, route geometry was not regenerated. The access registry was not manually edited; it must be rebuilt from the full quality audit when the required local packages are available.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 204 | Boiceville Supermarket, Esopus Creek | Reject as unverified; hold dependent route pending property-manager/public-agency permission and a defensible entry. |
| 205 | Teton Dam Site, Teton River | Keep generalized access-area anchor; expose mismatch with IDFG facility-map marker and gated carry uncertainty. |
| 206 | Germania Marsh Dam, Mecan River | Keep coordinate as public ramp/access-area anchor; confirm seasonal gate and ramp availability. |
| 207 | Bell Crossing FAS, Bitterroot River | Keep coordinate; it rounds to the current Montana FWP site point and identifies the gravel-ramp site, not a surveyed toe. |
| 208 | Gardiner Wallkill launch | Keep address/map-matched access anchor; split it from Popp Park and New Paltz controls. Reconfirm current municipal rules. |
| 210 | Woodway Memorial Park, Buffalo Bayou | Keep the current TPWD-published public access coordinate as a park/access anchor. |
| 211 | Baker Creek, upper Big Wood | Reject as unverified; hold pending current land-manager verification of parking, carry, and water entry. |
| 212 | Falls Dam, Neuse River | Keep legacy access-area point; correct endpoint name and distinguish Raleigh’s paddle launch from the USACE fishing lot. |
| 213 | Turner Bend, Mulberry River | Keep private-fee landing access-area anchor; state wristband/parking/loading conditions and coordinate uncertainty. |
| 214 | Chenango Bridge Route 12A, Chenango River | Keep existing NYSDEC hand-launch coordinate and water-entry control. |

## Repeatable process for a smaller model

1. Read the frozen `selection.json` and the runbook. Do not substitute easier sites. Work on distinct physical sites, then expand each site to every route and trip-detail occurrence.
2. Verify identity and present-day access from a manager, agency, municipality, or site operator. Search results and third-party route descriptions are leads; they do not prove current permission.
3. Separate the launch from its address, parking lot, dam, campground, map center, or bridge. Prefer an official GIS point or a clearly described ramp/carry. If the source only locates the broader site, keep an access-area anchor and say so.
4. Check access status, fees, gates, hours, bank, waterbody, dam position, route direction, legal parking, and carry. Nearby water is not proof of public entry.
5. Search all source routes, trip details, controls, and generated files for each location and coordinate. Include shared endpoints and nearby route records.
6. If a defensible replacement for the same public access exists, update every copy and record its method and uncertainty. If public access or the route endpoint is not verified, preserve the record and hold every dependent public route.
7. Back up every edited source file, keep bulky source downloads in `node_modules/.cache`, record URLs and hashes, add controls for supported anchors, and correct misleading endpoint text.
8. Run the batch verifier, withholding generator, TypeScript/route checks, focused tests, and full access audit/registry generation when dependencies permit. Do not publish stale generated route geometry, catalog, or registry after a coordinate change.
9. Report site decisions separately from publication status. Record the exact missing evidence needed to reopen each hold. Never contact an owner or agency unless the user authorizes it.

See [review.json](review.json), [decision-notes.json](decision-notes.json), [source-metadata.json](source-metadata.json), [control-additions.json](control-additions.json), and [validation.json](validation.json) for the auditable detail. Run `node docs/access-remediation/2026-09-17-batch-18/verify.mjs` from the repository root.

## Validation limits

The batch verifier, source hashes, TypeScript syntax checks, withholding generation, and whitespace checks pass. Full route typechecking and focused Vitest startup are blocked by missing `@paddletoday/api-contract` and `@jridgewell/sourcemap-codec`; the full access audit is blocked by missing `@paddletoday/geo`. Because the full audit could not refresh, the generated access registry remains stale relative to the new controls. No coordinates changed, so no route geometry was regenerated. See [validation.json](validation.json) for commands and results.
