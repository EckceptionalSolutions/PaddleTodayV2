## 2026-05-23T16:25:33.173Z follow-up run (executed 2026-05-23 America/Chicago)

- Attempted focused pass on `wi-bark-river-princes-point-burnt-village-park`.
- Environment blocker: all executable tooling failed (`shell_command` and `node_repl`) with `windows sandbox failed: setup refresh failed with status exit code: 1`.
- Could not read repository files, implement route records, or run `npm test` in this run due to sandbox execution outage.
- Resolved 2026-05-24: shell access is working again, and the Bark River route is now implemented as `bark-river-princes-point-burnt-village-park` with route data, trip details, ledger status, and image-audit row updated.
- Completed web verification prep for next unblocked run:
  - Threshold source confirmed: Wisconsin River Trips Bark River – Prince's Point (`0-30 low but fine; 31-50 average; 51-75 above average; 76-100 high but fine; 101+ flooded/woods paddling`).
  - Gauge source confirmed: USGS `05426250` Bark River near Rome.
  - Access/coordinate source confirmed: Jefferson County Watertrail Guide PDF:
    - Prince’s Point Wildlife Area: `42°53'39\"N, -88°42'3.95\"W`
    - Burnt Village Park: `42°54'53\"N, -88°46'45.31\"W`
  - Public access corroboration captured: Travel Wisconsin page for Burnt Village County Park on CTH N at Bark River bridge.
- Next run objective: continue with fresh candidates; do not retry Bark unless new source evidence changes the route.

## 2026-05-25T17:36:52Z follow-up run (executed 2026-05-25 America/Chicago)

- Added `kickapoo-river-rockton-la-farge` after confirming Bark River and Sugar River were already implemented and Black Earth Creek remained blocked by the 2025 Scherbel/Salmo obstruction report.
- Updated route data, trip details, candidate ledger, and image audit.
- Gauge: USGS `05408000` Kickapoo River at La Farge, direct same-river gauge near the take-out.
- Threshold/range source: MilesPaddled Kickapoo River II exact-route notes plus Wisconsin River Trips Rockton-to-La Farge; implemented conservative `60-120 cfs` target, `42 cfs` low floor, and `200+ cfs` broad-audience caution.
- Coordinates: Landing 12/Rockton `43.6371, -90.60292`; Landing 20/La Farge `43.57481, -90.6437`.
- Photo: no new gallery asset; image audit records the existing rights-clean broad Kickapoo Valley Commons lead, but no exact-route asset was ingested.
- Validation: ledger JSON ok, `npm.cmd run typecheck` passed, `git diff --check` passed. `npm.cmd test` reached Vitest but failed at startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.

## 2026-05-25T21:14:00Z follow-up run (executed 2026-05-25 America/Chicago)

- No app route added. The prompted Bark River - Prince's Point to Burnt Village Park and Sugar River - Highway X to Attica Highway C Access routes were already implemented and marked added, so this pass avoided duplicate route records.
- Rechecked the remaining prompted hold, `wi-black-earth-creek-cross-plains-salmo-pond`, with an eleventh targeted clearance search.
- Result: deferred. Wisconsin River Trips still carries the July 2, 2025 report of two full blockages near Scherbel Road / Salmo Pond, including one impossible to get around; newer public results only confirm Salmo Pond access/fishing context and do not clear the paddling corridor.
- Gauge if later cleared: direct USGS Black Earth Creek at Cross Plains gauge.
- Threshold/range source if later cleared: Wisconsin River Trips Black Earth Creek - Cross Plains ladder, 21-30 cfs target with 51+ cfs maybe too high.
- Photo: no gallery asset added. Image audit still notes reusable broad Commons creek photos exist, but gallery work remains deferred while route operability is blocked.
- Validation: ledger JSON parsed successfully, `npm.cmd run typecheck` passed, and `git diff --check` passed. `npm test` via PowerShell was blocked by unsigned `npm.ps1`; `npm.cmd test` ran typecheck and then failed at Vitest startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.

## 2026-05-25T21:24:00Z follow-up run (executed 2026-05-25 America/Chicago)

- Added `chippewa-river-county-a-highway-8` after confirming the prompted Bark River and Sugar River Highway X routes were already implemented and Black Earth Creek remained blocked.
- Updated route data, trip details, candidate ledger, and image audit.
- Gauge: USGS `05356500` Chippewa River Near Bruce, WI, direct same-river gauge in the route corridor near the take-out.
- Threshold/range source: Wisconsin Trail Guide Chippewa River C3, with a route-specific 400 cfs / 1.5 ft minimum at the Bruce gauge plus qualitative high-water cautions; implemented as minimum-only because no full upper ladder was found.
- Coordinates: Imalone / County A Bridge access `45.552358, -91.228388`; Highway 8 Canoe Landing `45.452909, -91.256361`, from Rusk County Tourism's Imalone-to-Bruce access coordinate listing.
- Photo: no route-gallery asset added. Fresh search found broad Chippewa River Commons/local imagery but no clearly representative exact-route reusable photo.
- Validation: ledger JSON parsed successfully, `npm.cmd run typecheck` passed, `git diff --check` passed, and route-data smoke check passed. `npm.cmd test` ran typecheck and then failed at Vitest startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.

## 2026-05-25T21:35:58Z follow-up run (executed 2026-05-25 America/Chicago)

- Added `bois-brule-river-bois-brule-pine-tree` after confirming the prompted Bark River and Sugar River Highway X candidates were already implemented.
- Updated route data, trip details, candidate ledger, and image audit.
- Gauge: USGS `04025500` Bois Brule River at Brule, WI, same-river live gauge used by adjacent Bois Brule routes; Wisconsin Trail Guide BB2 says the gauge in the previous BB1 segment should indicate conditions in BB2.
- Threshold/range source: Wisconsin Trail Guide Bois Brule BB2, with route-specific bands of below 125 cfs not recommended, 125-200 low runnable, 200-350 medium runnable, 350-600 high runnable, 600-1000 novice paddlers should avoid, and 1000+ experienced-only.
- Coordinates: Bois Brule Landing / Bois Brule Campground canoe landing `46.54042, -91.59408`; Pine Tree Landing `46.61545, -91.58264`, from the Wisconsin Trail Guide BB2 PDF GPS table.
- Photo: no route-gallery asset added. Fresh search found broad Bois Brule Commons/USGS leads and route/blog imagery, but no clearly reusable representative BB2 route photo.
- Validation: ledger JSON parsed successfully, `npm.cmd run typecheck` passed, `git diff --check` passed, and route-data smoke check passed. Initial `npm test` was blocked by unsigned PowerShell `npm.ps1`; `npm.cmd test` ran typecheck and then failed at Vitest startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.

## 2026-05-25T22:13:00Z follow-up run (executed 2026-05-25 America/Chicago)

- No app route added. The prompted Bark River - Prince's Point to Burnt Village Park and Sugar River - Highway X to Attica Highway C Access routes are already implemented and marked added, so this pass avoided duplicate route records.
- Rechecked `wi-black-earth-creek-cross-plains-salmo-pond` with a fourteenth targeted clearance search.
- Result: deferred. Wisconsin River Trips still carries the July 2, 2025 report of two full blockages near Scherbel Road / Salmo Pond, including one impossible to get around; newer public results confirm only Salmo Pond access/fishing and nearby conservation context, not route clearance.
- Gauge if later cleared: direct USGS Black Earth Creek at Cross Plains gauge.
- Threshold/range source if later cleared: Wisconsin River Trips Black Earth Creek - Cross Plains ladder, 21-30 cfs target with 51+ cfs maybe too high.
- Coordinates: not promoted; endpoint coordinate cleanup remains secondary until route passage is cleared.
- Photo: no gallery asset added. Image audit notes reusable broad Commons creek photos exist, but gallery work remains deferred while route operability is blocked.
- Validation: ledger JSON parsed successfully and `git diff --check` found no whitespace errors. `npm.cmd test` ran typecheck successfully, then failed at Vitest startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.

## 2026-05-25T22:23:27Z follow-up run (executed 2026-05-25 America/Chicago)

- No app route added. The prompted Bark River - Prince's Point to Burnt Village Park and Sugar River - Highway X to Attica Highway C Access routes are already implemented and marked added, so this pass avoided duplicate route records.
- Rechecked `wi-black-earth-creek-cross-plains-salmo-pond` with a fifteenth targeted clearance search.
- Result: deferred. Wisconsin River Trips still carries the July 2, 2025 report of two full blockages near Scherbel Road / Salmo Pond, including one impossible to get around; newer public results confirm Salmo Pond canoe/kayak access and fishing/conservation context, but not route clearance.
- Gauge if later cleared: direct USGS Black Earth Creek at Cross Plains gauge.
- Threshold/range source if later cleared: Wisconsin River Trips Black Earth Creek - Cross Plains ladder, 21-30 cfs target with 51+ cfs maybe too high.
- Coordinates: not promoted; endpoint coordinate cleanup remains secondary until route passage is cleared.
- Photo: no gallery asset added. Image audit notes reusable broad Commons creek photos exist, but gallery work remains deferred while route operability is blocked.
- Validation: ledger JSON parsed successfully, `git diff --check` found no whitespace errors, and `npm.cmd test` ran typecheck successfully before failing at Vitest startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.

## 2026-05-26T00:18:00Z follow-up run (executed 2026-05-25 America/Chicago)

- Added `jump-river-wayside-park-sheldon` after confirming the prompted Bark River and Sugar River Highway X routes were already implemented and Black Earth Creek remained blocked.
- Updated route data, trip details, candidate ledger, and image audit.
- Gauge: USGS `05362000` Jump River at Sheldon, WI, direct same-river gauge in the take-out corridor.
- Threshold/range source: Wisconsin River Trips exact Wayside Park-to-Sheldon route context plus adjacent lower-Jump Sheldon-gauge ladder; implemented conservative `200-400 cfs` target, `100 cfs` low floor, and `1000+ cfs` broad recreational no-go.
- Coordinates: Wayside Park / Highway 73 Jump River Access `45.354054, -90.788597`; Haley Park / Sheldon Access `45.307764, -90.955985`, from Rusk County Tourism's official Highway 73-to-Sheldon route page.
- Photo: no route-gallery asset added. Fresh search found route/blog photos and broad map/context sources but no clearly reusable exact-route photo.
- Validation: ledger JSON parsed successfully, route smoke check passed, `npm.cmd run typecheck` passed, and `git diff --check` found no whitespace errors beyond line-ending warnings. `npm.cmd test` ran typecheck successfully, then failed at Vitest startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.

## 2026-05-25T23:55:44Z follow-up run (executed 2026-05-25 America/Chicago)

- Added `red-cedar-river-tom-prince-russian-slough` after confirming the prompted Bark River and Sugar River Highway X routes were already implemented, Black Earth Creek remained blocked, and the remaining Wisconsin audit gaps were duplicate or blocked.
- Updated route data, trip details, candidate ledger, and image audit.
- Gauge: USGS `05367500` Red Cedar River near Colfax, WI, direct same-river gauge in the route corridor.
- Threshold/range source: Wisconsin River Trips Red Cedar River - Colfax, with route-specific Colfax-gauge bands: `<400 cfs` still navigable, `401-600 cfs` good, `601-800 cfs` pushy, `801-1200 cfs` expert-only because of strainers, and `1201+ cfs` maybe too high.
- Coordinates: Tom Prince Memorial Park Landing `45.0026972, -91.729812`; Russian Slough County Park `44.9933827, -91.8095487`, from the Wisconsin River Trips shuttle map with Paddling.com corroboration for Tom Prince.
- Photo: no route-gallery asset added. Fresh Commons/federal/local search found WRT route images and DNR/local context, but no clearly reusable representative exact-route photo.
- Validation: ledger JSON parsed successfully, `npm.cmd run typecheck` passed, and `git diff --check` found no whitespace errors beyond line-ending warnings. Initial `npm test` was blocked by unsigned PowerShell `npm.ps1`; `npm.cmd test` ran typecheck successfully, then failed at Vitest startup because esbuild could not read `../../..` / resolve `vitest.config.ts` under sandbox permissions.
