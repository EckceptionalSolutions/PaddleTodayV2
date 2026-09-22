# Access point remediation batch 07

Reviewed September 17, 2026 using the [access-point remediation runbook](../../access-point-remediation-runbook.md). Ten distinct sites were frozen from the cached access-quality queue in [selection.json](selection.json), after excluding batches 01–06 and filtering against the refreshed withheld-route manifest. The audit itself is stale because `@paddletoday/geo` is missing; ranks only guided research.

One coordinate was corrected: Greer Crossing moved from the campground/facility coordinate to the published river-access point in the Forest Service Eleven Point map. The route set is held until geometry is regenerated and checked. Shotgun's rapid scout/portage point and Sheboygan's Highway C bridge reference were removed from access lists because neither is a public landing. Fisherman's Park is town-owned fishing access, but the Town plan does not establish a paddle launch or loaded-boat carry, so its route remains withheld. Lehigh, Riverside Park, Canalside's low kayak dock, Monkton Station, Pearl Rock, and Hiestand Park remain documented access/site anchors with their uncertainty and carry notes intact.

Eight routes are held: seven Eleven Point routes dependent on the Greer correction and one Eighteenmile Creek route pending confirmation of a legal paddle entry at Fisherman's Park. Six unchanged public access anchors and two removed false markers do not require route holds. See [review.json](review.json) for each decision and [source-metadata.json](source-metadata.json) for retrieval results and hashes.

## Repeatable steps for a weaker model

1. Read the repository [runbook](../../access-point-remediation-runbook.md), this README, `selection.json`, and `review.json`. Keep the frozen ten-site set; do not cherry-pick easier locations.
2. For each point, verify both public-use status and coordinate role. Separate a ramp, carry-in, park or campground pin, parking lot, river-mile access, rapid scout, and bridge reference.
3. Prefer current managers for access status and their own maps/GIS for location. When a current manager gives access status but an older manager map gives the coordinate, say so. Use the older coordinate only as an access anchor and record its uncertainty.
4. Download and retain the source response before editing. Record URL, date, response status, bytes, hash, feature/site name, coordinate system, coordinate role, and any failed retrieval. A failed response is not evidence.
5. Search both route source and trip-detail files for every coordinate and access name. Update every copy and its explanatory notes. Do not treat rapid/portage markers or unverified bridge pullouts as public accesses.
6. Add a route hold when an endpoint moves or lawful water entry cannot be confirmed. Remove a false optional bailout without holding the route if the start and finish still work. Preserve all older holds.
7. Regenerate the withheld-route manifest and run this batch's verifier. Run available route checks, tests, the full quality audit, canonical geometry generation, and catalog assembly in runbook order. Do not run access-registry generation from a stale cache-only report.
8. If geometry/catalog tooling is blocked, record the exact missing package and keep affected routes withheld. Clear a hold only after coordinates agree across source copies, geometry follows the intended reach, the served catalog is rebuilt, and the public bundle excludes withheld routes.
