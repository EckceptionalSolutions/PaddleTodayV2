# Pennsylvania Route Memory

Created 2026-06-08 for the `pennsylvania-route-additions` automation.

## Current Inventory

- Current live Pennsylvania routes in `src/data/rivers.ts`: 14 as of 2026-06-23 implementation passes.
- Current Pennsylvania trip-detail objects: 14 as of 2026-06-23.
- Current Pennsylvania candidate ledger rows: 14 implemented rows as of 2026-06-23.
- Automation posture: keep Pennsylvania limited to small high-confidence batches from official guide families, using only routes with official access, product-supported live gauge evidence, and numeric thresholds.

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

- 2026-06-23 11:20 America/Chicago / 2026-06-23 16:20 UTC: Pennsylvania three-route implementation pass; added three lower Juniata routes.
  - Rebuilt current inventory from route objects and trip details before editing: 14 live Pennsylvania routes, 14 Pennsylvania trip-detail keys, and 14 implemented Pennsylvania ledger rows before this pass.
  - Implemented `juniata-river-granville-victory-park`, `juniata-river-victory-park-lewistown-narrows`, and `juniata-river-newport-green-valley` from the PFBC lower Juniata guide.
  - Qualification package: the PFBC lower Juniata guide publishes exact Granville, Victory Park, Lewistown Narrows, Newport, and Green Valley coordinates, official segment mileages, route-specific caution points, and direct minimum gauge floors of `3.1 ft` at Lewistown and `3.5 ft` at Newport. Same-day direct USGS Water Services returned `950 cfs / 3.24 ft` at Lewistown (`01564895`) and `1,260 cfs / 3.61 ft` at Newport (`01567000`) on 2026-06-23.
  - Camping and safety/logistics notes were added for all three routes. Granville-to-Victory uses nearby-basecamp because Locust Campground sits just downstream of the put-in; Victory-to-Narrows stays `unknown` because the broader Juniata trail has island-camping context but no specific short-segment campsite is identified; Newport-to-Green-Valley is `endpoint_campground`.
  - Added one new Lewistown Commons corridor image by Dough4872 (CC BY-SA 4.0) and reused it for the two Lewistown-area routes, plus one public-domain Newport-corridor image by Nyttend for the Green Valley route.

- 2026-06-23 10:45 America/Chicago / 2026-06-23 15:45 UTC: Pennsylvania three-route implementation pass; added three Section 3 North Branch routes.
  - Rebuilt current inventory from route objects and trip details before editing: 11 live Pennsylvania routes, 11 Pennsylvania trip-detail keys, and 11 implemented Pennsylvania ledger rows before this pass.
  - Implemented `susquehanna-river-canal-park-pfbc-union-township`, `susquehanna-river-pfbc-union-township-wetlands`, and `susquehanna-river-wetlands-test-track` from the PFBC North Branch Susquehanna Section 3 guide.
  - Qualification package: PFBC Section 3 publishes exact coordinates for Canal Park, PFBC Union Township, Wetlands Nature Area, and Test Track Park; the same guide writes the safe-base, low-water, and novice-high-water guidance around the Towanda/Wilkes-Barre/Bloomsburg stage relationship; and it flags the two section-specific hazards that matter here, the long class I-II rapid below the Nanticoke bridge and the Berwick-Nescopeck low-water ledge. Same-day direct USGS Water Services returned `4070 cfs / 1.28 ft` at Wilkes-Barre (`01536500`) and `4350 cfs / 1.69 ft` at Bloomsburg (`01538700`) on 2026-06-23.
  - Camping and safety/logistics notes were added for all three routes. All three stay `none` for camping because the official Section 3 guide says camping on the river is none, and the route copy keeps private-bank limits explicit.
  - No gallery image was added; bounded Commons, PFBC guide-imagery, and USGS-media checks did not produce a clearly rights-clean exact Section 3 paddling image.

- 2026-06-23 10:20 America/Chicago / 2026-06-23 15:20 UTC: Pennsylvania three-route implementation pass; added three lower North Branch routes.
  - Rebuilt current inventory from route objects and trip details before editing: 8 live Pennsylvania routes, 8 Pennsylvania trip-detail keys, and 8 implemented Pennsylvania ledger rows before this pass.
  - Implemented `susquehanna-river-pfbc-danville-wrays`, `susquehanna-river-wrays-shikellamy-west`, and `susquehanna-river-pfbc-danville-shikellamy-west` from the current 2021 North Branch Susquehanna guide.
  - Qualification package: the current guide publishes exact access coordinates for PFBC Danville, Wray's Riverfront Campground, and Shikellamy State Park West; official Danville Section 13-14 stage guidance at `2 ft` lower limit, `4 ft` good paddling level, and `7 ft` novice ceiling; and lower-corridor caution context for Lake Augusta and Sunbury Fabridam. Same-day direct USGS Water Services returned `4480 cfs / 3.22 ft` at Danville (`01540500`) and `4350 cfs / 1.69 ft` at Bloomsburg (`01538700`) on 2026-06-23.
  - Camping and safety/logistics notes were added for all three routes. Wray's supports endpoint campground classification for the short Danville link and the lower Wray's-to-Shikellamy route, while the full Danville-to-Shikellamy route stays nearby-basecamp only because the corridor campgrounds are support rather than a committed route overnight.
  - No gallery image was added; bounded Commons, guide-imagery, and USGS-media checks did not produce a clearly rights-clean exact lower Danville/Shikellamy paddling image.

- 2026-06-23 09:07 America/Chicago / 2026-06-23 14:07 UTC: Pennsylvania three-route implementation pass; added three routes.
  - Rebuilt current inventory from route objects and trip details before editing: 5 live Pennsylvania routes, 5 Pennsylvania trip-detail keys, and 5 implemented Pennsylvania ledger rows before this pass.
  - Implemented `susquehanna-river-laceyville-meshoppen`, `susquehanna-river-tunkhannock-whites-ferry`, and `susquehanna-river-whites-ferry-west-falls` from the PFBC North Branch Susquehanna Section 2 guide.
  - Qualification package: PFBC Section 2 publishes exact access coordinates, river-mile spacing, route-specific caution miles, corridor camping context, and the Meshoppen/Towanda gauge-height relationship. Same-day direct USGS Water Services returned `2740 cfs / 8.28 ft` at Meshoppen (`01533400`) and `2520 cfs / 0.78 ft` at Towanda (`01531500`) on 2026-06-23.
  - Route models stay intentionally conservative and marked as derived/proxy where appropriate: PFBC says Towanda, Wilkes-Barre, and Bloomsburg read about the same, and Meshoppen reads about `9 ft` when those gauges read about `2 ft`, so V2 uses roughly `6.5-9 ft` as the easier planning window and treats about `12 ft` at Meshoppen as novice no-go water.
  - Camping and safety/logistics notes were added for all three routes. Route-specific cautions include the mile-238 fast-current hidden-rock zone for Laceyville-to-Meshoppen, the mile-215 boulder field plus mile-214 riffles for Tunkhannock-to-White's Ferry, and the mile-210 fast-riffle stretch for White's-Ferry-to-West-Falls.
  - Added two rights-clean Commons aerials by Bjoertvedt (CC BY-SA 3.0): a Laceyville corridor image for `susquehanna-river-laceyville-meshoppen` and a Tunkhannock/Wyoming County corridor image reused for the two downstream Section 2 adds.

- 2026-06-12 07:22 America/Chicago / 2026-06-12 12:22 UTC: Pennsylvania implementation pass; added one route.
  - Rebuilt current inventory from route objects and trip details before editing: 1 live Pennsylvania route (`youghiogheny-river-lower-yough-ohiopyle-bruner-run`), 1 Pennsylvania trip-detail key, and 3 structured PA ledger rows.
  - Implemented `lehigh-river-white-haven-rockport` for the Lehigh River / Lehigh Gorge State Park from White Haven South Access Area to Rockport Access Area.
  - The prior Lehigh blocker cleared: USGS Water Services IV for `01447800` returned same-day 2026-06-12 discharge and gage-height values for Lehigh River below Francis E. Walter Reservoir near White Haven, and USACE Lehigh Basin data independently showed same-day WhiteHaven outflow.
  - Qualification package: DCNR supports the exact White Haven-to-Rockport 8.7-mile route, designated-access rules, Class II-III gorge hazards, release-day parking/traffic caveats, whitewater craft/PFD/helmet rules, and official cfs bands; PFBC supports the unpowered-boat registration/launch-permit context for PFBC/DCNR accesses.
  - Route ships as `routeType: 'whitewater'` with a two-sided discharge model on USGS `01447800`: ideal 250-1,000 cfs, too low below 250 cfs, and too high at 5,000 cfs and above. Copy keeps dam-release timing, low water, high/expert water, cold water, ledges, rock outcrops, waterfalls, crowding, release-day traffic, designated-access-only rules, and Rockport take-out discipline explicit.
  - Endpoint coordinates use DCNR White Haven South Access GPS and a cross-checked Rockport access coordinate because the DCNR Rockport page appears to publish an impossible latitude typo. No gallery image was added; image audit records no rights-clean exact-route image selected in this pass.
  - Three Rivers remains `threshold_weak` pending a selected endpoint pair plus numeric route-specific gauge model.

- 2026-06-11 17:44 America/Chicago / 2026-06-11 22:44 UTC: Pennsylvania implementation pass; added one route.
  - Rebuilt current inventory from route objects and trip details before editing: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Implemented `youghiogheny-river-lower-yough-ohiopyle-bruner-run` for the Lower Yough / Youghiogheny River from Ohiopyle State Park Lower Yough launch to Bruner Run Take-out.
  - The prior Lower Yough blocker cleared: USGS Water Services IV for `03081500` returned same-day 2026-06-11 discharge and stage values, and the official USGS current page showed same-day Ohiopyle values.
  - Qualification package: DCNR supports the exact seven-mile Ohiopyle-to-Bruner-Run route, Class III-IV hazards, PFD/helmet requirements, launch-ticket window, and Bruner Run context; American Whitewater supports the Ohiopyle-to-Bruner-Run reach, direct `03081500` gauge relationship, endpoint feature coordinates, and numeric stage bands; PFBC supports the unpowered-boat registration/launch-permit context for PFBC/DCNR accesses.
  - Route ships as `routeType: 'whitewater'` with a two-sided stage model: ideal 1.7-4.0 ft, too low below 1.1 ft, too high at 7.0 ft and above. Copy keeps Dimple/undercut, ledge, hydraulic, pin, cold-swim, crowding, access/shuttle, and high-water escalation hazards explicit.
  - No gallery image was added; image audit records no rights-clean exact-route image selected in this pass.
  - Lehigh White Haven-to-Rockport remains blocked by direct product-supported live-gauge uncertainty, and Three Rivers remains `threshold_weak` pending a selected endpoint pair plus numeric route-specific gauge model.

- 2026-06-10 12:03 America/Chicago / 2026-06-10 17:03 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and the WDFN current-condition page with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; direct USGS `01449000` Water Services and WDFN probes failed locally with `Unable to connect to the remote server`, and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-10 10:01 America/Chicago / 2026-06-10 15:01 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and the WDFN current-condition page with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; direct USGS `01449000` Water Services and WDFN probes failed locally with `Unable to connect to the remote server`, and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-10 08:02 America/Chicago / 2026-06-10 13:02 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and the WDFN current-condition page with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; direct USGS `01449000` Water Services and WDFN probes failed locally with `Unable to connect to the remote server`, and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-10 08:00 America/Chicago / 2026-06-10 13:00 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and the WDFN current-condition page with DNS resolution errors (`remote name could not be resolved`); product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; direct USGS `01449000` Water Services and WDFN probes failed locally with DNS resolution errors, and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-10 03:31 America/Chicago / 2026-06-10 08:31 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and the WDFN current-condition page with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; direct USGS `01449000` Water Services and WDFN probes failed locally, and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-10 01:31 America/Chicago / 2026-06-10 06:31 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and the WDFN current-condition page with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; direct USGS `01449000` Water Services and WDFN probes failed locally, and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-09 23:29 America/Chicago / 2026-06-10 04:29 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and the WDFN current-condition page with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; direct USGS `01449000` Water Services and WDFN probes failed locally, and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-09 21:28 America/Chicago / 2026-06-10 02:28 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows, and no Pennsylvania trip-detail keys.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but workspace product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and WDFN page fetches with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; a direct USGS `01449000` Water Services probe also failed locally and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-09 19:26 America/Chicago / 2026-06-10 00:26 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but local product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and WDFN page fetches with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; a direct USGS `01449000` probe also failed locally and the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-09 17:26 America/Chicago / 2026-06-09 22:26 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but local product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and WDFN page fetches with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

- 2026-06-09 15:25 America/Chicago / 2026-06-09 20:25 UTC: Pennsylvania blocker refresh; no route added.
  - Rebuilt current inventory from route objects and trip details: 0 live Pennsylvania routes, 3 structured PA ledger rows.
  - Reviewed only the existing official-source seed set: Lower Yough Ohiopyle-to-Bruner-Run, Lehigh White Haven-to-Rockport, and Three Rivers Water Trail Pittsburgh family.
  - Lower Yough remains the strongest next recheck, but local product-style checks for USGS `03081500` failed again through Water Services IV, api.waterdata.usgs.gov observations, and WDFN page fetches with `Unable to connect to the remote server`; product-live remains unsatisfied despite strong DCNR route/access evidence and AW Ohiopyle stage bands.
  - Lehigh White Haven-to-Rockport remains `no_live_gauge`: DCNR supports the 8.7-mile Class II-III route, designated state-park access areas, release context, safety rules, and numeric flow guidance, but no locally verified product-supported direct live gauge cleared the app gate; the prior AW virtual gauge is not an app-supported live source.
  - Three Rivers Water Trail remains `threshold_weak`: official access evidence is broad, but no specific endpoint pair plus route-specific numeric gauge model was selected.
  - No app route data, trip details, gallery, or image-audit rows changed.

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
