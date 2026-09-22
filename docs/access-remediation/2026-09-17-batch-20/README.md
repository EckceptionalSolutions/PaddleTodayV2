# Access point remediation batch 20

Reviewed September 17, 2026 under the [access point remediation runbook](../../access-point-remediation-runbook.md). The frozen queue slice is in [selection.json](selection.json). It uses cached audit ranks as research priority only; the fresh audit cannot run because `@paddletoday/geo` is missing.

## Result

Ten physical sites were reviewed across 14 unique unwithheld routes. One route was newly held, leaving 13 selected routes eligible. No route records were deleted and no coordinates were moved. Three source-backed access-anchor controls were added and the Osgood Pond control was reclassified from a water-entry point to an access-area anchor. The Town of Turtle route is now held because a current Town notice advertises temporary activity restrictions on Turtle Creek but the notice page does not expose the resolution's text or scope. The withholding manifest now contains 157 routes.

The main quality correction is semantic: park, campground, and facility coordinates are recorded as access-area anchors rather than surveyed water-entry points. Sunset Park's municipal guide adds the west-entrance address and its 2025 published fee schedule. Lenon Mill is documented as canoe access below the dam. Van Buren's official MDC map depicts its ramp and parking; the route point remains a generalized park anchor. Troutdale is retained as a campground access area with a carry/season/day-use caveat because the available Forest Service and American Whitewater evidence does not publish a surveyed launch-toe coordinate. The optional Red's Twilight resort waypoint was removed from the Erie Canal route's access-point list; it remains a lodging lead, not a verified paddler access.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 225 | Grace Dam Bridge / Grace Dam Road | keep-access-anchor |
| 226 | NYSDEC Mattituck Creek / Naugles Road | keep-access-anchor |
| 227 | Sunset Park Boat Launch, Kimberly | keep-access-anchor-and-record-fees |
| 228 | Lenon Mill Park Access | keep-access-anchor-below-dam |
| 229 | Town of Turtle Canoe Launch | hold-pending-resolution-scope |
| 231 | NYSDEC Osgood Pond Hand Launch | reclassify-access-anchor |
| 232 | Troutdale Campground Put-In | keep-access-area-anchor-and-clarify-carry |
| 233 | Red's Twilight on the Erie RV Resort | remove-unverified-optional-access-waypoint |
| 234 | Van Buren Riverfront Park Access | keep-access-anchor |
| 235 | Deadmans Bar | keep-access-anchor |

## Process for a smaller model

1. Read `selection.json` and preserve its physical-site list. Do not replace a difficult site with an easier one.
2. Expand each site to every route occurrence, including trip-detail overrides and shared facilities. A second route with a different coordinate is evidence to investigate, not permission to average or snap points.
3. Check current manager, agency, municipality, or operator evidence for access, waterbody, dam side, parking, hours, fees, closures, carry, and season. Use paddler reports and map services as corroboration, not as manager permission.
4. Decide what the stored coordinate represents. Keep a facility, parking, campground, or park point as an access-area anchor unless a source supplies an exact launch coordinate. Do not move a point to the nearest mapped water.
5. If a current restriction notice is relevant but its scope cannot be verified, preserve the route and add a review hold. Record exactly what reopening evidence is needed.
6. Remove optional access waypoints when paddler use is not verified and the route still has independent valid endpoints. Preserve the lodging or camping lead with its limitations.
7. Back up every edited source file, update all source copies, add or reclassify control records, and record source URLs and retrieval dates.
8. Regenerate the withholding manifest after adding holds. Rebuild route geometry only after a public route coordinate changes; do not rewrite generated registries or audit output when required packages are missing.
9. Run the batch verifier, TypeScript syntax checks, and scoped whitespace checks. Record blocked checks and the source evidence needed to reopen held routes.

Run `node docs/access-remediation/2026-09-17-batch-20/verify.mjs` from the repository root. Supporting records: [review.json](review.json), [decision-notes.json](decision-notes.json), [source-metadata.json](source-metadata.json), [control-additions.json](control-additions.json), [registry-control-snapshot.json](registry-control-snapshot.json), and [validation.json](validation.json).

## Validation limits

The route was held while the Town's Resolution 2026-11 scope remains unavailable in the public notice page. No route geometry changed. The generated registry remains stale because the full access audit cannot start without `@paddletoday/geo`; route-data typechecking and Vitest startup also remain blocked by missing workspace dependencies. See `validation.json` for exact results.
