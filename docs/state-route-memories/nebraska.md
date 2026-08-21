# Nebraska Route Memory

Created 2026-06-08 for the `nebraska-route-additions` automation.

## Current Inventory

- Current live Nebraska routes in `src/data/rivers.ts`: 9 as of 2026-07-06 after the latest Loup continuation pass (`platte-river-schramm-louisville`, `platte-river-schramm-platte-river-state-park`, `platte-river-platte-river-state-park-louisville`, `loup-river-george-syas-monroe`, `loup-river-george-syas-columbus`, `loup-river-monroe-columbus`, `loup-river-columbus-adm-access`, `loup-river-monroe-adm-access`, and `loup-river-george-syas-adm-access`).
- Current Nebraska candidate ledger rows: 7 as of 2026-06-12 12:58 blocker refresh.
- Automation posture: seed a small official-source candidate set, then add at most one route only if all gates clear.

## 2026-08-09 Coverage-Complete Saturation Audit

- Completed the bounded Nebraska coverage-complete audit without adding a route or screening speculative expansion candidates. The task-board scope prohibited reopening Niobrara, Elkhorn, Calamus, Missouri, or Kearney blockers without fresh evidence.
- Confirmed 9 Nebraska inventory routes and 9 scored direct-USGS routes. USGS Water Services returned same-day product-live data for Platte River at Louisville `06805500` at 3090 cfs / 2.97 ft on 2026-08-09 06:15 CDT and Loup River near Genoa `06793000` at 315 cfs / 4.13 ft on 2026-08-09 06:45 CDT.
- Added missing bounded no-image rows for `platte-river-schramm-platte-river-state-park` and `platte-river-platte-river-state-park-louisville`.
- Added explicit camping classifications for all Nebraska trip details: endpoint/basecamp/none according to managed campground or WMA primitive-camping support, while preserving the no-private-bank/no-sandbar route-camping caveats.
- Nebraska is not marked saturated. Remaining blockers: coordinate audit still fails the George D. Syas WMA put-in on `loup-river-george-syas-monroe`, `loup-river-george-syas-columbus`, and `loup-river-george-syas-adm-access` because the stored point is an official area anchor rather than a verified launch/water-entry coordinate; geometry generation still emits route-scoped assets for only six of the nine Nebraska slugs and omits those three George D. Syas-starting Loup routes.
- Next action: find a source-backed George D. Syas launch or water-entry coordinate, then regenerate route geometries and rerun coordinate/geometry audits before marking Nebraska saturated.

## Source Priorities

- Nebraska Game and Parks Commission water-trail pages, state recreation areas, and official trail/access PDFs.
- National Park Service for Niobrara National Scenic River and Missouri National Recreational River contexts.
- USACE, NRD, city/county, and official local water-trail managers.
- USGS official live data and current-condition pages.

## Known Quirks

- Nebraska rivers can be shallow, sandy, braided, wind-exposed, and access-sensitive.
- Private land, sandbars, irrigation/diversion structures, low-water dragging, and seasonal hazards need explicit caveats.
- Niobrara and Missouri River routes may involve federal rules, outfitter/permit context, long shuttles, and weather/wind exposure.
- Do not infer numeric thresholds from broad water-trail presence.

## Initial Focus

- Start from official NGPC water-trail maps/pages.
- Likely first families to evaluate: Platte River Water Trail / Schramm-to-Louisville area, Elkhorn River official access segments, Niobrara public day segments, Calamus River canoe trail, and Missouri National Recreational River day segments.
- Record every reviewed lead in `docs/route-candidate-ledger.json`, even on no-add runs.

## 2026-07-06 Loup continuation pass

- Rebuilt the live Nebraska inventory from the repo state at run start and treated the app count, not the generated inbox count, as the baseline.
- Added `loup-river-monroe-columbus`, `loup-river-monroe-adm-access`, and `loup-river-george-syas-adm-access` from the same official Loup River Water Trail chain already in the repo.
- Qualification path:
  - Current Outdoor Nebraska / Nebraskaland still documents the public George D. Syas WMA start, the county-built Monroe access with parking, the hotel-side Columbus finish, and the fourth access 4.5 miles downstream near ADM.
  - Current City of Columbus material still describes Monroe as the signed public county access south of Monroe, still frames Monroe-to-Columbus as a 16-mile / 6-to-8-hour float, and still confirms the leased ADM access area south of Southeast 9th Street as the downstream continuation.
  - Same-day direct USGS Water Services returned `391 cfs / 4.42 ft` at `2026-07-06 02:45 CDT` for direct Genoa gauge `06793000`.
  - Threshold posture remains conservative `minimum-only` at `350 cfs` because the strongest numeric support is still the Nebraskaland low-water floor plus the 1,600 cfs middle-segment trip narrative, not a full official range.
- Endpoint anchors remain the accepted practical public-access coordinates already used in the live family: George D. Syas `41.43328221, -97.68464875`, Monroe `41.471508, -97.602729`, Columbus hotel-side finish `41.4195401, -97.3672208`, and the downstream ADM-area anchor `41.41603951, -97.2865376`.
- Current access caveat still applies: the City of Columbus says the Pawnee Park underpass connecting East and West Pawnee Park closed on June 9, 2025 and remains closed for the foreseeable future, so the Columbus checkpoint / finish continues to carry a same-day trail-circulation warning.
- No route-gallery image was added. `docs/river-image-source-audit.csv` records bounded Nebraskaland, City of Columbus, Global Energy Monitor, Wikimedia Commons, and same-river USGS media review without a selected rights-clean exact-route asset for the three new slugs.

## 2026-07-02 11:05 Implementation Pass

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 2 live Nebraska routes and 2 Nebraska trip-detail objects before editing (`platte-river-schramm-louisville` and `loup-river-george-syas-monroe`).
- Implemented `loup-river-george-syas-columbus`, `loup-river-george-syas-columbus`, and `loup-river-columbus-adm-access` from the same official Loup River Water Trail access chain.
- The prior Loup blocker cleared because current Nebraskaland and City of Columbus sources now gave a strong enough implementation package: George D. Syas WMA, the county-built Monroe access with parking, the hotel-side Columbus finish, and the newer ADM access site south of Southeast 9th Street are all named publicly; segment distances remain `8`, `16`, and `4.5` miles or matching `2-3 hour` / `6-8 hour` float language; and the Columbus finish still uses the Quality Inn / Ramada parking area plus Pawnee Park Trail from the riverbank.
- Same-day direct USGS Water Services returned current product-style values for `06793000` Loup River near Genoa: `321 cfs / 4.31 ft` at `2026-07-02 08:45 CDT`. Threshold posture stays conservative minimum-only at `350 cfs` because Nebraskaland supports the low-water floor and the `1600 cfs` middle-segment trip story, but no official high-water ceiling surfaced.
- Endpoint coordinates remain practical public-access anchors rather than survey-grade launch pins: George D. Syas `41.43328221, -97.68464875`, Monroe `41.471508, -97.602729`, Columbus hotel-side finish `41.4195401, -97.3672208`, and the downstream ADM-area anchor `41.41603951, -97.2865376`.
- Current access caveat: the City of Columbus says the Pawnee Park underpass connecting East and West Pawnee Park closed on June 9, 2025 and remains closed for the foreseeable future, so the Columbus finish keeps an explicit same-day trail/connection warning.
- No route-gallery image was added. `docs/river-image-source-audit.csv` records bounded Nebraskaland, City of Columbus, Global Energy Monitor, Wikimedia Commons, and same-river USGS media review without a selected rights-clean exact-route asset.

## 2026-06-12 12:58 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`, with 7 structured Nebraska ledger rows.
- Rechecked the six unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned product-style values for `06461500` Niobrara near Sparks (692 cfs / 2.72 ft at 2026-06-12 11:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 12:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 12:30 CDT), `06770200` Platte near Kearney (1590 cfs / 3.59 ft at 2026-06-12 12:15 CDT), and `06793000` Loup near Genoa (352 cfs at 2026-06-12 12:45 CDT / 4.42 ft at 2026-06-12 11:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but implementation-grade public endpoint coordinate pairs and an official high-water ceiling remain unresolved for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 12:48 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`, with 7 structured Nebraska ledger rows.
- Rechecked the six unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned product-style values for `06461500` Niobrara near Sparks (692 cfs / 2.72 ft at 2026-06-12 11:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 12:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 12:30 CDT), `06770200` Platte near Kearney (1590 cfs / 3.59 ft at 2026-06-12 12:15 CDT), and `06793000` Loup near Genoa (346 cfs / 4.42 ft at 2026-06-12 11:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but implementation-grade public endpoint coordinate pairs and an official high-water ceiling remain unresolved for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 12:38 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`, with 7 structured Nebraska ledger rows.
- Rechecked the six unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned product-style values for `06461500` Niobrara near Sparks (692 cfs / 2.72 ft at 2026-06-12 11:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 12:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 12:30 CDT), `06770200` Platte near Kearney (1590 cfs / 3.59 ft at 2026-06-12 12:15 CDT), and `06793000` Loup near Genoa (346 cfs / 4.42 ft at 2026-06-12 11:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but implementation-grade public endpoint coordinate pairs and an official high-water ceiling remain unresolved for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 12:29 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`, with 7 structured Nebraska ledger rows.
- Rechecked the six unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned product-style values for `06461500` Niobrara near Sparks (692 cfs / 2.72 ft at 2026-06-12 11:45 CDT), `06799350` Elkhorn at West Point (634 cfs / 4.10 ft at 2026-06-12 11:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 11:30 CDT), `06770200` Platte near Kearney (1670 cfs / 3.63 ft at 2026-06-12 11:15 CDT), and `06793000` Loup near Genoa (346 cfs / 4.42 ft at 2026-06-12 11:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but implementation-grade public endpoint coordinate pairs and an official high-water ceiling remain unresolved for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 12:18 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`, with 7 structured Nebraska ledger rows.
- Rechecked the six unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned the same current product-style values available to this run for `06461500` Niobrara near Sparks (692 cfs / 2.72 ft at 2026-06-12 11:45 CDT), `06799350` Elkhorn at West Point (634 cfs / 4.10 ft at 2026-06-12 11:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 11:30 CDT), `06770200` Platte near Kearney (1670 cfs / 3.63 ft at 2026-06-12 11:15 CDT), and `06793000` Loup near Genoa (346 cfs / 4.42 ft at 2026-06-12 11:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but implementation-grade public endpoint coordinate pairs and an official high-water ceiling remain unresolved for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 12:08 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`, with 7 structured Nebraska ledger rows.
- Rechecked the six unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (692 cfs / 2.72 ft at 2026-06-12 11:45 CDT), `06799350` Elkhorn at West Point (634 cfs / 4.10 ft at 2026-06-12 11:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 11:30 CDT), `06770200` Platte near Kearney (1670 cfs / 3.63 ft at 2026-06-12 11:15 CDT), and `06793000` Loup near Genoa (346 cfs / 4.42 ft at 2026-06-12 11:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but implementation-grade public endpoint coordinate pairs and an official high-water ceiling remain unresolved for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 11:58 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`, with 7 structured Nebraska ledger rows.
- Rechecked the six unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (702 cfs / 2.73 ft at 2026-06-12 10:45 CDT), `06799350` Elkhorn at West Point (634 cfs / 4.10 ft at 2026-06-12 11:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 11:30 CDT), `06770200` Platte near Kearney (1670 cfs / 3.63 ft at 2026-06-12 11:15 CDT), and `06793000` Loup near Genoa (346 cfs at 2026-06-12 11:45 CDT / 4.43 ft at 2026-06-12 10:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but implementation-grade public endpoint coordinate pairs and an official high-water ceiling remain unresolved for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 11:48 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`.
- Rechecked the six unimplemented Nebraska candidates: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, Kearney Water Trail, and Loup River Water Trail family.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (702 cfs / 2.73 ft at 2026-06-12 10:45 CDT), `06799350` Elkhorn at West Point (634 cfs / 4.10 ft at 2026-06-12 11:15 CDT), `06467500` Missouri at Yankton stage only (10.29 ft at 2026-06-12 11:30 CDT), `06770200` Platte near Kearney (1670 cfs / 3.63 ft at 2026-06-12 11:15 CDT), and `06793000` Loup near Genoa (352 cfs / 4.43 ft at 2026-06-12 10:45 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because source-backed numeric paddling thresholds tied to selected product-supported gauges have not surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains `no_live_gauge`: the route shape and 180-250 cfs local flow guidance are strong, but the direct official live gauge remains Nebraska DWEE `00145700`, and app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Loup River Water Trail remains `needs_manual_coordinates`: NGPC/Nebraskaland supports the route family and minimum-flow evidence tied to the Genoa gauge, but a targeted coordinate search found only non-official George D. Syas WMA coordinate context and did not verify implementation-grade public coordinate pairs for a selected George-Syas-to-Monroe or Monroe-to-Columbus day segment.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 11:38 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`.
- Rechecked the five remaining unimplemented Nebraska candidates: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (702 cfs / 2.73 ft at 2026-06-12 10:45 CDT), `06799350` Elkhorn at West Point (634 cfs / 4.10 ft at 2026-06-12 11:15 CDT), `06467500` Missouri at Yankton stage (10.29 ft at 2026-06-12 11:30 CDT), and `06770200` Platte near Kearney (1670 cfs / 3.63 ft at 2026-06-12 11:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest existing lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, and the app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- Added one Nebraska-only official-source near-miss to the ledger: `ne-loup-river-george-syas-monroe-columbus-family`. NGPC/Nebraskaland supports the Loup River Water Trail access sequence and gives useful Genoa-gauge evidence: 1600 cfs worked well on Monroe-to-Columbus, 350 cfs from George D. Syas WMA to Monroe required channel work but little walking, and 275 cfs is maintained. USGS `06793000` returned 352 cfs / 4.43 ft at 2026-06-12 10:45 CDT. The lead stays `needs_manual_coordinates` because implementation-grade public endpoint coordinate pairs were not verified, and any threshold model would be conservative minimum-only with no high-water ceiling.
- No app route data, trip details, route gallery, or implemented-route image rows changed.

## 2026-06-12 11:29 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`.
- Rechecked only the five remaining unimplemented Nebraska candidates: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (702 cfs / 2.73 ft at 2026-06-12 10:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06467500` Missouri at Yankton stage (10.27 ft at 2026-06-12 10:30 CDT), and `06770200` Platte near Kearney (1630 cfs / 3.61 ft at 2026-06-12 10:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest unimplemented lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, and the app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail; direct Nebraska DWEE station URLs redirected to `dwee.nebraska.gov` and returned HTTP 404 from this workspace.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 11:18 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 1 live Nebraska route and 1 Nebraska trip-detail object, both `platte-river-schramm-louisville`.
- Rechecked the five remaining unimplemented Nebraska candidates only: Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (702 cfs / 2.73 ft at 2026-06-12 10:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06467500` Missouri at Yankton stage (10.27 ft at 2026-06-12 10:30 CDT), and `06770200` Platte near Kearney (1630 cfs / 3.61 ft at 2026-06-12 10:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No second Nebraska route was added. Niobrara and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest unimplemented lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, and the app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail; a direct Nebraska DWEE station-detail probe returned HTTP 404 from this workspace.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 11:11 Implementation Pass

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: 0 live Nebraska routes and no Nebraska trip-detail objects before editing.
- Implemented `platte-river-schramm-louisville` as the first Nebraska V2 route.
- The prior Platte blocker cleared because Nebraska Game and Parks/Nebraskaland documents the Schramm-to-Louisville lower-Platte water-trail route, Schramm and Louisville access context, braided-channel/private-bed caveats, and numeric paddling guidance tied to USGS `06805500` at Louisville: below 5,000 cfs too little, 7,000-12,000 cfs ideal, above 16,000 cfs extreme caution, and 18,000 cfs avoid.
- USGS Water Services IV returned current product-style values for `06805500` Platte River at Louisville: 8,270 cfs / 4.09 ft at 2026-06-12 10:15 CDT.
- Endpoint coordinates were recorded as practical public-access anchors, not survey-grade ramp points: Schramm Park SRA canoe/kayak access `41.02036, -96.24974`; Louisville SRA Platte River boat ramp `41.01471, -96.15787`.
- No route-gallery image was added. `docs/river-image-source-audit.csv` records NGPC/Nebraskaland/USGS image leads and no selected rights-clean exact-route reusable asset.

## 2026-06-09 Seed No-Add Pass

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Created the first five Nebraska ledger rows: `ne-platte-river-schramm-louisville`, `ne-niobrara-river-cornell-smith-brewer-norden-family`, `ne-calamus-river-highway-7-calamus-sra`, `ne-elkhorn-river-public-access-family`, and `ne-missouri-river-mnrr-nebraska-family`.
- No route was added. Local product-style USGS Water Services IV and api.waterdata.usgs.gov checks for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` failed with `Unable to connect to the remote server`.
- Platte / Schramm-to-Louisville is the strongest simple route-shape lead because NGPC source-backs the access sequence and short mileage, but it remains `threshold_weak`: no numeric low/ideal/high paddling thresholds tied to a selected lower-Platte gauge surfaced.
- Niobrara remains `threshold_weak`: NPS and NGPC strongly support the corridor, access, and hazards, but NPS says minimal/optimal recreational flows are still being studied and does not publish app-ready numeric bands.
- Calamus remains `threshold_weak`: NGPC supports the 56.6-mile canoe trail, but it is long, private-land-sensitive, fence/low-bridge-heavy, and lacks selected day-route thresholds.
- Elkhorn remains `threshold_weak`: public access/gauge families exist, but no exact selected route, source-backed coordinate package, or numeric gauge-tied thresholds cleared.
- Missouri National Recreational River remains `research_later`: NPS supports paddling but public launches are few/unevenly spaced, and no Nebraska-side public day reach with big-river thresholds surfaced.

## 2026-06-09 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five existing Nebraska seed candidates. No route was added and no candidate moved to `likely_addable` or `needs_manual_coordinates`.
- Local product-style USGS Water Services IV fetch for `06461500`, `06805500`, `06799350`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- Decisive blocker remains threshold support: Platte, Niobrara, Calamus, and Elkhorn still lack source-backed numeric paddling bands tied to a selected product-supported gauge; Missouri National Recreational River still lacks a selected Nebraska-side public day reach and numeric private-paddlecraft stage/flow guidance.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-09 15:24 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV fetch for `06461500`, `06805500`, `06799350`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-09 17:25 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-09 19:25 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-09 21:26 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-09 23:27 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-10 01:29 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-10 03:30 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-10 05:35 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` observation fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-10 08:01 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` observation fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-10 10:02 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` observation fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-10 12:03 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked only the five seeded Nebraska candidates: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, and Missouri National Recreational River Nebraska family.
- Workspace product-style USGS Water Services IV and `api.waterdata.usgs.gov` observation fetches for `06461500`, `06799350`, `06805500`, `06787500`, and `06467500` still failed with `Unable to connect to the remote server`.
- No route was added. Platte, Niobrara, Calamus, and Elkhorn remain `threshold_weak`; Missouri National Recreational River remains `research_later`.
- Decisive blockers are unchanged: no candidate has source-backed numeric paddling thresholds tied to a selected product-supported gauge, and Missouri still lacks a selected Nebraska-side public day reach.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-11 17:41 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked the five seeded Nebraska candidates and added one Nebraska-only official-source lead to the ledger: Kearney Water Trail / Yanney Park to Central Avenue.
- USGS Water Services IV now returned product-style current readings for `06461500` Niobrara near Sparks, `06799350` Elkhorn at West Point, `06805500` Platte at Louisville, `06467500` Missouri River at Yankton stage, and `06770200` Platte near Kearney; `06787500` Calamus near Burwell returned only stale 1994 discharge, and `api.waterdata.usgs.gov` observation probes returned 404.
- No route was added. Platte, Niobrara, and Elkhorn remain blocked by missing source-backed numeric paddling thresholds tied to their selected product-supported gauges; Calamus remains blocked by stale gauge data, no short public day route, and no numeric thresholds; Missouri National Recreational River remains blocked by no selected Nebraska-side public day reach and no private-paddlecraft threshold model.
- Kearney Water Trail is promising on route shape and public access, with City/NGPC support and numeric 180-250 cfs flow guidance, but it is blocked because the direct official gauge is Nebraska DWEE `00145700` and PaddleTodayV2 currently supports only `usgs` and `mn_dnr` live providers. USGS `06770200` Platte near Kearney is current but was not accepted as a direct route gauge for the canal/Turkey Creek trail.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 07:15 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked the six existing Nebraska candidates only: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (692 cfs / 2.72 ft at 2026-06-12 06:45 CDT), `06799350` Elkhorn at West Point (634 cfs / 4.10 ft at 2026-06-12 06:15 CDT), `06805500` Platte at Louisville (9080 cfs / 4.23 ft at 2026-06-12 06:15 CDT), `06467500` Missouri at Yankton stage (10.31 ft at 2026-06-12 06:30 CDT), and `06770200` Platte near Kearney (1590 cfs / 3.59 ft at 2026-06-12 06:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No route was added. Platte, Niobrara, and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to the selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, and the app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney is current but remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 10:18 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked the six existing Nebraska candidates only: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (671 cfs / 2.70 ft at 2026-06-12 09:45 CDT), `06799350` Elkhorn at West Point (622 cfs / 4.08 ft at 2026-06-12 09:45 CDT), `06805500` Platte at Louisville (8380 cfs / 4.11 ft at 2026-06-12 09:15 CDT), `06467500` Missouri at Yankton stage (10.24 ft at 2026-06-12 09:30 CDT), and `06770200` Platte near Kearney (1650 cfs / 3.62 ft at 2026-06-12 09:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No route was added. Platte, Niobrara, and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to the selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, and the app source still limits `GaugeProvider` to `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney is current but remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 10:28 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked the six existing Nebraska candidates only: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (671 cfs / 2.70 ft at 2026-06-12 09:45 CDT), `06799350` Elkhorn at West Point (622 cfs / 4.08 ft at 2026-06-12 09:45 CDT), `06805500` Platte at Louisville (8380 cfs / 4.11 ft at 2026-06-12 09:15 CDT), `06467500` Missouri at Yankton stage (10.24 ft at 2026-06-12 09:30 CDT), and `06770200` Platte near Kearney (1650 cfs / 3.62 ft at 2026-06-12 09:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No route was added. Platte, Niobrara, and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to the selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, while PaddleTodayV2 still supports only `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney is current but remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 10:38 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked the six existing Nebraska candidates only: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (671 cfs / 2.70 ft at 2026-06-12 09:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06805500` Platte at Louisville (8270 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06467500` Missouri at Yankton stage (10.27 ft at 2026-06-12 10:30 CDT), and `06770200` Platte near Kearney (1630 cfs / 3.61 ft at 2026-06-12 10:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No route was added. Platte, Niobrara, and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to the selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, while PaddleTodayV2 still supports only `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney is current but remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 10:48 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked the six existing Nebraska candidates only: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (671 cfs / 2.70 ft at 2026-06-12 09:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06805500` Platte at Louisville (8270 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06467500` Missouri at Yankton stage (10.27 ft at 2026-06-12 10:30 CDT), and `06770200` Platte near Kearney (1630 cfs / 3.61 ft at 2026-06-12 10:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No route was added. Platte, Niobrara, and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to the selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, while PaddleTodayV2 still supports only `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney is current but remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- No app route data, trip details, route gallery, or image-audit rows changed.

## 2026-06-12 10:58 Blocker Refresh

- Rebuilt current Nebraska inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`: still 0 live Nebraska routes and no Nebraska trip-detail objects.
- Rechecked the six existing Nebraska candidates only: Platte Schramm-to-Louisville, Niobrara Cornell/Smith/Brewer/Norden family, Calamus Highway-7-to-Calamus-SRA, Elkhorn public-access/gauge family, Missouri National Recreational River Nebraska family, and Kearney Water Trail.
- USGS Water Services IV returned current product-style values for `06461500` Niobrara near Sparks (671 cfs / 2.70 ft at 2026-06-12 09:45 CDT), `06799350` Elkhorn at West Point (628 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06805500` Platte at Louisville (8270 cfs / 4.09 ft at 2026-06-12 10:15 CDT), `06467500` Missouri at Yankton stage (10.27 ft at 2026-06-12 10:30 CDT), and `06770200` Platte near Kearney (1630 cfs / 3.61 ft at 2026-06-12 10:15 CDT). `06787500` Calamus near Burwell still returned only stale 1994 discharge.
- No route was added. Platte, Niobrara, and Elkhorn remain `threshold_weak` because no source-backed numeric paddling thresholds tied to the selected product-supported gauges surfaced. Calamus remains blocked by stale gauge data, no selected short public day reach, and no numeric thresholds. Missouri National Recreational River remains `research_later` because no Nebraska-side public day reach with private-paddlecraft thresholds surfaced.
- Kearney Water Trail remains the closest lead but stays `no_live_gauge`: City/NGPC route context and 180-250 cfs local flow guidance are strong, but the direct live gauge is Nebraska DWEE `00145700`, while PaddleTodayV2 still supports only `usgs` and `mn_dnr`. USGS `06770200` Platte near Kearney is current but remains an unacceptable mainstem proxy for the canal/Turkey Creek water trail.
- No app route data, trip details, route gallery, or image-audit rows changed.
## 2026-08-20 18:48 Controller-led gauge review

- Reviewed five previously unreviewed tier-1 Nebraska gauges from provider-baseline-2026-08-14: USGS 06453600 Ponca Creek at Verdel, 06453620 Missouri River below Ponca Creek, 06454100 Niobrara at Agate, 06460800 Niobrara at Borman Bridge, and 06461080 Niobrara at Cornell Bridge.
- Recorded durable dispositions: 06453600, 06453620, 06460800, and 06461080 are `blocked/route_capable` because no station-specific runnable threshold and complete endpoint, access, safety, camping, coordinate, geometry, and image package cleared. 06454100 is `screened_out/not_paddle_relevant` because it is seasonal/upstream of the public scenic access system and currently reports equipment malfunction.
- Official sources confirmed real paddling context at the Niobrara scenic river, Borman Bridge, Cornell/Fort Niobrara launch, and Nebraska water-trail system, but the quality bar was not met. No route, trip detail, geometry, gallery, or image-audit row was added.
- Gatekeeper passed for evidence, safety, independent verification, tests/build, and rollback. Retry only with materially new manager-grade threshold and complete route-package evidence.

## 2026-08-21 Second Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06461500 Niobrara River near Sparks, 06463500 Long Pine Creek near Riverview, 06463720 Niobrara River at Mariaville, 06465500 Niobrara River near Verdel, and 06465520 Niobrara River below Soldier Creek.
- 06461500, 06463500, 06463720, and 06465500 are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. 06465520 is `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available for a live route threshold.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twelfth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06769525 Elm Creek near Elm Creek, 06770200 Platte River near Kearney, 06770500 Platte River near Grand Island, 06772100 Wood River at Grand Island, and 06772775 Warm Slough near Central City.
- All five are `blocked/route_capable`: current discharge is published, with Warm Slough effectively at zero flow, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Thirteenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06772898 Silver Creek at Mile 4 near Silver Creek, 06773500 Prairie Creek near Silver Creek, 06774000 Platte River near Duncan, 06775500 Middle Loup River at Dunning, and 06775900 Dismal River near Thedford.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Fourteenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06777495 Middle Loup River near Gates, 06781600 South Loup River at Arnold, 06781900 South Loup River at Pressey WMA, 06784000 South Loup River at Saint Michael, and 06785000 Middle Loup River at Saint Paul.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Fifteenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06785500 North Loup River at Brewster, 06786000 North Loup River at Taylor, 06790500 North Loup River near Saint Paul, 06792000 Cedar River near Fullerton, and 06794000 Beaver Creek at Genoa.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Sixteenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06794650 Clear Creek west of the Polk County line, 06794700 Platte River near Schuyler, 06795500 Shell Creek near Columbus, 06796000 Platte River at North Bend, and 06796450 Platte River near Fremont.
- Three are `blocked/route_capable` because current discharge is published but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. Two are `stale_or_unsupported/route_capable` because the current page exposes gage height without a supported live 00060 discharge parameter.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Seventeenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06796500 Platte River near Leshara, 06796550 Platte River near Venice, 06797500 Elkhorn River at Ewing, 06799000 Elkhorn River at Norfolk, and 06799100 North Fork Elkhorn River near Pierce.
- Four are `blocked/route_capable` because current discharge is published but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. One is `stale_or_unsupported/route_capable` because the current page exposes gage height without a supported live 00060 discharge parameter.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Eighteenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06799315 Elkhorn River at Pilger, 06799350 Elkhorn River at West Point, 06799445 Logan Creek at Wakefield, 06799500 Logan Creek near Uehling, and 06800000 Maple Creek near Nickerson.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Nineteenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06800500 Elkhorn River at Waterloo, 06801000 Platte River near Ashland, 06803000 Salt Creek at Roca, 06803080 Salt Creek at Pioneers Boulevard, and 06803093 Haines Branch at SW 56th Street.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twentieth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06803170 Middle Creek at SW 63rd Street, 06803300 Antelope Creek at 27th Street, 06803420 North Oak Creek near Touhy, 06803430 North Oak Creek at Valparaiso, and 06803486 Oak Creek at Air Park Road.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-First Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06803495 Salt Creek at Innovation Campus, 06803500 Salt Creek at 27th Street, 06803502 Deadmans Run at 38th Street, 06803510 Little Salt Creek near Lincoln, and 06803513 Salt Creek at 70th Street.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-Second Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06803520 Stevens Creek near Lincoln, 06803530 Rock Creek near Ceresco, 06803555 Salt Creek at Greenwood, 06803960 Wahoo Creek at South Chestnut Street, and 06804000 Wahoo Creek at Ithaca.
- Four are `blocked/route_capable` because current discharge is published but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. One is `stale_or_unsupported/route_capable` because the current page exposes gage height without a supported live 00060 discharge parameter.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-Third Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06804700 Wahoo Creek at Ashland, 06805000 Salt Creek near Ashland, 06805515 Buffalo Creek near Springfield, 06805530 Springfield Creek at Springfield, and 06805570 Platte River at La Platte.
- One is `blocked/route_capable` because current discharge is published but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. Four are `stale_or_unsupported/route_capable` because the current page exposes gage height without a supported live 00060 discharge parameter.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-Fourth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06806500 Weeping Water Creek at Union, 06807000 Missouri River at Nebraska City, 06810070 Missouri River at Brownville, 06811500 Little Nemaha River at Auburn, and 06813500 Missouri River at Rulo.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access and takeout evidence was incomplete; Missouri River gauges also require navigation-hazard and route-safety review.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-Fifth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06814500 North Fork Big Nemaha River at Humboldt, 06815000 Big Nemaha River at Falls City, 06821500 Arikaree River at Haigler, 06823000 North Fork Republican River at the Colorado-Nebraska line, and 06823500 Buffalo Creek near Haigler.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. The three western gauges also have low current flow, which is not a strong promotion signal.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-Sixth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06824000 Rock Creek at Parks, 06824500 Republican River at Benkelman, 06827500 South Fork Republican River near Benkelman, 06828500 Republican River at Stratton, and 06834000 Frenchman Creek at Palisade.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. Current flow was low or zero at all five gauges, so none was a strong promotion candidate.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-Seventh Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06835500 Frenchman Creek at Culbertson, 06836500 Driftwood Creek near McCook, 06837000 Republican River at McCook, 06838000 Red Willow Creek near Red Willow, and 06844500 Republican River near Orleans.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. Current flow was low or near zero at all five gauges.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Twenty-Eighth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06847000 Beaver Creek near Beaver City, 06847500 Sappa Creek near Stamford, 06853020 Republican River at Guide Rock, 06880800 West Fork Big Blue River near Dorchester, and 06881000 Big Blue River near Crete.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. The first three also had low or zero current flow.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the final five residual NE gauges.

## 2026-08-21 Twenty-Ninth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06881380 Turkey Creek near DeWitt, 06882000 Big Blue River at Barneston, 06883000 Little Blue River near Deweese, 06883530 Little Blue River at County Line, and 06884000 Little Blue River near Fairbury.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. Little Blue River near Deweese also had low current flow.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Nebraska now has durable dispositions for all 147 eligible gauges.

## 2026-08-21 Final Bounded Discovery Sweep

- Screened five distinct Nebraska families outside the already represented route cards: Turkey Creek, Big Blue River, Little Blue River, Missouri tributary access corridors, and Republican tributary reaches.
- No new strong scored route was found. Candidates were duplicates of reviewed gauge families or failed one or more endpoint, access/takeout, threshold, camping, navigation/hazard, safety, coordinate, geometry, or image gates. No route was promoted.

## 2026-08-21 Eleventh Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06768000 Platte River near Overton, 06768020 Spring Creek near Overton, 06768025 Platte River South Channel near Cottonwood Ranch, 06768035 Platte River Mid-Channel near Cottonwood Ranch, and 06769000 Buffalo Creek near Overton.
- All five are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Tenth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06610798 Papillion Creek at Harlan Lewis Road, 06680500 North Platte River at Scottsbluff, 06762500 Lodgepole Creek at Bushnell, 06764880 South Platte River at Roscoe, and 06767970 Platte River J-2 outflow near Overton.
- 06610798 is `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available. 06680500 is `stale_or_unsupported/route_capable` because its latest instantaneous discharge observation was stale (2026-07-14). 06762500, 06764880, and 06767970 are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Ninth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06610785 West Papillion Creek at Millard, 06610786 South Papillion Creek near Gretna, 06610788 South Papillion Creek at Chalco, 06610793 West Papillion Creek at Papillion, and 06610795 Papillion Creek at Fort Crook.
- 06610785, 06610788, 06610793, and 06610795 are `blocked/route_capable`: current discharge is effectively zero and independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. 06610786 is `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Eighth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06610760 Cole Creek at Blondo Street, 06610765 Little Papillion Creek at Ak-Sar-Ben, 06610770 Big Papillion Creek at Q Street, 06610773 West Papillion Creek at Elkhorn, and 06610780 West Papillion Creek at Pacific Street.
- 06610765 and 06610770 are `blocked/route_capable`: current discharge is effectively zero and independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. 06610760, 06610773, and 06610780 are `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Seventh Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06610720 Big Papillion Creek near Bennington, 06610732 Big Papillion Creek at Fort Street, 06610740 Big Papillion Creek at Pacific Street, 06610742 Thomas Creek near Bennington, and 06610750 Little Papillion Creek at Irvington.
- 06610720, 06610732, and 06610750 are `blocked/route_capable`: current discharge is effectively zero and independently verified public endpoint/access, takeout, and route-safety evidence was incomplete. 06610740 and 06610742 are `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Sixth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06610490 Missouri River at Highway 92 at Omaha, 06610670 Missouri River at Highway 370 at Bellevue, 06610685 Offutt Ditch near Offutt AFB, 06610705 Big Papillion Creek near Blair, and 06610710 Big Papillion Creek near Kennard.
- All five are `stale_or_unsupported/route_capable`: the current pages did not expose a supported 00060 discharge parameter for a live route threshold.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Fifth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06601000 Omaha Creek at Homer, 06601085 North Blackbird Creek at Macy, 06601095 South Blackbird Creek near Macy, 06601100 Blackbird Creek near Macy, and 06610000 Missouri River at Omaha.
- 06601085, 06601095, and 06601100 are `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available. 06601000 and 06610000 are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Fourth Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06478522 Bow Creek near Wynot, 06478523 Missouri River near St. James, 06478526 Missouri River near Maskell, 06486000 Missouri River at Sioux City, and 06600900 South Omaha Creek at Walthill.
- 06478523 and 06478526 are `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available. 06478522, 06486000, and 06600900 are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.

## 2026-08-21 Third Five-Gauge Controller-Led Review

- No route added. Reviewed USGS 06466000 Niobrara River at Niobrara, 06466010 Missouri River at Niobrara, 06466400 Bazile Creek at Center, 06466470 Howe Creek below Walker Draw, and 06466500 Bazile Creek near Niobrara.
- 06466000 and 06466010 are `stale_or_unsupported/route_capable` because no supported 00060 discharge parameter was available. 06466400, 06466470, and 06466500 are `blocked/route_capable`: current discharge is published, but independently verified public endpoint/access, takeout, and route-safety evidence was incomplete.
- No route, trip detail, geometry, gallery, or image-audit row was added. Gatekeeper passed evidence, safety, independent verification, tests/build, and rollback checks. Next review remains bounded to the next five residual NE gauges.
