# Illinois Route Memory

Last summarized: 2026-06-05.

## Current Inventory

- Live routes: 2.
- Rivers represented: Kishwaukee River, Vermilion River.
- Ledger candidates: 24 total; 2 added, 11 `threshold_weak`, 4 `no_live_gauge`, 6 `research_later`, 1 `rejected`.

## Status

Illinois is not exhausted, but the broad 30-minute cadence is unlikely to add routes under the current quality bar. The candidate ledger has many real public paddling leads, but most fail on numeric paddling thresholds tied to a selected gauge, product-fresh live gauge evidence, or public endpoint/access quality.

## Main Blockers

- Strong route/access context without route-specific numeric gauge thresholds.
- USGS current-condition visibility or Water Services freshness gaps on otherwise plausible gauges.
- Illinois access/closure sensitivity, especially on dammed Fox River corridors and smaller streams.
- Some whitewater/play-park candidates are not normal PaddleToday day routes.

## Current Guidance

- Do not run blind cadence loops for Illinois.
- Use targeted research for threshold sources first, then implementation.
- Strongest future work is likely on candidates where public-water/access context is already solid: Pecatonica, Des Plaines, Nippersink, Middle Fork Vermilion, Kankakee, Fox, and Rock River families.
- Do not ship a route from gauge existence plus park adjacency; require a normal public put-in/take-out and a defensible scoring model.

## Recent Reviews

- 2026-06-08 15:31 America/Chicago / 2026-06-08 20:31 UTC: No-add targeted blocker refresh for `illinois-route-additions`.
  - Current inventory remains two Illinois V2 routes: `vermilion-river-lowell-oglesby` and `kishwaukee-river-hickory-bills-distillery`; both still have matching trip details and added ledger records.
  - Mandatory current IDNR River Closures check still lists Fox River lower reach open effective 2026-05-07, Upper Fox / Chain O'Lakes no-wake effective 2026-05-04, Middle Fork Vermilion open effective 2026-04-06, Kishwaukee open effective 2026-04-24 on the listed lower reach, and an Illinois River high-water non-DNR notice.
  - Reviewed only Des Plaines Van Patten-to-Sedge, Nippersink Keystone-to-Canoe-Base, Middle Fork Vermilion Kinney's/Bunker/Kickapoo, and Lusk Creek Canyon.
  - Local product-style USGS Water Services IV fetch for `05527800`, `05548280`, `03336645`, and `03384450` failed with `Unable to connect to the remote server`.
  - Official legacy evidence did not clear implementation gates: Des Plaines `05527800` remains stale to 2026-05-25; Nippersink `05548280` remains stale to 2026-06-06; Middle Fork `03336645` is now same-day visible at 392 cfs / 2.07 ft on 2026-06-08, but still lacks a numeric low-water floor or ideal range; Lusk `03384450` remains stale to 2026-05-15 and endpoint-coordinate blocked.
  - Des Plaines, Nippersink, Middle Fork Vermilion, and Lusk Creek remain `no_live_gauge` in the ledger for continuity, but the active Middle Fork blocker is now threshold support rather than visible-data staleness. No candidates were promoted to `likely_addable` or `needs_manual_coordinates`; no app route data, trip details, route-gallery wiring, or image-audit rows changed.

- 2026-06-08 09:39 America/Chicago / 2026-06-08 14:39 UTC: No-add targeted blocker refresh for `illinois-route-additions`.
  - Current inventory remains two Illinois V2 routes: `vermilion-river-lowell-oglesby` and `kishwaukee-river-hickory-bills-distillery`; both still have matching trip details and added ledger records.
  - Mandatory current IDNR River Closures check still lists Fox River lower reach open effective 2026-05-07, Upper Fox / Chain O'Lakes no-wake effective 2026-05-04, Middle Fork Vermilion open effective 2026-04-06, Kishwaukee open effective 2026-04-24 on the listed lower reach, and an Illinois River high-water non-DNR notice.
  - Reviewed only Des Plaines Van Patten-to-Sedge, Nippersink Keystone-to-Canoe-Base, Middle Fork Vermilion Kinney's/Bunker/Kickapoo, and Lusk Creek Canyon.
  - Local product-style USGS Water Services IV fetch for `05527800`, `05548280`, `03336645`, and `03384450` failed with `Unable to connect to the remote server`.
  - Official/source-visible evidence still did not clear product-live gates: Des Plaines `05527800` current-condition evidence remains stale to 2026-04-23; Nippersink `05548280` inventory shows current/historical observations ending 2025-11-14; Middle Fork `03336645` remains stale to 2026-05-31 and still lacks a low-water threshold; Lusk `03384450` did not expose product-verified same-day values and still lacks clean public endpoint coordinates.
  - Des Plaines, Nippersink, Middle Fork Vermilion, and Lusk Creek remain `no_live_gauge`. Middle Fork also remains low-water-threshold blocked; Lusk Creek also remains endpoint-coordinate blocked and would require `routeType: 'whitewater'`.
  - No candidates were promoted to `likely_addable` or `needs_manual_coordinates`; no app route data, trip details, route-gallery wiring, or image-audit rows changed.

- 2026-06-05 09:43 America/Chicago / 2026-06-05 14:43 UTC: No-add targeted blocker refresh for `illinois-route-additions`.
  - Current inventory remains two Illinois V2 routes: `vermilion-river-lowell-oglesby` and `kishwaukee-river-hickory-bills-distillery`; both still have matching trip details and added ledger records.
  - Mandatory IDNR River Closures check still lists Fox River lower reach open effective 2026-05-07, Upper Fox / Chain O'Lakes no-wake effective 2026-05-04, Middle Fork Vermilion open effective 2026-04-06, Kishwaukee open effective 2026-04-24 on the listed lower reach, and an Illinois River high-water non-DNR notice.
  - Reviewed only Des Plaines Van Patten-to-Sedge, Nippersink Keystone-to-Canoe-Base, Middle Fork Vermilion Kinney's/Bunker/Kickapoo, and Lusk Creek Canyon.
  - Local product-style USGS Water Services IV fetch for `05527800`, `05548280`, `03336645`, and `03384450` failed with `Unable to connect to the remote server`.
  - Fresh official/source-visible evidence still did not clear product-live gates: Des Plaines `05527800` WDFN identified the site but exposed no same-day values in accessible text; Nippersink `05548280` WDFN identified the site but exposed no same-day values and third-party context was stale to 2026-05-09; Middle Fork `03336645` official legacy/search evidence remained stale to 2026-05-31 and still lacks a low-water threshold; Lusk `03384450` WDFN identified the site but exposed no product-verified same-day values and endpoints remain unresolved.
  - Des Plaines, Nippersink, Middle Fork Vermilion, and Lusk Creek remain `no_live_gauge`. Middle Fork also remains low-water-threshold blocked; Lusk Creek also remains endpoint-coordinate blocked and would require `routeType: 'whitewater'`.
  - No candidates were promoted to `likely_addable` or `needs_manual_coordinates`; no app route data, trip details, route-gallery wiring, or image-audit rows changed.

- 2026-06-05 09:12 America/Chicago / 2026-06-05 14:12 UTC: No-add targeted blocker refresh for `illinois-route-additions`.
  - Current inventory remains two Illinois V2 routes: `vermilion-river-lowell-oglesby` and `kishwaukee-river-hickory-bills-distillery`; both still have matching trip details and added ledger records.
  - Mandatory IDNR River Closures check preserved the same closure-sensitive context: Fox River lower reach open, Upper Fox / Chain O'Lakes no-wake, Middle Fork Vermilion open, Kishwaukee open on the listed lower reach, and an Illinois River high-water non-DNR notice.
  - Reviewed only Des Plaines Van Patten-to-Sedge, Nippersink Keystone-to-Canoe-Base, Middle Fork Vermilion Kinney's/Bunker/Kickapoo, and Lusk Creek Canyon.
  - Local product-style USGS Water Services IV fetch for `05527800`, `05548280`, `03336645`, and `03384450` failed with `Unable to connect to the remote server`.
  - Official/search-visible USGS evidence still did not expose same-day product-ready data: Des Plaines `05527800` did not show same-day current observations, Nippersink `05548280` did not expose an official same-day value, Middle Fork `03336645` remained stale to 2026-05-31, and Lusk Creek `03384450` was not product-verified.
  - Des Plaines, Nippersink, Middle Fork Vermilion, and Lusk Creek remain `no_live_gauge`. Middle Fork also remains low-water-threshold blocked; Lusk Creek also remains endpoint-coordinate blocked and would require `routeType: 'whitewater'`.
  - No candidates were promoted to `likely_addable` or `needs_manual_coordinates`; no app route data, trip details, route-gallery wiring, or image-audit rows changed.

- 2026-06-05 08:43 America/Chicago / 2026-06-05 13:43 UTC: No-add targeted blocker refresh for `illinois-route-additions`.
  - Current inventory remains two Illinois V2 routes: `vermilion-river-lowell-oglesby` and `kishwaukee-river-hickory-bills-distillery`; both still have matching trip details and added ledger records.
  - Mandatory IDNR River Closures check preserved the same closure-sensitive context: Fox River lower reach open, Upper Fox / Chain O'Lakes no-wake, Middle Fork Vermilion open, Kishwaukee open on the listed lower reach, and an Illinois River high-water non-DNR notice.
  - Reviewed only Des Plaines Van Patten-to-Sedge, Nippersink Keystone-to-Canoe-Base, Middle Fork Vermilion Kinney's/Bunker/Kickapoo, and Lusk Creek Canyon.
  - Local product-style USGS Water Services IV fetch for `05527800`, `05548280`, `03336645`, and `03384450` failed with `Unable to connect to the remote server`.
  - Official/search-visible USGS evidence remained stale rather than same-day product-ready: Des Plaines `05527800` stale to 2026-05-19, Nippersink `05548280` stale to 2026-05-26 / WDFN no recent continuous data, Middle Fork `03336645` stale to 2026-05-31, and Lusk Creek `03384450` stale to 2026-05-09.
  - Des Plaines, Nippersink, Middle Fork Vermilion, and Lusk Creek remain `no_live_gauge`. Middle Fork also remains low-water-threshold blocked; Lusk Creek also remains endpoint-coordinate blocked and would require `routeType: 'whitewater'`.
  - No candidates were promoted to `likely_addable` or `needs_manual_coordinates`; no app route data, trip details, route-gallery wiring, or image-audit rows changed.

- 2026-06-05 08:12 America/Chicago / 2026-06-05 13:12 UTC: No-add targeted blocker refresh for `illinois-route-additions`.
  - Current inventory remains two Illinois V2 routes: `vermilion-river-lowell-oglesby` and `kishwaukee-river-hickory-bills-distillery`; both still have matching trip details and added ledger records.
  - Mandatory IDNR River Closures check preserved the same closure-sensitive context: Fox River lower reach open, Upper Fox / Chain O'Lakes no-wake, Middle Fork Vermilion open, Kishwaukee open on the listed lower reach, and an Illinois River high-water non-DNR notice.
  - Reviewed only Des Plaines Van Patten-to-Sedge, Nippersink Keystone-to-Canoe-Base, Middle Fork Vermilion Kinney's/Bunker/Kickapoo, and Lusk Creek Canyon.
  - Local product-style USGS Water Services IV fetch for `05527800`, `05548280`, `03336645`, and `03384450` failed with `Unable to connect to the remote server`.
  - Des Plaines, Nippersink, Middle Fork Vermilion, and Lusk Creek remain `no_live_gauge`. Middle Fork also remains low-water-threshold blocked; Lusk Creek also remains endpoint-coordinate blocked and would require `routeType: 'whitewater'`.
  - No candidates were promoted to `likely_addable` or `needs_manual_coordinates`; no app route data, trip details, route-gallery wiring, or image-audit rows changed.
