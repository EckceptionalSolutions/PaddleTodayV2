# Nebraska Route Memory

Created 2026-06-08 for the `nebraska-route-additions` automation.

## Current Inventory

- Current live Nebraska routes in `src/data/rivers.ts`: 5 as of 2026-07-02 11:05 implementation pass (`platte-river-schramm-louisville`, `loup-river-george-syas-monroe`, `loup-river-george-syas-columbus`, `loup-river-george-syas-columbus`, `loup-river-columbus-adm-access`).
- Current Nebraska candidate ledger rows: 7 as of 2026-06-12 12:58 blocker refresh.
- Automation posture: seed a small official-source candidate set, then add at most one route only if all gates clear.

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
