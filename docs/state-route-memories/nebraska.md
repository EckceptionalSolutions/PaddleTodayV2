# Nebraska Route Memory

Created 2026-06-08 for the `nebraska-route-additions` automation.

## Current Inventory

- Current live Nebraska routes in `src/data/rivers.ts`: 0 as of 2026-06-12 blocker refresh.
- Current Nebraska candidate ledger rows: 6 as of 2026-06-12 blocker refresh.
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
