# Pennsylvania Route Memory

Created 2026-06-08 for the `pennsylvania-route-additions` automation.

## Current Inventory

- Current live Pennsylvania routes in `src/data/rivers.ts`: 0 as of 2026-06-09 seed pass.
- Current Pennsylvania candidate ledger rows: 3 as of 2026-06-09.
- Automation posture: seed a small official-source candidate set, then add at most one route only if all gates clear.

## Source Priorities

- Pennsylvania Fish and Boat Commission water-trail pages and access information.
- Pennsylvania DCNR paddling, state-park, state-forest, and ExplorePAtrails pages.
- Pennsylvania Environmental Council and official water-trail manager guides.
- NPS, USACE, county/city park agencies, USGS, and American Whitewater where relevant.

## Known Quirks

- Pennsylvania has many designated water trails; avoid broad statewide discovery and keep each run to a small reviewed set.
- PFBC/DCNR access may involve launch permits or registration for unpowered boats; surface source-backed access/permit context without giving broader legal advice.
- Large-river routes need segmentation, island/current/weather hazards, and take-out discipline.
- Whitewater or rapid/dam-adjacent routes require explicit risk handling and `routeType: 'whitewater'` where appropriate.
- Urban routes need storm-runoff and water-quality caveats where source-backed.

## Initial Focus

- Start from PFBC/DCNR designated water trails and official access maps.
- Likely first families to evaluate: Three Rivers Water Trail short urban segments, Susquehanna Water Trail day segments, Delaware River public-access day segments, Juniata/Raystown Branch segments, and Youghiogheny/Ohiopyle-area routes only if whitewater classification and gauge thresholds are clear.
- Record every reviewed lead in `docs/route-candidate-ledger.json`, even on no-add runs.

## Run Notes

- 2026-06-09 13:25 America/Chicago / 2026-06-09 18:25 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but local product-style checks for USGS `03081500` failed through Water Services IV, api.waterdata.usgs.gov observations, and WDFN page fetches with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-09 08:42 America/Chicago / 2026-06-09 13:42 UTC: First Pennsylvania seed pass; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 0 prior PA ledger rows.
  - Seeded three official-source candidate rows: `pa-youghiogheny-lower-yough-ohiopyle-bruner-run`, `pa-lehigh-white-haven-rockport`, and `pa-three-rivers-water-trail-pittsburgh-family`.
  - Strongest recheck lead is Lower Yough. DCNR supports the exact Ohiopyle-to-Bruner-Run route, whitewater class, launch-ticket/access context, PFD/helmet rules, and hazards; AW supplies Ohiopyle stage bands tied to USGS `03081500`. Blocker: local product-style USGS Water Services IV fetch failed with `Unable to connect to the remote server`, and visible official USGS text was stale rather than same-day product-ready.
  - Lehigh White Haven-to-Rockport remained blocked because the visible AW live gauge is a virtual Stream Team calculation rather than a direct product-supported gauge currently usable by PaddleTodayV2.
  - Three Rivers Water Trail remained `threshold_weak`: PFBC/Friends access evidence is strong, but no selected endpoint pair plus numeric route-specific gauge model cleared. Future work must keep urban large-river hazards, locks/dams, barges, bridge piers, islands, storm runoff, and water-quality caveats explicit.
