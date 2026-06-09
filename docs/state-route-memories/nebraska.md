# Nebraska Route Memory

Created 2026-06-08 for the `nebraska-route-additions` automation.

## Current Inventory

- Current live Nebraska routes in `src/data/rivers.ts`: 0 as of setup.
- Current Nebraska candidate ledger rows: 5 as of 2026-06-09 seed pass.
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
