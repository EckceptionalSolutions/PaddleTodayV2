# Access point remediation batch 19

Reviewed September 17, 2026 under the [access point remediation runbook](../../access-point-remediation-runbook.md). The frozen ten physical sites at cached audit ranks 215–224 are in [selection.json](selection.json). The access-quality report is cache-only because @paddletoday/geo is unavailable; queue positions are prioritization hints, not current evidence.

## Result

Ten distinct sites were reviewed, affecting 21 unique route records. Six source-backed access-anchor controls were added, and four existing controls were reclassified from water-entry to access-area anchors. One coordinate was corrected: Vermont Fish & Wildlife’s Otter Creek–Kwonumosk state GIS feature at 44.086,-73.2472 replaces the unrelated stored point at 44.0655,-73.2185. The state point has steps access and is a facility anchor, not a surveyed toe. Its one currently public dependent route is withheld until canonical geometry and the served catalog are rebuilt.

Rock Springs Firemen’s Park is also withheld. A July 2025 field report says the steep, slick clay-bank canoe launch was not physically usable; older county planning material does not establish current launch usability. Reopen after current manager confirmation of a usable public entry or lawful replacement.

The remaining eight sites stay available with explicit anchor roles and caveats. Stored points for Farm Field Park, Bluffton Fir Stand, San Marcos City Park, Shad Landing, the NYSDEC Rafters lot, and McKay’s Bend identify public facilities or access areas, not verified ramp toes. Neal Shoals is a dam-avoidance access with a mapped 500-foot walk from parking to the river. The Kent Falls put-in is downstream of the closed/negotiated Kent Falls reach. Maryland DNR warns fall 2026 marina construction may limit Shad Landing access; check current alerts.

The ten sites touch 18 currently eligible route IDs before this batch; two were newly withheld, leaving 16 eligible. Three other route occurrences in the site list were already withheld. No route records were deleted.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 215 | Neal Shoals Dam River Access | keep-access-anchor |
| 216 | Farm Field Park kayak and canoe access | keep-access-anchor |
| 217 | Rock Springs Firemen's Park canoe landing | reject-unverified-and-hold |
| 218 | Fisherman’s parking/access below Kent Falls Powerhouse | keep-access-anchor |
| 219 | Shad Landing Area public boat ramp and soft launch | keep-access-anchor |
| 220 | NYSDEC Rafters Parking Area / Indian River access below Abanakee Dam | keep-access-anchor |
| 221 | Weybridge State Fishing Access / Kwonumosk (water-entry edge) | fix-coordinate-and-hold-for-geometry |
| 222 | Bluffton Fir Stand Access / Bluffton Road-W20 canoe ramp | keep-access-anchor-and-correct-label |
| 223 | City Park | keep-access-anchor-and-correct-label |
| 224 | McKay's Bend Recreation Site | keep-access-anchor |

## Process for a smaller model

1. Read the frozen selection.json; do not replace difficult sites with easier ones. Work by physical site, then expand to every route occurrence.
2. Verify current access with the land manager, agency, municipality, or operator. Treat old guides and paddler reports as leads or condition evidence, not manager permission.
3. Identify what each coordinate represents: ramp, steps, carry end, parking lot, facility pin, or generalized access area. Never move an access point to the nearest mapped water.
4. Confirm waterbody, bank, dam side, launch direction, legal parking, hours, gates, carry, and current closure or construction notice.
5. Search routes, trip-detail overrides, controls, and generated files for every shared name and coordinate. Update all source copies if a coordinate changes.
6. If public access or endpoint identity is unresolved, preserve the route and add a hold. A correct coordinate does not clear a route whose geometry or dam-side path is stale.
7. Back up edited files, record source URLs and retrieval metadata, add access-anchor controls, and replace misleading water-entry or ramp wording when evidence only supports a site or parking area.
8. Generate the withholding manifest. Rebuild geometry for changed public routes before refreshing the catalog. Refresh the full audit and registry only with their required packages.
9. Run the verifier, syntax checks, focused tests, and full audit where dependencies permit. Record validation limits and exact reopening evidence.

Run node docs/access-remediation/2026-09-17-batch-19/verify.mjs from the repository root. Supporting records: [review.json](review.json), [decision-notes.json](decision-notes.json), [source-metadata.json](source-metadata.json), [control-additions.json](control-additions.json), [registry-control-snapshot.json](registry-control-snapshot.json), and [validation.json](validation.json).

## Validation limits

The direct withholding generator produced 156 held routes. The batch verifier, TypeScript syntax transpilation, and scoped whitespace check pass. The full cache-only access audit cannot start because @paddletoday/geo is missing, so the generated registry remains stale. Direct route typechecking is blocked by missing @paddletoday/api-contract, and focused Vitest startup is blocked by missing @jridgewell/sourcemap-codec. The corrected Vermont route remains held pending fresh geometry; no generated route geometry was rewritten.
