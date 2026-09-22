# Access point remediation batch 17

Reviewed September 17, 2026 under the [access point remediation runbook](../../access-point-remediation-runbook.md). The ten physical sites at cached audit ranks 194–203 were frozen in [selection.json](selection.json) before research. Queue offsets are prioritization clues; the audit is still a cache-only snapshot because the workspace geo package is missing.

## Result

One coordinate was corrected: Miller Landing on Minnesota’s Sauk River. Current DNR public-water-access GIS feature **OBJECTID 2504 / WAS00341** returns WGS84 **45.55179577632979, -94.26496023134358**, identifies Stearns County and RM 7.6, and matches the right-bank carry-in named on DNR Map 2. Two old coordinate variants appeared across route and trip-detail data. The new feature point was propagated to both route-level access coordinates and all five trip-detail endpoint copies, including the additional Eagle Park–Miller Landing detail that the cached queue did not group under the exact same coordinates. This is an access-site GIS point, not a surveyed landing toe.

The other nine coordinates were retained as access anchors. Current managing-agency or operator sources identify the access point, but several points describe a road approach, park facility, campground, or dam-portage takeout rather than an exact waterline. Those cases now have official access-anchor controls that explain why distance from hydrography alone is not evidence of a bad coordinate. First Brook’s existing control was corrected from “water entry” to “access anchor” because NYSDEC publishes the parking-area coordinate while naming the hand launch separately. Its route label now says “First Brook Hand Launch Parking Area.”

No site in this frozen batch lacked evidence of a current public access site, so this batch added no route holds and did not regenerate the withholding manifest; it remains at 152 routes. The pre-existing Winooski Jonesville-to-Floodplain hold remains intact. The Miller coordinate change affects five public route records; regenerate and audit each corresponding route geometry before serving updated catalog assets.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 194 | Lexington Avenue, Rice Creek, Minnesota | Keep road/access-area point; add County map control. No exact launch coordinate is published. |
| 195 | Paces Mill, Chattahoochee River, Georgia | Keep NPS launch-facility point; current NPS guidance lists the public ramp. |
| 196 | Miller Landing, Sauk River, Minnesota | Correct all five route trip-detail copies and both route access coordinates to DNR feature WAS00341. |
| 197 | Murtaugh Boating Access, Snake River, Idaho | Keep BLM put-in site anchor; BLM confirms use but does not publish an exact point. |
| 198 | Round Spring, Current River, Missouri | Keep access-area point; distinguish the NPS floater landing from the motorized-only boat ramp. |
| 199 | Lower Yough launch, Ohiopyle, Pennsylvania | Keep launch-area point; DCNR specifies the river-right Ferncliff entry and forbids using it as the falls-run takeout. |
| 200 | First Brook Hand Launch, New York | Keep NYSDEC parking coordinate; change control to access-anchor and name the parking area explicitly. |
| 201 | Lions Park South, St. Croix River, Minnesota | Keep upstream-side portage takeout anchor; NPS says the water below the dam has no public access. |
| 202 | Grant Park, North Raccoon River, Iowa | Keep hard-surface boat-ramp area anchor; do not confuse the ramp with the rock-dam portage. |
| 203 | Jonesville, Winooski River, Vermont | Keep river-left takeout anchor; Town separates shoulder unloading from parking opposite the bridge. |

Full sources, query output, source and backup hashes, and validation results are in the files beside this README.

## Repeatable process for a smaller model

1. Read and freeze the ten ordered rows in selection.json; never replace a difficult row with an easier one.
2. For each row, use the current land manager or public operator page to verify the facility name, public access, waterbody, bank, and any closures or dam rules. Treat search results as leads only.
3. Follow the official map or GIS service. Save the complete query URL and response. For ArcGIS points, convert x to longitude and y to latitude. Do not call a park, campground, or parking coordinate a ramp toe.
4. Check route direction, bank, dam side, carries, parking, and endpoint role. A public portage takeout above a dam does not prove a public put-in below it.
5. Search every source route and trip-detail copy by both name and coordinate. Check neighboring route records because a shared access may use a slightly different old point.
6. Keep a supported area anchor, fix only to a defensible point for the same named access, and hold a route only when public entry or route continuity is not verified. Preserve held route records.
7. Back up every edited file, record source hashes, add or correct evidence controls, then run the batch verifier and available route checks. Do not refresh generated catalogs from a stale audit or use stale geometry after coordinate changes.

## Validation limits

The batch verifier and TypeScript syntax checks pass. The route typecheck still cannot resolve @paddletoday/api-contract; focused Vitest startup is missing @jridgewell/sourcemap-codec; the full audit and changed-route geometry generator cannot import @paddletoday/geo. As a result, the generated access registry, route geometries, catalog, and bundles remain stale relative to this source correction. They were not rebuilt. See [validation.json](validation.json).
