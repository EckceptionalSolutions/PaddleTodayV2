# Midwest Route Automation Memory

Use this file to avoid retrying the same blocked routes unless new evidence directly fixes the prior blocker.

## Recent No-Add Passes

- 2026-05-29: Michigan no-add pass at 2:29 PM America/Chicago (2026-05-29T19:29Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memories. Existing Michigan coverage checked first: Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton Downtown-Utica-to-North-Clinton and North-Clinton-to-Rotary; Michigan-border Menominee/Piers Gorge; and Brule / Bois Brule border-river records. No duplicate route was added.
  - Logged `Flint River - Flint River National Water Trail / Mott Lake to Holloway Reservoir or Lapeer County family` as `threshold_weak`: FRWC supports a real 72-mile state/national water trail and access network, but its current Lockhart spill advisory says to avoid contact downstream of Stepping Stone Falls through downtown Flint, and no route-specific numeric gauge model tied to a clean public day-trip pair surfaced.
  - Logged `Huron River - Delhi Metropark to Argo / Barton Dam corridor` as `blocked_until_date`: HRWC lists Delhi-to-Argo as a recommended trip but says Barton Dam/Barton Pond access and portage are closed until 2027; AW Delhi Mills evidence also uses a dam-regulated downstream Ann Arbor gauge that requires visual confirmation.
  - Logged `Maple River - Northern Lower Michigan / Maple Road access family` as `research_later`: Tip of the Mitt and Outdoor Michigan support a real Maple River paddling/access lead, but exact endpoints, route distance, product-ready gauge, and numeric thresholds were not found.
  - Rechecked `Cass River - Vassar Canoe and Kayak Launch to Tuscola Township Park`: route/access and the 100 cfs Cass River Water Trail rule remain promising, but USGS Frankenmuth now exposes no continuous/daily/field data and Wahjamega visible current evidence remains stale, so the ledger remains `no_live_gauge`.
  - Only docs/ledger/memory changed, so npm validation was not run. Current run time recorded at 2026-05-29 14:29 America/Chicago.

- 2026-05-29: Michigan no-add pass at 2:19 PM America/Chicago (2026-05-29T19:19Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Existing Michigan coverage checked first: Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton Downtown-Utica-to-North-Clinton and North-Clinton-to-Rotary; Michigan-border Menominee/Piers Gorge; and Brule / Bois Brule border-river records. No duplicate route was added.
  - Logged `River Raisin - Monroe / downtown River Raisin to Sterling DNR Launch family` as `threshold_weak`: Terrain360 and River Raisin Water Trails support a real lower River Raisin route and USGS `04176500` gauge context, but no route-specific numeric paddling thresholds tied to that gauge surfaced.
  - Logged `Pine River - Gratiot County Pine River Canoe Trail family` as `threshold_weak`: Michigan Water Trails and the trail brochure support the 30-mile Lumberjack-Park-to-Alma water trail and access context, but guidance is qualitative only and no defensible gauge calibration was found.
  - Logged `East Branch Escanaba River - Sands Plains Run / Section 20 Bridge to West Iron Street` as `no_live_gauge`: AW route context is promising for a skilled spring-runoff route, but the Humboldt/Escanaba gauge relationship and fresh product-ready USGS current data were not verified.
  - Only docs/ledger/memory changed, so npm validation was not run. Current run time recorded at 2026-05-29 14:19 America/Chicago.

- 2026-05-29: Michigan no-add pass at 2:09 PM America/Chicago (2026-05-29T19:09Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Existing Michigan coverage checked first: Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton Downtown-Utica-to-North-Clinton and North-Clinton-to-Rotary; Michigan-border Menominee/Piers Gorge; and Brule / Bois Brule border-river records. No duplicate route was added.
  - Logged `Red Cedar River - Williamston to Lansing / Red Cedar River Water Trail day-trip family` as `threshold_weak`: Meridian Township and the May 2026 state-water-trail brochure give strong access/segment support and USGS `04112500` is direct, but no numeric paddling thresholds tied to that gauge surfaced.
  - Logged `Middle Branch Ontonagon River - Burned Dam Campground to Bond Falls Flowage` as `no_live_gauge`: AW route/gauge support is promising, but visible official USGS `04033000` current data ended at 2026-05-15 during this May 29 run.
  - Logged `Middle Branch Escanaba River - County Road CG to 1.2 miles above CR565` as `research_later`: AW has whitewater route detail, but posted private-property conflict, Class II-IV+ consequence, endpoint uncertainty, and product gauge mapping/freshness keep it out of conservative implementation.
  - Only docs/ledger/memory changed, so npm validation was not run. Current run time recorded at 2026-05-29 14:09 America/Chicago.

- 2026-05-29: Michigan no-add pass at 1:59 PM America/Chicago (2026-05-29T18:59Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Existing Michigan coverage checked first: Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton Downtown-Utica-to-North-Clinton and North-Clinton-to-Rotary; Michigan-border Menominee/Piers Gorge; and Brule / Bois Brule border-river records. No duplicate route was added.
  - Rechecked `Cass River - Vassar Canoe and Kayak Launch to Tuscola Township Park`: route/access/threshold evidence remains promising, including Cass River Water Trail trip support, Outdoor Michigan endpoint coordinates, and the 100 cfs tough-paddle rule, but official/product-fetchable USGS current data still could not be verified from the automation environment. Ledger remains `no_live_gauge`.
  - Logged fresh southwest/southern Michigan leads: `Black River - Bangor to South Haven Heritage Water Trail family`, `Coldwater River / St. Joseph River - Greater Union City Water Trail and Union City Heritage Water Trail family`, and `Galien River - Galien River Marsh Water Trail / New Buffalo marsh route family`. All were marked `threshold_weak` because access/water-trail context and gauge leads exist, but no route-specific numeric paddling thresholds tied to a selected product-supported gauge surfaced.
  - Only docs/ledger/memory changed, so npm validation was not run. Current run time recorded at 2026-05-29 13:59 America/Chicago.

- 2026-05-29: Michigan no-add pass at 1:49 PM America/Chicago (2026-05-29T18:49Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Existing Michigan coverage checked first: Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton Downtown-Utica-to-North-Clinton and North-Clinton-to-Rotary; Michigan-border Menominee/Piers Gorge; and Brule / Bois Brule border-river records. No duplicate route was added.
  - Fresh recheck kept `Rogue River - Rockford / Richardson-Sowerby Park to Grand Rogue Park or Rogue River Road` as `blocked_until_date`. AW/USGS threshold evidence remains promising, but Plainfield Township's May 14, 2026 notice still says both Grand Rogue kayak/canoe launches are temporarily unavailable after flood cleanup and repair work.
  - Fresh recheck kept `West Branch Ontonagon River - Lake Gogebic to Norwich Bluff` as `no_live_gauge`. MI-TRALE route/threshold evidence remains strong at 200-600 cfs, but official USGS `04036000` current-condition evidence still shows the latest instantaneous values from March 28, 2026 rather than same-day May 29.
  - Logged `Paw Paw River - Paw Paw River Water Trail public-access day-trip family` as `threshold_weak`. Michigan Water Trails / SWMPC support the corridor and USGS `04102500` is a plausible lower-river gauge, but no route-specific numeric paddling floor, range, or high-water cutoff tied to a selected day-trip pair surfaced. Only docs/ledger/memory changed, so npm validation was not run.

- 2026-05-29: Michigan no-add pass at 1:39 PM America/Chicago (2026-05-29T18:39Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Existing Michigan coverage checked first: Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton Downtown-Utica-to-North-Clinton and North-Clinton-to-Rotary; Michigan-border Menominee/Piers Gorge; and already-live Brule / Bois Brule border-river records. No duplicate route was added.
  - Fresh review logged `Boardman River - Lower Boardman / Boardman Lake to downtown Traverse City family` as `blocked_until_date`. Grand Traverse Conservation District supports lower Boardman paddling context, but the City of Traverse City FishPass project currently closes the American Legion Park portage, restricts the Cass-to-Union construction zone, and runs through the Spring 2024-2027 project window. The route also lacks route-specific numeric paddling thresholds tied to a selected USGS gauge.
  - Rechecked the already-logged Rifle River, Boardman Beitner, Au Sable, Pere Marquette, and Upper Manistee leads at a high level; their blockers remain unchanged: either threshold support is weak, gauge access is not product-ready, or current access/construction conditions prevent a conservative add. No app code changed, so npm validation was not run.

- 2026-05-29: Michigan implementation pass at 1:30 PM America/Chicago (2026-05-29T18:30Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton North-Clinton-to-Rotary; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Added `Clinton River - Downtown Utica to North Clinton River Park` as `clinton-river-downtown-utica-north-clinton`. This is the short upstream Utica-to-Sterling-Heights link, separate from the existing North-Clinton-to-Rotary segment.
  - Threshold model: guarded `two-sided` stage model on USGS `04161820` with `idealMin: 8.0 ft`, `idealMax: 10.0 ft`, `tooLow: 8.0 ft`, and `tooHigh: 10.0 ft`, sourced from CRWC's Sterling Heights low/high water-level warnings. Caveats: this is a warning window, not a true ideal band; urban high water, wood, strainers, stormwater/sewage-overflow water-quality risk, and same-day visual checks remain important. Do not extend this route upstream toward Rochester/Yates without separate dam/access verification. No gallery asset was added.
  - Validation at 1:30 PM America/Chicago: ledger JSON parse passed, `npm.cmd run typecheck` passed with route audit for 173 routes, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed at Vitest startup with the existing esbuild sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan no-add pass at 1:18 PM America/Chicago (2026-05-29T18:18Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; Clinton North-Clinton-to-Rotary; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Reviewed fresh gauge-first leads: `Kalamazoo River - Kalamazoo River Heritage Water Trail public-access day-trip family`, `Rouge River - Lower Rouge River Water Trail / Industrial Route family`, and `Pigeon River - northern Lower Michigan / Pigeon River Country day-trip family`.
  - No route was added. Kalamazoo has KRWC/SWMI Paddling/National Rivers Project water-trail context and multiple USGS gauge candidates, but no exact public day-trip pair with numeric paddling thresholds. Rouge has Michigan Water Trails/Friends of the Rouge/ArcGIS/Terrain360 route context, but no scoring-ready live-gauge threshold model and needs urban water-quality caution. Pigeon has Natural River/Pigeon River Country canoe context, but the visible route-relevant AW/NOAA gauge lead was stale and unsupported by V2, while USGS 04159000 appears to be a different Michigan Pigeon River.
  - Only docs/ledger/memory changed, so npm validation was not run.

- 2026-05-29: Michigan implementation pass at 1:10 PM America/Chicago (2026-05-29T18:10Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Added `Clinton River - North Clinton River Park to Rotary Park` as `clinton-river-north-clinton-rotary`. This is separate from the blocked Eagle's Landing-to-Yates Clinton lead because it uses the Sterling Heights corridor downstream of the Yates low-head-dam zone and has city-supported accessible launches at both ends.
  - Threshold model: guarded `two-sided` stage model on USGS `04161820` with `idealMin: 8.0 ft`, `idealMax: 10.0 ft`, `tooLow: 8.0 ft`, and `tooHigh: 10.0 ft`, sourced from CRWC's Sterling Heights low/high water-level warnings. Caveats: this is a warning window, not a true ideal band; urban high water, wood, strainers, stormwater/sewage-overflow water-quality risk, and same-day visual checks remain important. No gallery asset was added.
  - Validation at 1:11 PM America/Chicago: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed at Vitest startup with the existing esbuild sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan no-add pass at 12:49 PM America/Chicago (2026-05-29T17:49Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Reviewed fresh gauge-first leads: `Jordan River - Graves Crossing / Old State Road to Rogers Bridge`, `Muskegon River - Croton Dam / Pine Avenue to Newaygo`, and `Platte River - Lower Platte / Riverside Canoes to Lake Michigan mouth`.
  - No route was added. Jordan has practical outfitter route support and direct USGS `04127800`, but no numeric paddling thresholds tied to that gauge. Muskegon has direct USGS `04121970` / `04122001` and popular route support, but no route-specific threshold model and recent May 2026 high-water / unstable-bank context requires stronger high-water guidance. Platte has NPS/outfitter route support and USGS `04126740`, but no numeric gauge guidance.
  - Only docs/ledger/memory changed, so npm validation was not run.

- 2026-05-29: Michigan no-add pass at 12:48 PM America/Chicago (2026-05-29T17:48Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine River Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron River Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Rechecked `Clinton River - Eagle's Landing / W. Avon Road to E. Avon Road / Yates Dam`: the 2024 Clinton River Water Trail map now resolves CRWC Office / Eagles Landing, Rochester Landing, and Yates Cider Mill coordinates, and AW/USGS threshold support remains promising. The route was not added because the Yates end still needs official safe take-out/portage verification around the historically lethal low-head-dam / bypass-channel zone and active restoration / operations context. Ledger remains `research_later`.
  - Logged `Manistique River - Ten Curves Canoe to Northland Outfitters / lower Manistique route family` as `no_live_gauge`: one MoHERP-visible 6.0-mile trip and rating bands exist, but official USGS `04056500` currently exposes no continuous/daily/field data types and visible current evidence was stale relative to this May 29 run.
  - No app code, trip-detail, or image-audit changes were made, so npm validation was not run.

- 2026-05-29: Michigan no-add pass at 12:29 PM America/Chicago (2026-05-29T17:29Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine River Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron River Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Reviewed `Mill Creek - Village of Dexter park-and-play / Main Street weirs`: AW documents a direct Mill Creek near Dexter gauge and a Class II play feature, but the route is effectively a 150-yard / zero-mile park-and-play spot, not a practical PaddleToday day trip. Ledger status: `rejected`.
  - Logged fresh gauge-first leads: `Flat River - Greenville to Lowell / Belding gauge family` as `threshold_weak` because water-trail interest, local paddling context, and USGS `041162695` exist but no exact endpoint pair or numeric route threshold was found; and `Thornapple River - Charlton Park to Tyden Park / Hastings gauge family` as `threshold_weak` because USGS `04117500` and route interest exist but no credible numeric paddling threshold tied to the gauge surfaced.
  - No app code, trip-detail, or image-audit changes were made, so npm validation was not run.

- 2026-05-29: Michigan no-add pass at 12:17 PM America/Chicago (2026-05-29T17:17Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine River Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron River Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Refreshed `Clinton River - Eagle's Landing / W. Avon Road to E. Avon Road / Yates Dam`: AW still gives the strongest package found this run, with exact 4.7-mile Class I(II) reach support, direct USGS `04161000` Auburn Hills gauge context, a current low-runnable reading near 73 cfs, and community notes around 1.3 ft / about 70 cfs minimum and 3.0 ft / about 500 cfs flood-stage caution. The route was not added because source-clean endpoint coordinates, current official access authority, active Yates-area restoration/operations status, and exact safe take-out/low-head-dam route boundary remain unresolved.
  - Logged fresh gauge-first leads: `Betsie River - Thompsonville / lower Betsie public-access day-trip family` as `threshold_weak` because no numeric paddling threshold tied to the Thompsonville-area USGS lead was found; and `Paint Creek - Ironwood Court to Clinton River confluence` as `research_later` because the AW listing was visible but product-ready gauge, access, and coordinate support were not captured.
  - No app code, trip-detail, or image-audit changes were made, so npm validation was not run.

- 2026-05-29: Michigan no-add pass at 12:09 PM America/Chicago (2026-05-29T17:09Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine River Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron River Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Rechecked `Cass River - Vassar Canoe and Kayak Launch to Tuscola Township Park`: route/access evidence remains strong and this run resolved coordinates from Outdoor Michigan for South Water Street Boat Launch and Tuscola Twp Park Boat Launch. The route was not added because fresh product-ready USGS data still was not verified; Wahjamega search-visible instantaneous data was stale and Frankenmuth's WDFN page showed maintenance/no current values in fetched text. Ledger status changed from `needs_manual_coordinates` to `no_live_gauge`.
  - Reviewed fresh Michigan gauge-first leads: `Dowagiac River - Dowagiac River Water Trail public-access day-trip family` was logged as `threshold_weak`; `Michigamme River - Republic Dam to Poplar Street landing` as `no_live_gauge`; and `Pine River (Eastern Upper Peninsula) - W. Prairie Road to S. River Road` as `research_later`.
  - No app code, trip-detail, or image-audit changes were made, so npm validation was not run.

- 2026-05-29: Michigan no-add pass at 12:03 PM America/Chicago (2026-05-29T17:03Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine River Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron River Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Rechecked `Cass River - Vassar Canoe and Kayak Launch to Tuscola Township Park` but did not add it: route/access evidence remains promising, but endpoint coordinates, final gauge selection, and fresh product-ready USGS support were not strong enough in this run. Ledger remains `needs_manual_coordinates`.
  - Reviewed fresh Michigan gauge clusters: `Sturgeon River - Wolverine / Rondo / Trowbridge` was logged as `no_live_gauge`; `Chippewa River - Mount Pleasant / Island Park / Nelson Park` as `research_later`; `Iron River - Mattioli / Brady / Apple Blossom` as `threshold_weak`; and `Michigamme River - Lake Michigamme to Moose River Campground / Moose Rapids` as `research_later`.
  - No app code, trip-detail, or image-audit changes were made, so npm validation was not run.

- 2026-05-29: Michigan no-add pass at 11:49 AM America/Chicago (2026-05-29T16:49Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine River Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; Huron River Argo-to-Gallup; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Reviewed `Cass River - Vassar Canoe and Kayak Launch to Tuscola Township Park`: Cass River Water Trail / Michigan Water Trails source support is strong for route shape, public endpoints, access descriptions, difficulty, mileage, amenities, and a conservative USGS-based low-water rule of thumb. The route was not added because source-backed endpoint coordinates were not captured; ledger status is `needs_manual_coordinates`.
  - Reviewed `West Branch Ontonagon River - Lake Gogebic to Norwich Bluff`: MI-TRALE gives route-specific coordinates and 200-600 cfs guidance for the Lake Gogebic / West Branch Ontonagon gauge family, but USGS `04036000` live discharge could not be verified as fresh/product-fetchable; ledger status is `no_live_gauge`.
  - Reviewed `Looking Glass River - DeWitt launch family`: public launch and direct USGS `04114498` gauge context exist, but no numeric route-specific paddling floor/range was found; ledger status is `threshold_weak`.
  - No app code, trip-detail, or image-audit changes were made, so npm validation was not run.

- 2026-05-29: Michigan implementation pass at 11:39 AM America/Chicago (2026-05-29T16:39Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. Pine River Edgetts-to-Lincoln, Lincoln-to-Peterson, Peterson-to-Low-Bridge; the Shiawassee Byron-to-Chesaning chain; and Michigan-border Menominee/Piers Gorge were already live and were not duplicated.
  - Added `Huron River - Argo Park Canoe Livery to Gallup Park Livery` as `huron-river-argo-gallup`. This is distinct from the blocked Dexter-Huron / Delhi lead because it starts below Argo Dam in the Ann Arbor corridor, uses the Ann Arbor USGS gauge, and is specifically supported by the Huron River Water Trail / City of Ann Arbor Argo-to-Gallup livery trip context.
  - Threshold model: guarded `two-sided` model on USGS `04174500` with `idealMin: 400 cfs`, `idealMax: 1700 cfs`, `tooLow: 80 cfs`, and `tooHigh: 1700 cfs`, sourced from American Whitewater's Ann Arbor gauge bands. Marked `routeType: 'whitewater'` because the route includes the Argo Cascades manmade drops, AW is the threshold source, and the route needs skill/crowding/dam-operation cautions. No gallery asset was added.
  - Validation at 11:41 AM America/Chicago: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed at Vitest startup with the existing esbuild sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 11:29 AM America/Chicago (2026-05-29T16:29Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Pine River - Lincoln Bridge to Peterson Bridge`, the implemented Shiawassee Byron-to-Chesaning chain, and Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` were checked before adding.
  - Added `Pine River - Edgetts to Lincoln Bridge` as `pine-river-edgetts-lincoln`. This is upstream of the existing Lincoln-to-Peterson and Peterson-to-Low-Bridge routes and was not treated as duplicate coverage. American Whitewater documents the exact Edgetts-to-Lincoln reach, Class I-II character, Hoxeyville gauge relationship, and no-permit note; the Cadillac Area Visitors Bureau / Forest Service Pine map provides launch names and coordinates; Outdoor Michigan confirms Lincoln Bridge as a Michigan DNR carry-in launch; Rivers.gov documents that the federally designated Scenic River corridor begins at Lincoln.
  - Threshold model: conservative `minimum-only` with `tooLow: 170 cfs` on USGS `04125460`; no ideal range or high cutoff was claimed. The route is marked `routeType: 'whitewater'` because AW is the primary threshold source and the reach has fast shallow turns, low Class II spots, sweepers/logjams, cold water, and limited legal stops. Caveat: Edgetts is map/AW-supported but lacks the cleaner standalone Outdoor Michigan access page found for Lincoln, Meadow Brook, and Skookum, so same-day signage controls. No gallery asset was added.
  - Validation at 11:31 AM America/Chicago: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed at Vitest startup with the existing esbuild sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 11:20 AM America/Chicago (2026-05-29T16:20Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Byron High School Ball Fields to Walnut Hills Family Campground`, `Shiawassee River - Walnut Hills Family Campground to Geeck Road County Park`, `Shiawassee River - Geeck Road County Park to Shiatown County Park`, `Shiawassee River - Shiatown County Park to Lytle Road County Park`, `Shiawassee River - Lytle Road County Park to Brady Street Landing`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` were already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Pine River - Lincoln Bridge to Peterson Bridge` as `pine-river-lincoln-peterson`. This route is adjacent to the existing Peterson-to-Low-Bridge route but covers the upstream Scenic River day and was not treated as a duplicate. Outdoor Michigan provides the public access records and endpoint coordinates for Lincoln Bridge and Peterson Bridge, the Pine Scenic River map gives the 15.8-mile official segmentation through Elm Flats and Dobson Bridge, Rivers.gov confirms the Scenic River / Forest Service management context, and American Whitewater ties Pine River level guidance to USGS `04125460`.
  - Threshold model: conservative `minimum-only` with `tooLow: 170 cfs`; no ideal range or high cutoff was claimed. The route is marked `routeType: 'whitewater'` because AW is the primary threshold source and the route is a long, fast, wooded Class I-II day with shallow riffles, sweepers/logjams, cold water, permit/access-fee constraints, designated-camping limits, and summer traffic. No gallery asset was added; the image audit records local/federal/AW leads.

- 2026-05-29: Michigan no-add pass at 11:08 AM America/Chicago (2026-05-29T16:08Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, repo automation memory, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Byron High School Ball Fields to Walnut Hills Family Campground`, `Shiawassee River - Walnut Hills Family Campground to Geeck Road County Park`, `Shiawassee River - Geeck Road County Park to Shiatown County Park`, `Shiawassee River - Shiatown County Park to Lytle Road County Park`, `Shiawassee River - Lytle Road County Park to Brady Street Landing`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - No route was added. Refreshed `Huron River - Dexter-Huron / Delhi Metropark day-trip family`: HRWC/Huron River Water Trail and the trip PDF support access and route shape, and American Whitewater gives Delhi Mills/Ann Arbor gauge bands, but AW also warns that USGS `04174500` is downstream of Barton and Argo dams and may not reflect the paddled stretch. HRWC's 2026 Barton Dam / Barton Pond access closure through 2027 adds route-boundary sensitivity downstream. Ledger remains `gauge_proxy_weak`.
  - Reviewed `Bear River - Petoskey / Sheridan Street to Lake Street whitewater park`: AW and Petoskey sources support a real public whitewater route, but the live gauge is the nearby Jordan River near East Jordan proxy, not a direct Bear River gauge. Ledger records it as `gauge_proxy_weak`.
  - Reviewed `Grand River - Lower Grand River Water Trail public-access day-trip family`: LGROW/Michigan Water Trails/GVMC sources support official water-trail access and USGS current-condition context, but no selected public day trip has route-specific numeric paddling thresholds. Ledger records it as `threshold_weak`. No app code, trip detail, or image-audit changes were made, so no npm validation was required.

- 2026-05-29: Michigan no-add pass at 10:58 AM America/Chicago (2026-05-29T15:58Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Byron High School Ball Fields to Walnut Hills Family Campground`, `Shiawassee River - Walnut Hills Family Campground to Geeck Road County Park`, `Shiawassee River - Geeck Road County Park to Shiatown County Park`, `Shiawassee River - Shiatown County Park to Lytle Road County Park`, `Shiawassee River - Lytle Road County Park to Brady Street Landing`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Reviewed `Shiawassee River - Hogan Road to McCaslin Lake Road` and adjacent upper-Shiawassee sections, including Linden-to-Hogan and Holly-to-Corunna context. The section 5 route PDF is strong for route shape and access: 5.29 miles, endpoint coordinates, intermediate-to-beginner rating, roadside/dirt-lot access, rural residential to woodland wetland character, low-visibility obstruction cautions, low bridge caution, and heavy-rain/flooding warnings.
  - No route was added. Blocker: no product-ready live gauge/threshold pairing. The Shiawassee River Water Trail flow page tells Holly-to-Corunna paddlers to check recent Keepers of the Shiawassee River conditions, while its Owosso USGS gauge guidance is explicitly for Owosso-to-Chesaning. The broader Friends/Shiawassee County brochure supports the Owosso gauge as fairly reflective from Byron to Chesaning, but that starts downstream of Hogan/McCaslin, so extending the 2.0 ft low-water floor upstream would overclaim calibration.
  - Ledger now records Hogan-to-McCaslin as `no_live_gauge`. No app code, trip detail, or image-audit changes were made, so no npm validation was required.

- 2026-05-29: Michigan implementation pass at 10:49 AM America/Chicago (2026-05-29T15:49Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Walnut Hills Family Campground to Geeck Road County Park`, `Shiawassee River - Geeck Road County Park to Shiatown County Park`, `Shiawassee River - Shiatown County Park to Lytle Road County Park`, `Shiawassee River - Lytle Road County Park to Brady Street Landing`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Byron High School Ball Fields to Walnut Hills Family Campground` as `shiawassee-river-byron-walnut-hills`. The route uses USGS `04144500` Shiawassee River at Owosso as a proxy with published Byron-to-Chesaning corridor support from the Friends/Shiawassee County guide.
  - Threshold model: conservative `minimum-only` with `tooLow: 2.0 ft`. The app does not claim the downstream Owosso-to-Chesaning 2.5-to-7.0 ft enjoyable band as an ideal range for this upstream segment. The section 6 coalition route PDF provides exact endpoints, coordinates, 4.87-mile distance, beginner rating, concrete Byron launch, Walnut Hills private seasonal take-out, rural residential character, debris cautions, sand/silt bottom, average-depth note after the New Lothrop bridge, and private-property guidance.
  - Walnut Hills is private seasonal access with a small parking fee, so route copy requires a same-day access check and does not assume off-season use. No gallery asset was added; the image audit records local/water-trail/federal leads.

- 2026-05-29: Michigan implementation pass at 10:37 AM America/Chicago (2026-05-29T15:37Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Geeck Road County Park to Shiatown County Park`, `Shiawassee River - Shiatown County Park to Lytle Road County Park`, `Shiawassee River - Lytle Road County Park to Brady Street Landing`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Walnut Hills Family Campground to Geeck Road County Park` as `shiawassee-river-walnut-hills-geeck-road`. The route uses USGS `04144500` Shiawassee River at Owosso as a proxy with published Byron-to-Chesaning corridor support from the Friends/Shiawassee County guide.
  - Threshold model: conservative `minimum-only` with `tooLow: 2.0 ft`. The app does not claim the downstream Owosso-to-Chesaning 2.5-to-7.0 ft enjoyable band as an ideal range for this upstream route. The section 7 coalition route PDF provides exact endpoints, coordinates, 6.98-mile distance, beginner rating, rural residential character, sandy/stony bottom, low-water shallows between Vernon Road and Grand River Road, debris and private-dock cautions, three-bridge context, and the Geeck Road county-park cement-ramp take-out.
  - Walnut Hills is private seasonal public access with a small vehicle fee, so the route copy requires a same-day access check and does not assume off-season launch use. No gallery asset was added; the image audit records local/water-trail/federal leads. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 10:28 AM America/Chicago (2026-05-29T15:28Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Shiatown County Park to Lytle Road County Park`, `Shiawassee River - Lytle Road County Park to Brady Street Landing`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Geeck Road County Park to Shiatown County Park` as `shiawassee-river-geeck-road-shiatown`. The route uses USGS `04144500` Shiawassee River at Owosso as a proxy with published Byron-to-Chesaning corridor support from the Friends/Shiawassee County guide.
  - Threshold model: conservative `minimum-only` with `tooLow: 2.0 ft`. The app does not claim the downstream Owosso-to-Chesaning 2.5-to-7.0 ft enjoyable band as an ideal range for this upstream segment. The section 8 coalition route PDF provides exact endpoints, coordinates, 6.21-mile distance, beginner rating, park amenities, rural-residential-to-woodland-wetland route character, low-water submerged-rock/riffle cautions, three-bridge context, and the river-right Shiatown take-out above the dam.
  - Marked `routeType: 'whitewater'` to keep casual Explore discovery protected around the dam-adjacent take-out. No gallery asset was added; the image audit records local/water-trail/federal leads. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 10:19 AM America/Chicago (2026-05-29T15:19Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Lytle Road County Park to Brady Street Landing`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Shiatown County Park to Lytle Road County Park` as `shiawassee-river-shiatown-lytle`. The route uses USGS `04144500` Shiawassee River at Owosso as a proxy with published Byron-to-Chesaning corridor support from the Friends/Shiawassee County guide.
  - Threshold model: conservative `minimum-only` with `tooLow: 2.0 ft`. The app does not claim the downstream Owosso-to-Chesaning 2.5-to-7.0 ft enjoyable band as an ideal range for this upstream segment. The section 9 coalition route PDF provides exact endpoints, coordinates, 7.83-mile distance, intermediate rating, Shiatown dam-adjacent fast-water cautions, rocky shallow/debris notes, six-bridge context, and shuttle directions.
  - Marked `routeType: 'whitewater'` to keep casual Explore discovery protected around the partially removed dam and fast rapids. No gallery asset was added; the image audit records local/water-trail/federal leads. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 10:09 AM America/Chicago (2026-05-29T15:09Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Lytle Road County Park to Brady Street Landing` as `shiawassee-river-lytle-brady-street`. The route uses USGS `04144500` Shiawassee River at Owosso as a proxy with published Byron-to-Chesaning corridor support from the Friends/Shiawassee County guide.
  - Threshold model: conservative `minimum-only` with `tooLow: 2.0 ft`. The app does not claim the downstream Owosso-to-Chesaning 2.5-to-7.0 ft enjoyable band as an ideal range for this upstream segment. The section 10 coalition route PDF provides exact endpoints, coordinates, 3.2-mile distance, intermediate-to-beginner rating, parking/service notes, split-channel/downed-tree cautions, and causeway guidance: stay left during low water and portage over the causeway during high water.
  - No gallery asset was added; the image audit records local/water-trail/federal leads. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 9:57 AM America/Chicago (2026-05-29T14:57Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, `Shiawassee River - Henderson County Park to Ditch Road`, and `Shiawassee River - Ditch Road to Cole Park` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Corunna McCurdy Park to Harmon Patridge Park` as `shiawassee-river-mccurdy-harmon-patridge`. The route uses USGS `04144500` Shiawassee River at Owosso as a conservative stage gauge. The Shiawassee River Water Trail Coalition section 11 route PDF provides exact endpoints, coordinates, 6.49-mile distance, beginner-to-intermediate skill rating, amenities, the Oakwood Avenue shortening option, and three Owosso low-head-dam/weir cautions.
  - Threshold model: conservative two-sided stage model with `idealMin: 2.5 ft`, `idealMax: 7.0 ft`, `tooLow: 2.0 ft`, and `tooHigh: 7.0 ft`. The 2.5-to-7.0 ft band comes from the coalition river-flow page; the Friends/Shiawassee County brochure says USGS `04144500` is fairly reflective from Byron to Chesaning and that 2.0 ft or lower may be too shallow in some segments. The route is marked `routeType: 'whitewater'` to keep casual Explore discovery protected around the three low-head dams/spillways and portage decisions.
  - No gallery asset was added; the image audit records local/water-trail/federal leads. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 9:50 AM America/Chicago (2026-05-29T14:50Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge`, `Shiawassee River - Harmon Patridge Park to Henderson County Park`, and `Shiawassee River - Henderson County Park to Ditch Road` are already implemented; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Ditch Road to Cole Park` as `shiawassee-river-ditch-road-cole-park`. The route uses USGS `04144500` Shiawassee River at Owosso as a direct stage gauge, the Shiawassee River Water Trail Coalition's Owosso-to-Chesaning stage guidance, and the coalition's route PDF for exact endpoints, coordinates, 5.48-mile distance, beginner skill rating, amenities, rocky riffles, island-channel guidance, and a required river-right portage around the Cole Park rapids.
  - Threshold model: conservative two-sided stage model with `idealMin: 2.5 ft`, `idealMax: 7.0 ft`, `tooLow: 2.0 ft`, and `tooHigh: 7.0 ft`. The 2.5-to-7.0 ft band comes from the water-trail flow page; the 2.0 ft hard low comes from the route brochure warning that readings at 2 ft or lower may be too shallow in some segments. The route is marked `routeType: 'whitewater'` to keep casual Explore discovery protected around the required rapid portage and slippery rock walk. No gallery asset was added; the image audit records local/water-trail/federal leads.
  - The route PDF text extraction reverses endpoint labels in one place, so coordinates were reconciled against the already-live Ditch Road endpoint and the Cole Park / Chesaning map position. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 9:39 AM America/Chicago (2026-05-29T14:39Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge` is already implemented as `pine-river-peterson-low-bridge`; `Shiawassee River - Harmon Patridge Park to Henderson County Park` is already implemented as `shiawassee-river-harmon-patridge-henderson`; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`.
  - Added `Shiawassee River - Henderson County Park to Ditch Road` as `shiawassee-river-henderson-ditch-road`. The route uses USGS `04144500` Shiawassee River at Owosso as a direct stage gauge, the Shiawassee River Water Trail Coalition's Owosso-to-Chesaning stage guidance, and the coalition's route PDF for exact endpoints, coordinates, 9.2-mile distance, intermediate skill rating, amenities, riffle/rock/sandbar/island cautions, and the weir / partially demolished dam near Ditch Road with a river-right portage option.
  - Threshold model: conservative two-sided stage model with `idealMin: 2.5 ft`, `idealMax: 7.0 ft`, `tooLow: 2.0 ft`, and `tooHigh: 7.0 ft`. The 2.5-to-7.0 ft band comes from the water-trail flow page; the 2.0 ft hard low comes from the route brochure warning that readings at 2 ft or lower may be too shallow in some segments. The route is marked `routeType: 'whitewater'` to keep casual Explore discovery protected around the weir/dam-adjacent hazard. No gallery asset was added; the image audit now records local/water-trail/federal leads.
  - Direct USGS Water Services was not re-tested during research because the route uses an already-supported USGS provider path and the prior same-day Shiawassee pass established the gauge/source pairing. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan implementation pass at 9:31 AM America/Chicago (2026-05-29T14:31Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge` is already implemented as `pine-river-peterson-low-bridge`; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`, so neither was duplicated.
  - Added `Shiawassee River - Harmon Patridge Park to Henderson County Park` as `shiawassee-river-harmon-patridge-henderson`. The route uses USGS `04144500` Shiawassee River at Owosso as a direct stage gauge, the Shiawassee River Water Trail Coalition's local stage guidance for Owosso-to-Chesaning paddling conditions, and the coalition's route PDF for exact endpoints, coordinates, 7.78-mile distance, intermediate skill rating, amenities, and riffle/rock/sandbar/island/private-property cautions.
  - Threshold model: conservative two-sided stage model with `idealMin: 2.5 ft`, `idealMax: 7.0 ft`, `tooLow: 2.0 ft`, and `tooHigh: 7.0 ft`. The 2.5-to-7.0 ft band comes from the water-trail flow page; the 2.0 ft hard low comes from the route brochure warning that readings at 2 ft or lower may be too shallow in some segments. No gallery asset was added; the image audit now records local/water-trail/federal leads.
  - Direct USGS Water Services fetch from the automation shell still failed with `Unable to connect to the remote server`, but the product supports USGS gauges and search-visible current-flow context showed the Owosso gauge active during this run. Validation: ledger JSON parse passed, `npm.cmd run typecheck` passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit the existing sandbox access-denied / `vitest.config.ts` resolution error.

- 2026-05-29: Michigan no-add pass at 9:18 AM America/Chicago (2026-05-29T14:18Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge` is already implemented as `pine-river-peterson-low-bridge`; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`, so neither was duplicated.
  - Reviewed `Rogue River - Rockford / Richardson-Sowerby Park to Grand Rogue Park or Rogue River Road` and logged it as `blocked_until_date`. American Whitewater gives the strongest fresh package found today: exact lower-Rogue reach context, direct USGS `04118500`, and a community 180 cfs lower-Rogue floor. The route was not added because Plainfield Township currently says both Grand Rogue Park kayak/canoe launches are temporarily unavailable after flood/repair work, while the AW Rogue River Road bridge take-out is only roadside shoulder access rather than a clearly manager-confirmed public landing.
  - Reviewed `Boardman River - Beitner Road to Cass Road / old YMCA` and logged it as `no_live_gauge`. American Whitewater supports the lower Boardman route concept, but the AW Beitner gauge display was stale by more than a month, fetched USGS `04127200` text did not expose current values, and AW still describes post-dam-removal distances as approximate.
  - Reviewed `Rifle River Recreation Area / upper Rifle family` and logged it as `threshold_weak`: Michigan DNR supports public paddling and carry-in launches, and USGS `04142000` is the obvious lower-river gauge, but no strong route-specific numeric paddling threshold surfaced.
  - Reviewed `Au Sable River - Grayling / Stephan Bridge / Mio day-trip family` and logged it as `threshold_weak`: Huron-Manistee / Michigan DNR corridor support and USGS gauge options are strong, but the numeric evidence found today was historical discharge, fishing/wading context, or broad corridor guidance rather than a selected day-trip paddling threshold model.
  - Net result: 4 Michigan candidates/clusters reviewed, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-29: Michigan no-add pass at 9:08 AM America/Chicago (2026-05-29T14:08Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge` is already implemented as `pine-river-peterson-low-bridge`; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`, so neither was duplicated.
  - Reviewed `Clinton River - Eagle's Landing / W. Avon Road to E. Avon Road / Yates Dam` and logged it as `research_later`. American Whitewater gives a promising exact 4.7- to 5-mile Class I(II) reach, direct USGS `04161000` Auburn Hills gauge context, and useful community level notes around 1.3 ft / about 70 cfs minimum and about 3.0 ft / 500 cfs flood-stage caution.
  - The Clinton route was not added because access and safety operations are still unresolved for a conservative V2 route: Eagle's Landing public launch authority was not confirmed by a stable manager access page, Oakland County/Rochester Hills materials show the Yates Park / Clinton River Oaks area in active operations/restoration transition, and the route finishes at or near a historically lethal low-head-dam hazard that needs exact take-out/portage verification.
  - Net result: 1 Michigan candidate reviewed, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-29: Michigan no-add pass at 9:18 AM America/Chicago (2026-05-29T14:18Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. `Pine River - Peterson Bridge to Low Bridge` is already implemented as `pine-river-peterson-low-bridge`; Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` remains covered under Wisconsin as `menominee-river-piers-gorge`, so neither was duplicated.
  - Reviewed `Pere Marquette River - Bowman Bridge to Upper Branch Bridge` and logged it as `threshold_weak`. Rivers.gov / Recreation.gov strongly support the National Scenic River corridor, permit season, and managed Segment 2 route shape, and USGS `04122500` exists at Scottville, but no credible route-specific numeric paddling floor/range tied to that gauge surfaced.
  - Reviewed `Manistee River - M-72 Bridge to CCC Bridge` and logged it as `threshold_weak`. Michigan DNR natural-river/access materials support the public access and 14-mile route shape, but the obvious USGS Sherman gauge is a downstream proxy for this upper segment, the closer M-72 monitoring site is not a current PaddleTodayV2 provider, and no source-backed numeric threshold model was found.
  - Reviewed `Sturgeon River - Sturgeon Falls to NF2270 / FSR193` and logged it as `rejected` for this conservative automation scope. American Whitewater and Rivers.gov document the reach and gauge context, but AW explicitly says best runnable flows are unknown/tentative, and the Sturgeon Falls approach / Class II-III(V+) consequence is too high for a route add without stronger local threshold and access guidance.
  - Net result: 3 Michigan candidates reviewed, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-29: Michigan implementation pass at 8:51 AM America/Chicago (2026-05-29T13:51Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, image audit, route-addition requirements, and Michigan automation memory. No existing `state: 'Michigan'` route was present. Michigan-border `Menominee River - Mill Street Landing to Piers Gorge Road Landing` is already implemented under Wisconsin as `menominee-river-piers-gorge`, so it was not duplicated.
  - Added `Pine River - Peterson Bridge to Low Bridge` as `pine-river-peterson-low-bridge`. The route uses USGS `04125460` Pine River at High School Bridge near Hoxeyville as a direct downstream same-river gauge, a conservative minimum-only 170 cfs floor from American Whitewater Pine gauge guidance, Huron-Manistee National Forests / Recreation.gov public access and permit support, and Forest Service map coordinates for Peterson Bridge and Low Bridge. It is marked `routeType: 'whitewater'` because AW is the primary threshold source and the Pine is a fast wooded Class I-II river with strainers, sharp turns, permit traffic, and storm/logjam caveats.
  - Reviewed `Huron River - Dexter-Huron / Delhi Metropark day-trip family` and logged it as `gauge_proxy_weak`. Huron River Water Trail / Metroparks access context and AW Delhi reach evidence are promising, but the gauge/threshold relationship is still too proxy-like around dams and does not yet support a clean exact-route V2 threshold model.
  - No route-gallery asset was added; `docs/river-image-source-audit.csv` was updated with federal/AW/USGS image leads for the new Pine route.
  - Validation: `npm.cmd run typecheck` passed, ledger JSON parse passed, `npm.cmd run build` passed, and `git diff --check` passed with line-ending warnings only. `npm.cmd test` reran typecheck successfully but failed when Vitest/esbuild hit sandbox access-denied / `vitest.config.ts` resolution errors.

- 2026-05-28: South Dakota no-add pass at 9:42 AM America/Chicago (2026-05-28T14:42Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all already have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck without adding a route:
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP/Jay Heath materials still support the corridor and access spacing, but not another exact endpoint pair with route-specific threshold support.
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. Exact official canoe-access coordinates and manager-published thresholds remain unresolved, and fresh search-visible `USGS 06482020` evidence did not establish a clean same-day product-ready package.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. AW/USGS still support the route/gauge concept, but AW gauge detail remains stale and the threshold story is still low-flow anecdote around 47-50 cfs rather than a stable runnable floor/range.
    - `Missouri National Recreational River day-trip segments` remains `research_later`. NPS/official material remains corridor/access/release guidance; no specific day trip with an app-fetchable gauge/release threshold model cleared.
  - Net result: 4 South Dakota candidates/clusters reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: Missouri no-add pass at 9:43 AM America/Chicago (2026-05-28T14:43Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Rechecked `South Fabius River - Dunn Ford Access to Black Hawk Access`. It remains `no_live_gauge`: MDC strongly supports the public endpoints and 10-mile day-float shape, but official USGS `05500000` current-conditions output still exposed latest instantaneous values only from 2026-05-19, MoHERP lists South Fabius River with 0 trip rows, and no numeric paddling floor/range surfaced.
  - Rechecked `Missouri River - Washington / New Haven lower-Missouri access family`. It remains `threshold_weak`: MDC ties New Haven Access to the Washington gauge and MoHERP exposes broad gauge ratings, but the page showed no trip rows and mixed big-river condition signals rather than route-specific go/no-go thresholds. Big-river hazards still need stronger guidance than generic stage context.
  - Net result: 2 Missouri candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: Missouri no-add pass at 9:33 AM America/Chicago (2026-05-28T14:33Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Reviewed `Finley River - Riverdale / Ozark public-access day-trip family` after fresh MoHERP/USGS/Ozark access review. It was changed from `research_later` to `no_live_gauge`: MoHERP has useful Riverdale-gauge trip-family rows, but same-day May 28 product-ready official current values for USGS `07052345` were not established, USGS graph/search context includes a discontinued-or-at-risk collection warning, and the public endpoint story remains mixed around Johns Ford/Reed Road/Lindenlure/Ozark.
  - Rechecked the `Salt River - See Spillway / New London / Indian Camp` cluster. It remains `no_live_gauge`: MDC confirms Indian Camp as a Salt River concrete boat-ramp access and says mainstem public access is limited, but the New London gauge/MoHERP evidence found today did not define a clean public day-trip threshold package, and visible current evidence was stale or secondary rather than same-day official data.
  - Repaired pre-existing unresolved conflict markers in `docs/route-candidate-ledger.json` by preserving the Missouri HEAD candidate entries and the Illinois Vermilion added entry, then recorded this Missouri pass. Net result: 2 Missouri clusters reviewed, 1 status downgraded, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: Missouri no-add pass at 9:23 AM America/Chicago (2026-05-28T14:23Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Rechecked the Big Piney Sand/Sandy-Shoals-to-Boiling-Spring lead after fresh MDC/MoHERP review. It remains `no_live_gauge`: MDC still names Sandy Shoals Ford to Boiling Springs as a little-over-6-mile day trip, and MoHERP still has exact Sand/Sandy-Shoals-to-Boiling-Spring Good rows at 125 and 486 cfs on USGS `06930000`, but the MoHERP gauge page exposed a stale 2025-11-07 latest update with no trend data during this run, and the automation shell still could not reach USGS Water Services.
  - Logged `Eleven Point River - Greer Crossing Recreation Area to Turner Mill North/South access` as `threshold_weak`. Forest Service confirms Greer Crossing and Turner Mill access context plus the 4.9-mile Greer-to-Turner route, and MDC/Forest Service support the spring-fed floatability story below Greer Spring, but no route-specific numeric threshold stronger than borrowing the already-live lower Eleven Point Bardley-gauge model surfaced.
  - Net result: 2 Missouri candidates/clusters reviewed, 1 new ledger candidate logged, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: South Dakota no-add pass at 9:12 AM America/Chicago (2026-05-28T14:12Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all already have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first gauge/access recheck without adding a route:
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP still supports the corridor and access-mileage map, and Sioux Empire Paddlers still provides broad Big Sioux flow floors, but no new exact public endpoint pair with route-specific threshold support surfaced.
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP supports canoeing/kayaking at the park and the Jay Heath PDF gives the official 2.4-mile North-to-South spacing, but exact official canoe-access coordinates and manager-published thresholds remain unresolved. The likely same-river USGS `06482020` North Cliff Ave page exposed latest visible data only through May 26, 2026 at 11:30 CDT during this May 28 run.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. AW/USGS still support the route/gauge concept and City of Spearfish access context, but USGS `06431500` remains stale to May 13, 2026 and the threshold story remains low-flow anecdote around 47-50 cfs.
    - `Battle Creek - Hermosa / Keystone gauge family` was added to the ledger as `no_live_gauge`. USGS/AW gauge context exists, but official current evidence for `06406000` appears stale/discontinued-looking, AW snippets are not route-threshold support, and no public endpoint pair with numeric runnable guidance surfaced.
  - Net result: 4 South Dakota candidates/clusters reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: Missouri no-add pass at 9:13 AM America/Chicago (2026-05-28T14:13Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and the already-uncommitted `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Reviewed two Missouri gauge-first leads without adding a route:
    - `Current River - Cedar Grove to Akers Ferry` remains `no_live_gauge`. NPS/ONSR route context and MoHERP exact/nearby trip evidence remain strong enough for a future conservative minimum-only model, but direct USGS Water Services requests for `07064533` still failed from the automation shell, the official USGS monitoring page exposed station metadata but not current values in fetched text, and search/web-visible secondary evidence still did not prove same-day May 28 product-fetchable observations.
    - `Big River - Washington State Park Access to Mammoth Access` remains `threshold_weak`. MDC/Missouri State Parks endpoint evidence is excellent and the 3.3-mile route shape is clean, but the Byrnesville gauge is a downstream proxy, MoHERP/RiverScout evidence remains broad lower-Big guidance rather than exact Washington-to-Mammoth threshold support, and the freshest visible MoHERP current evidence found in search was still May 26 rather than same-day May 28.
  - Direct USGS Water Services and legacy page fetches from the automation shell still failed with `Unable to connect to the remote server`.
  - Net result: 2 Missouri candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: Missouri no-add pass at 9:03 AM America/Chicago (2026-05-28T14:03Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Reviewed a central-Missouri gauge-first cluster without adding a route:
    - `Maries River - Dr. Bernard Burns Access / Westphalia to Mari-Osa family` was changed from `research_later` to `no_live_gauge`. MDC still supports Mari-Osa as public access context near the lower Maries/Osage confluence, but official visible USGS `06927000` evidence stopped at April 26, 2026, and no manager-published exact public day trip or numeric threshold surfaced.
    - `Moreau River - Jefferson City / Moreau 50 Access family` remains `threshold_weak`, with live-data freshness now also doubtful. MDC confirms Moreau 50 as a public ramp, but the access alone is not a route, USGS `06910750` inventory/search evidence showed current observations ending October 9, 2025, and no route-specific numeric paddling floor surfaced.
    - `Lamine River - Roberts Bluff / Harriman Hill / De Bourgmont access family` remains `threshold_weak`. MDC access support is real, but the only numeric range found remains RiverScout's community-unverified 225-700 cfs range, third-party gauge snippets were stale to May 12, 2026, and no route-specific manager/outfitter threshold package surfaced.
  - Direct USGS Water Services fetches from the automation shell still failed with `Unable to connect to the remote server`.
  - Net result: 3 Missouri candidates reviewed, 1 status downgraded, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: Missouri no-add pass at 8:53 AM America/Chicago (2026-05-28T13:53Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Reviewed three Missouri gauge-first clusters without adding a route:
    - `Big Piney River - East Gate / Crossroads / Bookers Bend family` remains `no_live_gauge`. MTNF and Recreation.gov support practical public access and route mileage, and MoHERP has useful Big Piney trip/threshold evidence, but official USGS `06930000` visible current data stopped at 2026-05-26 20:00 CDT, stale for this May 28 run.
    - `Niangua River - Bennett Spring Access to Barclay Conservation Area Access` remains `gauge_proxy_weak`. MoHERP has exact route rows and MDC access context is strong, but Windyville remains an upstream proxy below a major spring inflow, and official USGS `06923250` visible current data stopped at 2026-05-25 14:00 CDT.
    - `Black River - Lesterville Access to Route K Bridge` was changed from `research_later` to `no_live_gauge`. MoHERP Annapolis bands/overlapping trip rows are useful, but official USGS `07061500` visible current data stopped at 2026-05-26 20:15 CDT, and Lesterville access usability plus exact-route threshold support remain unresolved.
  - Net result: 3 Missouri candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: Missouri no-add pass at 8:44 AM America/Chicago (2026-05-28T13:44Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Reviewed the upstream/middle James River Boaz gauge cluster without adding a route:
    - `James River - Rivercut Access to Delaware Town Access` was downgraded from `research_later` to `no_live_gauge` because the official USGS `07052250` Boaz page now states data collection was discontinued on 2025-10-01. MoHERP exact-trip evidence remains useful historically, but it is not a live V2 gauge path.
    - `James River - Delaware Town Access to Shelvin Rock Access` was logged as `no_live_gauge`. MDC confirms both endpoints as public day-use boat-ramp accesses, JRBP names the exact float, and MoHERP has exact Delaware-to-Shelvin rows, but the same discontinued Boaz gauge blocks implementation.
    - `James River - Hootentown Access to H.L. Kerr Access` was not added. It would rely on the downstream Galena gauge already used by lower-James routes, and exact-route threshold evidence is too thin for a long 16.9-mile day.
  - Net result: 3 Missouri candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-28: South Dakota no-add pass at 8:42 AM America/Chicago (2026-05-28T13:42Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all already have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck without adding a route:
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP still confirms the official Jay Heath corridor and access-to-access mileage, and Sioux Empire Paddlers still provides broad Big Sioux flow floors, but no new exact public endpoint pair with route-specific gauge/threshold support surfaced.
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP/park material confirms two canoe launches and the Jay Heath PDF gives the official 2.4-mile North-to-South spacing, but exact official launch coordinates and manager-published thresholds remain unresolved. Fresh visible USGS evidence for likely same-river gauges was not same-day/product-ready: Dell Rapids `06481000` showed latest visible values from May 15, and Sioux Falls `06482000` from May 12.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. AW/USGS still support the route/gauge concept and City of Spearfish confirms Evans Park creek access, but visible USGS `06431500` current evidence was stale to May 13 and the route threshold story remains low-flow anecdote around 47-50 cfs rather than a stable runnable floor/range.
    - `Missouri National Recreational River day-trip segments` remains `research_later`. NPS access pages provide named access points, river miles, and coordinates, but no practical access-to-access day trip with a direct app-fetchable gauge/release threshold package cleared. The SDCKA/NPS Missouri River Water Trail Project is still a 2026-2027 mapping effort.
  - Net result: 4 South Dakota candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 8:05 PM America/Chicago (2026-05-27T01:05Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Rechecked the strongest unresolved Missouri lead from the current queue: `Shoal Creek - Tipton Ford Access to Wildcat Access`. MDC evidence is stronger than the prior blocker wording: Tipton Ford is a public access with a concrete boat ramp, and the MDC Shoal Creek small-river-access plan identifies Wildcat as a downstream MDC access 19.3 river miles below Tipton Ford. MoHERP still provides useful Joplin-gauge bands and Tipton-to-Wildcat trip evidence, including high-water danger around 1,370 cfs.
  - No route was added. Direct USGS Water Services fetches for `07187000`, plus spot checks for `07054080`, `07014500`, and `07064533`, still failed from the automation shell with connection errors. The official/search-visible Shoal Creek current-conditions evidence available to this run still did not prove same-day May 27 UTC product-fetchable data, and the Tipton-to-Wildcat route is a long 19.3-mile day with only third-party coordinates captured so far. The ledger remains `no_live_gauge`.
  - Net result: 1 Missouri candidate re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 7:55 PM America/Chicago (2026-05-27T00:55Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, `james-river-shelvin-rock-hooten-town`, and `james-river-hl-kerr-ralph-cox`; none were duplicated.
  - Rechecked four strong deferred Missouri gauge-first leads without adding a route:
    - `Meramec River - Onondaga Cave State Park to Campbell Bridge Access` remains `no_live_gauge`. Route/access evidence and MoHERP Sullivan threshold context remain useful, but USGS `07014500` legacy current conditions still showed latest discharge/stage from 2026-05-24 15:30 CDT and direct USGS Water Services fetches still failed from the automation shell.
    - `Gasconade River - Rollins Ferry Access to Pointers Creek Access` remains `no_live_gauge`. Route/access evidence remains promising, but USGS `06934000` legacy current conditions showed latest discharge/stage from 2026-05-25 20:30 CDT rather than same-day May 27 UTC data, and direct USGS Water Services still failed.
    - `Current River - Cedar Grove to Akers Ferry` remains `no_live_gauge`. NPS route support remains strong, but USGS `07064533` legacy current conditions showed latest discharge/stage from 2026-05-23 12:30 CDT and direct USGS Water Services still failed.
    - `Shoal Creek - Tipton Ford Access to Wildcat Access` remains `no_live_gauge`. Rivers.MOHERP gives useful Joplin-gauge bands and exact trip evidence, but USGS `07187000` legacy current conditions showed latest discharge/stage from 2026-05-25 16:00 CDT, and endpoint authority is still less clean than manager-confirmed MDC-to-MDC routes.
  - Logged fresh `Castor River - Maple Flats / Zalma public-access family` as `no_live_gauge`. USGS `07021000` is a real same-river gauge and Maple Flats appears to be a public Castor launch lead, but USGS legacy current conditions showed latest discharge/stage from 2026-05-20 14:45 CDT, AW gauge data appeared stale by months, and no route-specific numeric paddling threshold surfaced.
  - Net result: 5 Missouri candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: South Dakota no-add pass at 7:55 PM America/Chicago (2026-05-27T00:55Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all already have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck without adding a route:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP still confirms Big Sioux Recreation Area canoeing/kayaking, the Jay Heath PDF still gives the official 2.4-mile North-to-South spacing, and Sioux Empire Paddlers still provides the broad 300 cfs Cliff Ave floor, but exact official canoe-access coordinates and manager-published route thresholds remain unresolved.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. Sioux Empire Paddlers names the broader Lien Park-to-Newton-Hills stretch and circuit legs, but Lien Park is not documented as a clean boat/canoe launch and another route split would still rely on corridor-level access plus community gauge floors already represented by the implemented Sioux Falls route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. AW, USGS `06431500`, Snoflo, and City of Spearfish Evans Park context remain useful, but the numeric support is still low-flow anecdote around 47-50 cfs rather than a stable route-specific floor/range.
    - `Missouri National Recreational River day-trip segments` remains `research_later`. No new NPS/official partner route-specific day-trip gauge/release package surfaced during this narrow pass.
  - Net result: 4 South Dakota candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri implementation pass at 7:46 PM America/Chicago (2026-05-27T00:46Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes were `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Added `James River - H.L. Kerr Access to Ralph Cox Memorial Access` as `james-river-hl-kerr-ralph-cox`.
  - Qualification path: MDC confirms H.L. Kerr Access and Ralph Cox Memorial Access as public James River day-use boat-ramp accesses; James River Basin Partnership identifies H.L. Kerr-to-Ralph-Cox as a scenic Galena / Y-Bridge float; Rivers.MOHERP has exact Kerr-to-Cox trip rows on the Galena gauge; and the app already has a configured USGS `07052500` Galena gauge path for the adjacent Shelvin-Rock-to-Hooten-Town route.
  - Threshold model: conservative `minimum-only` at 200 cfs on `USGS 07052500`, reusing the existing lower-James Galena-gauge floor and supported by exact Kerr-to-Cox good reports around 306, 361, and 417 cfs. No ideal range or upper cutoff was inferred.
  - Caveats: direct shell fetch to USGS Water Services remains blocked in this automation environment, so the add relies on the existing app gauge mapping plus public/MoHERP evidence rather than a fresh shell-confirmed IV fetch. Coordinates came from public paddling-location records paired with MDC access confirmation; follow MDC maps and on-site signs. No rights-clean exact-route gallery asset was selected.

- 2026-05-26: Missouri no-add pass at 7:35 PM America/Chicago (2026-05-27T00:35Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked four close Missouri gauge-first leads without adding a route:
    - `Meramec River - Onondaga Cave State Park to Campbell Bridge Access` remains `no_live_gauge`. Route/access evidence and MoHERP Sullivan threshold context remain useful, but direct USGS Water Services for `07014500` still failed from the automation shell, the modern USGS page did not expose current values in fetched text, and MoHERP-visible current data was not fresh enough for this May 27 UTC run.
    - `Gasconade River - Rollins Ferry Access to Pointers Creek Access` remains `no_live_gauge`. The public endpoint and Rich Fountain gauge story remains promising, but direct USGS Water Services for `06934000` still failed and fresh official/product-fetchable current observations were not established.
    - `Current River - Cedar Grove to Akers Ferry` remains `no_live_gauge`. NPS route and gauge-list support remains strong, but direct USGS Water Services for `07064533` still failed and fresh official/product-fetchable Akers current observations were not established.
    - `Salt River - See Spillway to Cincinnati Road` remains `no_live_gauge`. Route/access and MoHERP exact-trip evidence remain promising, but direct USGS Water Services for `05507800` still failed and the route still needs release-aware threshold framing below Mark Twain Lake.
  - Net result: 4 Missouri candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 7:25 PM America/Chicago (2026-05-27T00:25Z).
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked four high-priority Missouri gauge-first leads without adding a route:
    - `Meramec River - Onondaga Cave State Park to Campbell Bridge Access` remains `no_live_gauge`. Route/access evidence remains strong and MoHERP Sullivan trip evidence can support only conservative future minimum-only scoring, but USGS Water Services for `07014500` still failed from the automation shell, the fetched modern USGS page did not expose current values, and visible MoHERP Sullivan data was stale to 2026-04-29.
    - `Gasconade River - Rollins Ferry Access to Pointers Creek Access` remains `no_live_gauge`. The lower-Gasconade route/access story and Rich Fountain MoHERP bands remain promising, but USGS Water Services for `06934000` still failed from the automation shell and visible MoHERP Rich Fountain data topped out at 2026-05-25 20:30.
    - `Current River - Cedar Grove to Akers Ferry` remains `no_live_gauge`. NPS route support and possible MoHERP minimum-only calibration remain useful, but current official/product-fetchable `USGS 07064533` data was not established.
    - `Meramec River - Scott's Ford / Steelville family` remains `no_live_gauge`. Search-visible secondary Steelville data was stale to 2026-05-19, USGS Water Services for `07013000` still failed from the automation shell, and endpoint/threshold support remains route-family rather than implementation-clean.
  - Net result: 4 Missouri candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: South Dakota no-add pass at 7:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all already have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck without adding a route:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP still confirms Big Sioux Recreation Area canoeing/kayaking and the Jay Heath PDF still gives the official 2.4-mile North-to-South spacing, but exact official canoe-access coordinates and manager-published route thresholds remain unresolved.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP confirms the trail map lists launch sites, campgrounds, and site information, and the PDF provides corridor spacing, but another route split would still rely on broad corridor evidence plus community gauge floors already represented by the implemented Sioux Falls route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. Current search again surfaced AW route/gauge context and the direct `USGS 06431500` streamgage, but the usable threshold evidence remains low-flow anecdote around 47-50 cfs rather than a stable route-specific floor/range.
    - `Missouri National Recreational River day-trip segments` remains `research_later`. NPS current-conditions guidance gives reach-level release context below Gavins Point, including 16,000 cfs as low water and over 40,000 cfs as very high water, but the obvious Yankton USGS station still lacks current discharge for the app path and no practical access-to-access route/gauge package cleared.
  - Net result: 4 South Dakota candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 7:15 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked Missouri-first gauge leads without adding a route:
    - `Current River - Cedar Grove to Akers Ferry` remains `no_live_gauge`. NPS route support is strong and MoHERP/Snoflo show useful secondary Akers-gauge context, but the official USGS `07064533` current-conditions page still showed latest instantaneous discharge/stage from 2026-05-16, with secondary evidence only to May 22/23 rather than same-day product-fetchable data.
    - `Meramec River - Onondaga Cave State Park to Campbell Bridge Access` remains `no_live_gauge`. Access and route-shape evidence remain strong, and MoHERP Sullivan bands could support a conservative future floor, but current official/search-visible USGS `07014500` evidence still did not establish a live app-fetchable current-data path.
    - `Gasconade River - Rollins Ferry Access to Pointers Creek Access` remains `no_live_gauge`. The lower-Gasconade route/access story is still promising, but official/search-visible `USGS 06934000` evidence still did not establish same-day product-fetchable data.
    - `Meramec River - Scott's Ford Access to Riverview Access / Steelville family` was rechecked and treated as `no_live_gauge` for this pass. MDC supports the public access pair and 7-mile float shape, but the official USGS `07013000` page still opened with latest instantaneous values from 2026-05-17, and MoHERP opened with cached March 2026 current data.
  - Net result: 4 Missouri candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 7:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked three Missouri gauge-first leads without adding a route:
    - `Meramec River - Onondaga Cave State Park to Campbell Bridge Access` remains `no_live_gauge`. The access and minimum-only threshold story is still close, but the automation shell still cannot reach USGS Water Services for `07014500`, and current public/search evidence still does not prove same-day product-fetchable data.
    - `Gasconade River - Rollins Ferry Access to Pointers Creek Access` remains `no_live_gauge`. Route/access support and MoHERP Rich Fountain bands remain promising, but official/search-visible evidence still does not establish same-day product-fetchable `USGS 06934000` data.
    - `Lamine River - Roberts Bluff / Harriman Hill / De Bourgmont access family` remains `threshold_weak`. MDC access context and `USGS 06906800` are real, but the only numeric paddling range found remains RiverScout/community-unverified rather than a route-specific manager/outfitter/guide threshold.
  - Net result: 3 Missouri candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 7:03 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked the strongest deferred Missouri gauge-first leads without adding a route:
    - `Meramec River - Onondaga Cave State Park to Campbell Bridge Access` remains `no_live_gauge`. Route/access evidence is still strong and MoHERP Sullivan evidence could support a conservative 200 cfs minimum-only model, but the official USGS `07014500` legacy page still showed latest discharge/stage from 2026-05-24 15:30 CDT rather than same-day May 26 values.
    - `Meramec River - Short Bend Access to Cook Station low-water bridge` remains `no_live_gauge`. The access/threshold story is still promising, but official USGS `07010350` still did not expose same-day product-ready current IV data and Cook Station endpoint coordinates remain unresolved.
    - `Jacks Fork River - Alley Spring to Eminence` remains `no_live_gauge`. NPS route support and MoHERP threshold support remain useful, but official USGS `07065495` still did not expose product-ready same-day current observations.
  - Net result: 3 Missouri candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: South Dakota no-add pass at 6:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all already have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck without adding a route:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP still confirms Big Sioux Recreation Area canoeing/kayaking and a general park coordinate, and the Jay Heath PDF still gives the official 2.4-mile North-to-South spacing, but exact official canoe-access coordinates and manager-published route thresholds remain unresolved.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. The official GFP corridor map is useful, but additional route splits would still be built from corridor mileage plus community gauge floors already represented by the implemented Sioux Falls Big Sioux route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. AW again surfaced the town section and direct `USGS 06431500` context, but the usable threshold evidence remains a low-flow note around 47-50 cfs rather than a stable route-specific floor/range.
    - `Missouri National Recreational River day-trip segments` remains `research_later`. NPS access pages provide strong access coordinates and NPS current-conditions guidance says 16,000 cfs is low and over 40,000 cfs is very high below Gavins Point, but the obvious USGS Yankton station was stale/no-discharge for the app path and no practical access-to-access route/gauge package cleared.
  - Net result: 4 South Dakota candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 6:46 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh Missouri gauge-first leads without adding a route:
    - `Gasconade River - Rollins Ferry Access to Pointers Creek Access` was added to the ledger as `no_live_gauge`. MDC/event/search evidence supports a roughly 7-mile lower-Gasconade paddle with public access context, and the Rich Fountain / Highway 89 gauge (`USGS 06934000`) is a strong direct gauge candidate with MoHERP numeric bands. The blocker is still live-data freshness: official USGS current values were only through 2026-05-25 20:30 CDT, not same-day May 26 data.
    - `Platte River - Platte Falls Conservation Area loop / access family` was added as `threshold_weak`. MDC support for paddling/access at Platte Falls is useful, but no credible numeric paddling floor/range tied to a live Platte gauge surfaced.
    - `Bull Creek - Walnut Shade / Woods Fork / Dry Hollow family` was added as `no_live_gauge`. MoHERP/route interest exists around `USGS 07053810`, but current product-ready official data and manager-confirmed public endpoints were not established.
    - `Marais des Cygnes River - NWR / state-line family` was added as `research_later`. Refuge/paddling context is real, but the visible route is not a clean Missouri V2 day trip and lacks a route-specific live gauge/threshold package.
  - Net result: 4 Missouri clusters reviewed, 0 promotions to addable, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 6:35 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked two dam-release-influenced Missouri gauge clusters without adding a route:
    - `Salt River - See Spillway to Cincinnati Road` remains `no_live_gauge`. A Paddler's Guide to Missouri supports the 7.0-mile route from Warren G. See Spillway Recreation Area boat ramp to Cincinnati Road USACE boat ramp, USACE planning confirms Warren G. See boat-launch facilities, and MoHERP has exact trip rows tied to USGS `05507800`. The blocker is still official live-data freshness: USGS legacy current conditions opened during this pass showed latest discharge/stage at 2026-05-24 09:30 CDT, not same-day May 26. The route also needs release-aware threshold framing because Cannon Dam generation and the re-regulation dam drive conditions.
    - `Sac River - Highway 32 bridge below Stockton Reservoir to Caplinger Mill Park Access` remains `no_live_gauge`. MoHERP exposes Caplinger Mills gauge bands for USGS `06919900`, but official USGS current conditions showed latest discharge/stage at 2026-05-18 09:45 CDT, and the route still needs cleaner public endpoint confirmation plus release-aware caveats below Stockton Dam.
  - Net result: 2 Missouri candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: South Dakota no-add pass at 6:27 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first review without adding a route:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP/SDCKA still supports the official 2.4-mile north-to-south cruise and north access address, and GFP confirms park canoeing/kayaking, but exact official coordinates for both canoe access sites and manager-published route thresholds remain unresolved.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP corridor mapping is official, but more route splits would still rely on corridor mileage plus local community gauge floors already represented by the existing Sioux Falls Big Sioux route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. AW confirms the town section and direct gauge context, but the threshold story remains low-flow anecdote around 47-50 cfs rather than a stable route-specific runnable floor/range.
    - `Rapid Creek - Heisga to Dark Canyon` remains `research_later`. AW trip-report text provides useful 100-250 cfs and high-water context, but the route remains advanced, access-complicated whitewater rather than a conservative public PaddleToday package.
    - `Redwater River - Old Belle Bridge / Helmer-Mountain View / Highway 34 family` was added to the ledger as `no_live_gauge`. AW/USGS route-gauge context exists, but visible gauge evidence is stale, public access authority is weak, and no stable threshold model surfaced.
    - `Missouri National Recreational River day-trip segments` remains `research_later`; NPS/partner corridor support still lacks a route-specific gauge/release model for a practical day trip.
  - Net result: 6 South Dakota candidates reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 6:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed two fresh northern-Missouri gauge-first leads without adding a route:
    - `South Fabius River - Dunn Ford Access to Blackhawk Access` was added to the ledger as `no_live_gauge`. MDC gives strong public route support, including Dunn Ford access, Blackhawk as the next canoe access 10 river miles downstream, and watershed-inventory support for Dunn-Ford-to-Blackhawk one-day floats. The blocker is that likely downstream USGS `05500000` official current evidence was stale to May 19, 2026 rather than same-day May 26, and no numeric paddling threshold surfaced.
    - `Wyaconda River - Wyaconda Crossing / Sunnyside School public-access family` was added to the ledger as `threshold_weak`. MDC confirms public access and says significant reaches can be floated by canoe or small jon boat much of the year, but no exact day-trip pair with distance, coordinates, and numeric gauge guidance tied to USGS `05496000` cleared.
  - Net result: 2 Missouri clusters reviewed, 0 routes added, 2 new ledger entries, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 6:15 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked two gauge-first Missouri leads without adding a route:
    - `St. Francis River - Millstream Gardens to Silver Mines` remains `no_live_gauge`. AW/MWA/MTNF/MDC support the whitewater route and threshold story, but USGS `07034000` still does not provide a product-ready Waterdata IV path, AW gauge detail is stale, and the current app does not ingest the Roselle USACE/NOAA/AW gauge family.
    - `Cuivre River - Highway 61 / Riggs Ferry / Old Monroe family` remains `threshold_weak`. USGS `05514500` and MoHERP confirm a promising Troy gauge and broad condition bands, but no source-backed exact public day-trip pair or route-specific trip rows surfaced; broad MDC floatability/access context is still not enough for V2 scoring.
  - Net result: 2 Missouri clusters reviewed, 0 routes added, 0 promotions, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 6:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh/reframed Missouri gauge-first leads without adding a route:
    - `Current River - Cedar Grove to Akers Ferry` was added to the ledger as `no_live_gauge`. NPS supports Cedar Grove-to-Akers as a 3-hour Upper Current paddle, NPS identifies USGS `07064533` Current River above Akers as the direct gauge family, and MoHERP/search-visible trip evidence supports Cedar-Grove/Akers use around the Akers gauge. The route was not added because search-visible official/secondary current evidence for `07064533` only reached May 16 to May 23, 2026 rather than same-day May 26, so the product-fetchable live-data gate did not clear.
    - `Gasconade River - Riddle Bridge Access to Jerome Access / Jerome gauge family` was rechecked and remains `no_live_gauge`. MDC now gives strong public-route context from Riddle Bridge to the new Jerome Access and confirms Jerome Access has a concrete boat ramp, ADA/gravel parking, and bank access, but prior Jerome/Rich Fountain gauge staleness remains the blocker and no route-specific numeric paddling model strong enough for V2 was selected.
  - Net result: 2 Missouri clusters reviewed, 0 routes added, 1 new ledger entry, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 5:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh Missouri gauge-first leads without adding a route:
    - `Spring River - Carthage / La Russell / public-access family` was added to the ledger as `no_live_gauge`. USGS `07185765` and MoHERP make this a real gauge cluster, and Missouri DNR/MDC sources confirm Spring River basin/gauge context, but search-visible official USGS evidence only showed current values through May 25, 2026 rather than same-day May 26, the shell still could not reach USGS Water Services, and no exact manager-backed public day-trip pair with route-specific thresholds cleared.
    - `Missouri River - Washington / New Haven lower-Missouri access family` was added to the ledger as `threshold_weak`. MDC confirms New Haven Access and points to the Washington gauge, and Missouri River Water Trail / Missouri River Relief support broad paddling access context, but no conservative route-specific numeric stage/flow model surfaced for broad PaddleToday scoring on a big-river day trip.
  - Net result: 2 Missouri clusters reviewed, 0 routes added, 2 ledger entries added, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 5:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck of the strongest unresolved leads:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. Fresh review reconfirmed the GFP/SDCKA north-to-south cruise, north access address, Jay Heath PDF 2.4-mile spacing, GFP park canoeing/kayaking support, general park coordinates, campground-map kayak-launch/canoe-in context, and local 300 cfs Cliff Ave floor. Exact official coordinates for both canoe access sites and manager-published route-specific thresholds remain unresolved.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP corridor mapping is official and useful, but additional app routes would still be split from broad access spacing plus community gauge floors already represented by the existing Sioux Falls Big Sioux route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. American Whitewater still shows the town section and a recent-looking low-50 cfs current snippet, but the stable route-specific threshold model is still only low-flow anecdote, and USGS/search-visible current-condition evidence remains stale.
    - `Missouri National Recreational River day-trip segments` remains `research_later`; NPS access and water-trail pages support the corridor, but no route-specific gauge/release model surfaced for a practical day trip, and wind/dam-release/big-water caveats remain first-order.
  - Net result: 4 South Dakota candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 11:02 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remain `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked Missouri gauge-first leads without adding a route:
    - `Meramec River - Onondaga Cave State Park to Campbell Bridge Access` was narrowed from a broader route family and changed to `no_live_gauge`. Route/access evidence is strong: Missouri State Parks confirms the Onondaga canoe launch and publishes boat-launch coordinates, MDC confirms Campbell Bridge Access, and the MDC area plan says Onondaga-to-Campbell is a 5-mile canoe float with Campbell Bridge ramp/canoe-launch infrastructure. MoHERP Sullivan evidence could support a conservative 200 cfs minimum-only model if live data recovers. The route was not added because official USGS `07014500` still showed latest discharge/stage from May 24, 2026 rather than same-day May 26 values.
    - `Elk River - Route DD to MO 43 / Cowskin Access family` remains `threshold_weak`. Elk River Floats gauge-key evidence improves the threshold story, and MDC Cowskin is a strong public endpoint, but the route still lacks a clean public put-in/route definition and same-day official USGS `07189000` confirmation.
    - `Black River - Poplar Bluff lower-Black public-access family` was changed to `no_live_gauge`. MDC Dan River Access and lower-Black context remain useful, but official USGS `07063000` evidence showed latest current values from April 19, 2026, and no exact public day-trip pair cleared the route-definition gate.
  - Net result: 3 Missouri clusters reviewed, 0 routes added, 2 ledger status downgrades to `no_live_gauge`, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 5:35 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh/rechecked Missouri gauge-first leads without adding a route:
    - `Finley River - Riverdale / Ozark public-access day-trip family` remains `research_later`. MoHERP route-family threshold evidence is useful, but fresh search-visible USGS `07052345` evidence still showed May 25 rather than same-day May 26 values, direct shell fetch to USGS Water Services still failed, and Lindenlure remains too access-conflicted for a clean public put-in without a current manager/legal source.
    - `Maries River - Dr. Bernard Burns Access / Westphalia to Mari-Osa / lower Maries family` was added to the ledger as `research_later`. USGS `06927000` is the direct Westphalia gauge, MDC confirms Mari-Osa Access as a public ramp, and search-visible MDC event/newspaper material describes Dr. Bernard Burns Access as MDC-managed canoe/small carry-in access. The route was not added because no manager-published exact day-trip pair or numeric paddling floor/range tied to the Westphalia gauge surfaced.
  - Net result: 2 Missouri clusters reviewed, 0 routes added, 1 research-later ledger entry added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 5:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh Missouri gauge-first leads without adding a route:
    - `James River - Rivercut Access to Delaware Town Access` was added to the ledger as `research_later`. Rivers.MOHERP Boaz-gauge evidence has exact Rivercut-to-Delaware trip rows and a plausible 150 cfs floor, and MDC watershed material confirms public stream access in the basin. The route was not added because official USGS `07052250` current-condition pages are affected by May 26 WDFN maintenance, the shell still cannot reach USGS Water Services, and public endpoint authority/coordinates for Rivercut and Delaware Town need a cleaner manager-source pass before implementation.
    - `Black River - Poplar Bluff access family` was added to the ledger as `research_later`. Rivers.MOHERP showed same-day May 26 Poplar Bluff gauge observations and useful broad condition bands, while Forest Service/MDC search results confirm lower-Black public access context around Hendrickson, Markham Springs, Sportsmans, Dan River, and Poplar Bluff. The route was not added because no exact practical public day-trip pair cleared the source-backed route-definition gate, and the route would need lower-Black floodplain/motorboat/water-quality caveats rather than a generic Ozark-float framing.
  - Net result: 2 Missouri clusters reviewed, 0 routes added, 2 research-later ledger entries added, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 5:24 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first gauge/search rotation after the 4:54 PM no-add pass:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. Fresh review reconfirmed GFP Jay Heath corridor support, the Jay Heath PDF 2.4-mile North-to-South spacing, GFP Big Sioux Recreation Area kayak-launch/canoe-in map context, and Sioux Empire Paddlers' 300 cfs Cliff Ave floor. Exact official coordinates for both canoe access sites and route-specific manager threshold support remain unresolved.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP clearly supports the broad mapped water trail and access spacing, but additional app routes would still be splits from a corridor map plus community gauge floors already represented by the existing Sioux Falls Big Sioux route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. Search reconfirmed direct `USGS 06431500`, American Whitewater town-section context, and current-looking third-party gauge snippets around the low-50 cfs range, but no stable route-specific runnable floor or range surfaced.
    - `Missouri National Recreational River day-trip segments` remains `research_later`; no NPS/partner route-specific gauge/release threshold model surfaced for a practical day trip.
  - Net result: 4 South Dakota candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 5:15 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Corrected a ledger reconciliation issue: `Big Piney River - East Gate to Bookers Bend` still showed `threshold_weak` even though the prior 5:05 PM pass documented a downgrade. It is now `no_live_gauge` because official/search-visible USGS `06930000` evidence points to no product-ready current IV record.
  - Reviewed fresh Missouri gauge-first leads without adding a route:
    - `Little Sac River - Morrisville gauge public-access day-trip family` was added to the ledger as `research_later`. USGS `06918740`, MoHERP, and RiverApp snippets make the gauge cluster promising, but no manager-published public endpoint pair or route-specific threshold package cleared the bar.
    - `Pomme de Terre River - Hermitage Access to Cross Timbers Access` remains `no_live_gauge`. USACE/MDC route and access evidence remains useful, but official USGS inventory/search evidence still does not show same-day May 26 product-fetchable current observations for `06921350`.
    - `Meramec River - Pacific Palisades Access to Allenton Access` remains `threshold_weak`. MDC access and mileage evidence is clean, but USGS `07019000` freshness remains stale/unclear and MoHERP has no Eureka evaluative thresholds or trip rows.
    - `Wilson Creek - Battlefield / James River confluence access family` was added as `research_later`. USGS `07052160` is a real gauge, but public route definition, water-quality caveats, and access support are too weak for V2.
  - Net result: 4 Missouri clusters reviewed, 0 routes added, 2 research-later ledger entries added, 1 ledger status corrected, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 5:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked narrow direct-gauge Missouri leads rather than broad-searching weak new corridors:
    - `Jacks Fork River - Alley Spring to Eminence` remains `no_live_gauge`. NPS/MoHERP route and threshold evidence remains strong, but the automation shell still could not reach USGS Water Services for `07065495`, and fresh official/search-visible USGS evidence points to no product-ready current IV record.
    - `Flat Creek - McDowell Low Water Bridge to Stubblefield Access` remains `research_later`. AW threshold evidence and MDC Stubblefield support remain useful, but the official USGS legacy page opened with May 25 latest values rather than same-day May 26, the shell could not verify USGS Water Services, and McDowell public put-in authority remains unresolved.
    - `Big Piney River - East Gate to Bookers Bend` was changed from `threshold_weak` to `no_live_gauge`. Forest Service endpoint support is strong, but fresh official/search-visible USGS evidence for `06930000` points to current/continuous data ending in October 2025 rather than a product-fetchable live IV path.
  - Net result: 3 Missouri candidates re-reviewed, 0 routes added, 1 status downgrade to `no_live_gauge`, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 4:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked the strongest deferred Shoal Creek / Joplin lead. MDC confirms Tipton Ford and Wildcat as public Shoal Creek access areas, National Rivers Project confirms the MDC public access network, MoHERP latest exposed same-day May 26 Joplin gauge data at 870 cfs / 3.86 ft around 10:00 CDT, and third-party coordinate leads were found for Tipton Ford and Wildcat.
  - No route was added because the official USGS legacy page still showed the most recent instantaneous values from May 25 at 16:00 CDT, the app's product fetch path remains USGS Water Services rather than MoHERP, the local shell still could not independently verify USGS Water Services, coordinates are not authoritative enough for implementation, and the narrowed Tipton-to-Wildcat reach is a long 19.3-mile package rather than a clean ordinary day trip. The ledger was changed from `needs_manual_coordinates` to `no_live_gauge` for this candidate to reflect the primary product-fetch blocker.
  - Net result: 1 Missouri cluster re-reviewed, 0 routes added, 0 promotions, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 4:54 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck of the strongest remaining leads:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. Fresh search reconfirmed GFP Big Sioux Recreation Area public canoeing/kayaking support, the general park coordinate, the Jay Heath PDF 2.4-mile North-to-South spacing, the GFP/SDCKA dedication notice naming the north and south canoe access sites, and Sioux Empire Paddlers' 300 cfs Cliff Ave floor. This still does not resolve exact official coordinates for both access sites or make the Cliff Ave floor route-specific manager threshold guidance.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP corridor support is strong, but additional segments still rely on broad access spacing plus local gauge floors already represented by the implemented Sioux Falls Big Sioux route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. Fresh search reconfirmed the direct `USGS 06431500` gauge and American Whitewater town-section evidence, but the AW gauge detail remains stale and the visible 50 cfs language is low-flow anecdote, not a stable PaddleToday threshold model.
    - `Missouri National Recreational River day-trip segments` remains `research_later`; no new NPS/partner route-specific gauge/release model surfaced.
  - Net result: 4 South Dakota candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 4:45 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Rechecked the Shoal Creek / Joplin gauge cluster and narrowed it to the stronger `Tipton Ford Access to Wildcat Access` lead. MDC and National Rivers Project support the public Shoal Creek access network, the Tipton Ford management plan says Tipton Ford is 19.3 miles upstream of Wildcat and has a concrete ramp, MoHERP has direct `USGS 07187000` Shoal Creek/Joplin gauge ratings plus nearby trip rows, and the official USGS page exposed discharge/stage parameters through 2026-05-25.
  - No route was added because the official USGS page did not show same-day May 26 observations, the local shell still could not reach USGS Water Services, and source-backed endpoint coordinates for the exact Tipton Ford / Wildcat day-trip package were not fully captured. The ledger was updated from the earlier Grand-Falls/Redings-Mill family to a `needs_manual_coordinates` Tipton-Ford/Wildcat candidate.
  - Net result: 1 Missouri cluster re-reviewed, 0 routes added, 1 promotion to `needs_manual_coordinates`, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 4:35 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh Missouri gauge-first leads without adding a route:
    - `Cuivre River - Highway 61 / Riggs Ferry / Old Monroe family` remains `threshold_weak`. USGS `05514500` and MoHERP provide current-looking gauge/band evidence, but the route still lacks one exact source-backed day-trip pair with coordinates and route-specific threshold support.
    - `Big River - Washington State Park Access to Mammoth Access` remains `threshold_weak`. MDC/Missouri State Parks access and 3.30-mile spacing are strong, but USGS `07018500` surfaced stale May 18 current-condition evidence, is downstream of the reach, and the numeric guidance remains broad Big River context rather than route-specific support.
    - `Moreau River - Jefferson City / Moreau 50 Access family` remains `threshold_weak`. MDC confirms Moreau 50 as public access and USGS `06910750` is the obvious gauge, but no second public endpoint or credible numeric paddling floor/range cleared the bar.
  - Local shell checks to USGS Water Services still could not connect, so no candidate cleared the product-fetchable live-data path plus threshold plus access gates. Net result: 3 Missouri clusters reviewed, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 4:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed Missouri gauge-first leads without adding a route:
    - `Niangua River - Bennett Spring Access to Barclay Conservation Area Access` remains `gauge_proxy_weak`. Search-visible MoHERP evidence still shows Bennett-to-Barclay trip rows tied to USGS `06923250`, and MDC access support remains promising, but Windyville is upstream of Bennett Spring and still lacks source validation as the scoring gauge for the exact route. The automation shell also could not reach USGS Water Services or the USGS legacy page during this run, so product-fetch confidence did not improve.
    - `Flat Creek - McDowell Low Water Bridge to Stubblefield Access` remains `research_later`. MDC confirms Stubblefield Access and Missouri DNR confirms USGS `07052820` is at Lower Flat Creek Public Access with current/historical observation tooling, but fresh search still did not find a manager-published or otherwise strong public-access source for McDowell Low Water Bridge as a normal put-in.
  - Net result: 2 Missouri candidates re-reviewed, 0 routes added, 0 promotions, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 4:24 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Ran a narrow South-Dakota-first recheck focused on unresolved Big Sioux / Jay Heath and Spearfish Creek leads:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP confirms Big Sioux Recreation Area canoeing/kayaking and publishes a general park coordinate, and the Jay Heath PDF still lists the official 2.4-mile North-to-South spacing. This still does not resolve exact north/south canoe-access coordinates or turn the 300 cfs Cliff Ave guidance into a route-specific manager band.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. The official corridor map remains useful, but fresh search only repeated broad corridor/access support and local Big Sioux floors already represented by the implemented Sioux Falls route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. American Whitewater search-visible text still supports the town section and direct `USGS 06431500` gauge, but the AW gauge-detail page remains stale and the visible threshold language around 47-50 cfs is not a stable PaddleToday floor or range.
  - Net result: 3 South Dakota candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 4:53 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh Missouri gauge-first leads without adding a route:
    - `Cuivre River - Highway 61 / Riggs Ferry / Old Monroe family` was added to the ledger as `threshold_weak`. USGS `05514500` is a real official live gauge and MoHERP exposes broad bands, while MDC confirms the river and forks can be floated during normal flows and names Riggs Ferry, Old Monroe, and R. H. Crouch as MDC-managed carry-in accesses. The blocker is still route readiness: MoHERP has zero trip rows for the gauge, MDC describes broad reaches rather than one exact day-trip pair, and several accesses are carry-in/highway-right-of-way sites without a clean V2 endpoint package.
    - `Black River - Lesterville Access to Route K Bridge` remains `research_later`. Fresh USGS/search-visible evidence showed official `07061500` latest values only through `2026-05-22`, while third-party current snippets were not enough to clear the product-fetch path. The older access/threshold blockers remain.
    - `Roaring River - Roaring River State Park family` was not promoted. USGS `07050152` and MoHERP bands exist, but MoHERP shows zero trip rows and the credible park source found supports Lake Lincoln-style boating/park recreation rather than a practical public river day trip.
  - Net result: 3 Missouri clusters reviewed, 0 routes added, 1 new `threshold_weak` ledger item, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 4:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes are `jacks-fork-river-buck-hollow-rymers`, `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Reviewed fresh Missouri gauge-first leads after the prior Jacks Fork add:
    - `Meramec River - Short Bend Access to Cook Station low-water bridge` was reclassified from `needs_manual_coordinates` to `no_live_gauge`. Fresh official USGS evidence for `07010350` showed current-condition availability ending `2025-10-13`; third-party current snippets are not enough for the app fetch path, and Cook Station endpoint coordinates remain unresolved.
    - `Meramec River - Scott's Ford Access to Riverview Access / Steelville family` remains `threshold_weak`. MDC public-access and route-shape support is still good, but the official USGS `07013000` page opened with latest values from `2026-05-17`, MoHERP opened with cached March 2026 current data, and threshold evidence is still route-family rather than exact-segment.
    - `Big Creek - Highway 143 / Sam A. Baker State Park family` remains `no_live_gauge`. Modern USGS for `07037300` now reports no continuous data and no monitoring locations with continuous data in the last 120 days.
    - `Current River - Akers Ferry to Pulltite` remains `blocked_until_date`. NPS says Pulltite Ranger Station is closed for the 2026 season due to flood damage; showers/restrooms expected later do not independently confirm the take-out/access complex is clean enough to ship.
  - Net result: 4 Missouri candidates reviewed, 0 routes added, 1 status downgrade to `no_live_gauge`, no app code changes, and no npm validation run.

- 2026-05-26: Missouri implementation pass at 4:40 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Existing Missouri routes remained `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; none were duplicated.
  - Added `Jacks Fork River - Buck Hollow / Highway 17 Bridge to Rymers` as `jacks-fork-river-buck-hollow-rymers`.
  - Qualification path: NPS names Highway 17 / Buck Hollow to Rymers as a standard Jacks Fork float and lists both as park river access points; the NPS brochure gives access directions and river-mile context; USGS `07065200` Mountain View showed same-day May 26 discharge and gage-height observations; Rivers.MOHERP has Mountain View gauge ratings plus Buck Hollow-to-Rymers trip rows; Southwest Paddler and Paddling.com supplied endpoint coordinates; MDC supports the upper-Jacks seasonal/remoteness framing.
  - Threshold model: `minimum-only` at 100 cfs on USGS `07065200`. This is intentionally conservative and does not claim an ideal range or upper cutoff because the numeric guidance is community-calibrated rather than official manager-published bands.
  - Remaining caveats: upper Jacks Fork is seasonal and remote, current review value was below the floor, low water can require dragging/poling/lining, storms can raise the narrow valley quickly, route has Class I-II moving-water character and is marked `routeType: 'whitewater'`, coordinates are from paddling-location guides rather than an NPS coordinate table, and no rights-clean exact-route image was selected.
  - Validation: `npm.cmd run typecheck` passed. `npm.cmd test` reran typecheck successfully, then failed when Vitest/esbuild could not read `../../..` and could not resolve `vitest.config.ts` from the sandbox. `npm.cmd run build` reran typecheck successfully, then failed on the same sandbox read restriction plus dependency-resolution errors for `aria-query` / `axobject-query`. `git diff --check` passed with line-ending warnings only. Ledger JSON parsed successfully after stripping the existing UTF-8 BOM.

- 2026-05-26: South Dakota no-add pass at 3:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Ran a fresh South-Dakota-first gauge/search pass after the 3:25 PM no-add run. Results repeated existing evidence rather than producing a new route-ready package:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP still supports Big Sioux Recreation Area canoeing/kayaking and the Jay Heath corridor, but exact north/south canoe-access coordinates remain unresolved and the 300 cfs Cliff Ave floor is still local proxy guidance rather than a route-specific manager band.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. GFP official corridor mapping is strong, but new searches only repeated broad corridor/access support and generic Big Sioux 250 cfs guidance already used for the implemented Sioux Falls route.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. No stronger AW or public threshold source surfaced beyond the prior low-flow text around 47-50 cfs.
    - `Missouri National Recreational River day-trip segments`, `Vermillion River - Centerville / Wakonda to Missouri River family`, and `James River - South Dakota highway-access family` remain `research_later` because the evidence is still corridor-level rather than exact endpoint-plus-threshold support.
  - Net result: 6 South Dakota candidates re-reviewed, 0 promotions, 0 routes added. This pass changed only docs/ledger/memory, so no npm validation was required.

- 2026-05-26: Missouri no-add pass at 3:47 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed the upper Jacks Fork / Mountain View gauge cluster after the USGS `07065200` legacy current-conditions page exposed same-day May 26 discharge and gage-height observations. `Jacks Fork River - Buck Hollow / Highway 17 Bridge to Rymers` was added to the ledger as `needs_manual_coordinates`: NPS supports the Highway 17-to-Rymers route, MoHERP has route-specific Buck Hollow-to-Rymers Mountain View gauge rows, and a conservative future model could use a 100 cfs minimum-only floor with seasonal, low-water, and Class I-II cautions.
  - No route was added because endpoint coordinates for Buck Hollow / Highway 17 Bridge and Rymers were not source-captured, and MoHERP threshold support is community trip evidence rather than official manager-published bands.
  - Reclassified `Jacks Fork - Bay Creek to Alley Spring` from `no_live_gauge` to `gauge_proxy_weak`: Mountain View is now live but remains a weaker upstream proxy for that lower reach, while the direct Alley Spring gauge evidence is still stale.
  - Net result: 2 Jacks Fork candidates reviewed, 0 routes added, 1 promoted to `needs_manual_coordinates`, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 3:35 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the closest direct-gauge Missouri leads plus one whitewater/live-path candidate:
    - `Meramec River - Short Bend Access to Cook Station low-water bridge` remains `needs_manual_coordinates`. Cook Station access coordinates are still unresolved, and fresh search-visible Cook Station evidence still did not expose same-day product-ready USGS values.
    - `Jacks Fork - Alley Spring to Eminence` remains `no_live_gauge`. NPS route support and MoHERP threshold support remain strong, but fresh MoHERP visible evidence topped out at May 25, 2026 rather than same-day May 26 current data.
    - `Beaver Creek - Brownbranch to Bradleyville` remains `no_live_gauge`. MDC and MoHERP route evidence remain promising, but official/search-visible evidence still did not expose same-day current discharge or gage-height values.
    - `Big Piney River - Sand Shoals / Sandy Shoals Ford to Boiling Spring Access` remains `no_live_gauge`. The route-specific MDC/MoHERP package remains promising, but USGS `06930000` still lacks a reliable current continuous-data path.
    - `Bourbeuse River - Reiker Ford Access to Mayers Landing Access / Union Access family` remains `research_later`. MDC still has a current Mayers Landing main-channel access limitation, and USGS `07016500` official current-condition evidence appears stale/discontinued around October 2025.
    - `St. Francis River - Millstream Gardens to Silver Mines` remains `no_live_gauge`. AW/MWA route and threshold evidence are strong, but the current product cannot ingest the USACE/NOAA Roselle/D-bridge live path, and AW's USGS gauge detail remains stale.
  - Net result: 6 Missouri candidates re-reviewed, 0 routes added, 0 promotions, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 3:24 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the same strongest deferred direct-gauge Missouri leads because they remain closest to addable:
    - `Meramec River - Short Bend Access to Cook Station low-water bridge` remains `needs_manual_coordinates`. The route/access/threshold source stack remains promising, but Cook Station low-water bridge coordinates are still not source-confirmed and fresh search-visible USGS/MoHERP evidence still did not show same-day product-ready data.
    - `Jacks Fork - Alley Spring to Eminence` remains `no_live_gauge`. NPS route support and MoHERP threshold support remain strong, but the fresh search-visible MoHERP snippet topped out at `2026-05-22`, and third-party summaries were older rather than same-day product-ready USGS data.
    - `Beaver Creek - Brownbranch to Bradleyville` remains `no_live_gauge`. MDC and MoHERP route evidence remain promising, but fresh official/search-visible evidence still did not expose same-day current discharge or gage-height values through a product-ready path.
  - Net result: 3 Missouri candidates re-reviewed, 0 routes added, 0 promotions, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 3:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes remain `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the priority South Dakota leads after the prior 2:55 PM no-add pass:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` remains `gauge_proxy_weak`. GFP still confirms Big Sioux Recreation Area canoeing/kayaking and the Jay Heath PDF still lists the 2.4-mile north-to-south segment; the GFP/SDCKA dedication notice gives the north access address at 300 West Holly Blvd. and says parking is available there, but exact official coordinates for both north and south canoe access sites are still not captured. The threshold story remains local proxy support from the Cliff Ave gauge rather than route-specific manager-published bands.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` remains `threshold_weak`. Official GFP trail mapping and access spacing are strong corridor evidence, but no additional segment beyond the implemented Sioux Falls route has a clean exact-segment threshold model.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` remains `threshold_weak`. American Whitewater still confirms the Spearfish town section and direct `USGS 06431500` gauge, but the available threshold text remains too thin for V2 scoring: about 47 cfs below recommended and 50 cfs as a bang-down level, not a stable recommended floor or range.
    - `Missouri National Recreational River day-trip segments` remains `research_later`. NPS and SDCKA support the corridor and mapping effort, but current official material still emphasizes access inventory and big-river/dam-release/wind/current caveats rather than a route-specific gauge threshold model.
  - Net result: 4 South Dakota candidates re-reviewed, 0 promotions, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 3:45 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the strongest deferred direct-gauge Missouri leads:
    - `Meramec River - Short Bend Access to Cook Station low-water bridge` remains `needs_manual_coordinates`. MDC confirms Short Bend Access, Missouri DNR confirms the Cook Station USGS gauge is near-real-time and useful to recreational users, and MoHERP exposes a numeric Cook Station ladder, but Cook Station access coordinates are still not source-confirmed and direct USGS Water Services fetch for `07010350` failed from the automation runtime.
    - `Jacks Fork - Alley Spring to Eminence` remains `no_live_gauge`. NPS route support and MoHERP threshold support remain strong, but direct USGS Water Services fetch for `07065495` failed from the automation runtime.
    - `Beaver Creek - Brownbranch to Bradleyville` remains `no_live_gauge`. MDC and MoHERP route evidence remain promising, but direct USGS Water Services fetch for `07054080` failed from the automation runtime.
  - Net result: 3 Missouri candidates re-reviewed, 0 routes added, 0 promotions, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 3:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed a fresh upper Meramec / Cook Station gauge cluster:
    - `Meramec River - Short Bend Access to Cook Station low-water bridge` -> `needs_manual_coordinates`. MDC confirms Short Bend Access as public Meramec River access and allows boats/canoes/kayaks on department waters, FloatMissouri's MDC-derived mile-by-mile guide lists Short Bend Access as good canoe/kayak access at river mile 0.9 and Cook Station low-water bridge access at river mile 8.7, Missouri DNR confirms USGS `07010350` at Cook Station is a near-real-time stage/streamflow gauge used by recreational users, and MoHERP exposes a numeric Cook Station threshold ladder with Poor below 26 cfs, Low at 55 cfs, Good at 136 cfs, High at 242 cfs, and Flood at 553 cfs.
    - The route was not added because Cook Station low-water bridge coordinates were not source-confirmed, MoHERP's latest visible Cook Station condition was stale during this run, and the automation shell could not connect to USGS Water Services to prove the app's product-fetch path today. RiverApp/search-visible evidence suggested same-day imported values, but that was not enough for a conservative implementation.
  - Net result: 1 Missouri candidate reviewed, 0 routes added, 1 promoted to `needs_manual_coordinates`, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 2:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes are `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Rechecked Big Sioux / Jay Heath leads, Spearfish Creek, and Missouri National Recreational River:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` -> remains `gauge_proxy_weak`. GFP/PDF/news evidence gives the official 2.4-mile route shape, Big Sioux Recreation Area is public and supports canoeing/kayaking, USGS `06482020` is the obvious nearby Big Sioux gauge, and Sioux Empire Paddlers lists the Cliff Ave gauge as ideal above 300 cfs. The route was not added because exact north/south canoe-access coordinates are still not source-captured and the threshold remains local proxy guidance rather than route-specific manager-published bands.
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` -> remains `threshold_weak`. GFP official trail/access mapping and the current Jay Heath PDF support named access spacing, but additional segments are still corridor-level rather than route-ready threshold packages.
    - `Spearfish Creek - City Park to Evans Park / Old US 14` -> remains `threshold_weak`. American Whitewater confirms the Class II town section and direct `USGS 06431500` gauge, but the visible route text still only supports low-flow context around 47-50 cfs and the AW gauge-detail page remains stale, so no stable numeric range cleared the V2 threshold gate.
    - `Missouri National Recreational River day-trip segments` -> remains `research_later`. NPS supports the water-trail corridor and access inventory, but current official guidance emphasizes sparse launches, Fort Randall/Gavins Point release dependence, 3-5 mph current, big-water wind, snags, shifting channels, and no route-specific threshold model.
  - Net result: 4 South Dakota candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 2:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh central-Missouri gauge clusters:
    - `South Grand River - Settles Ford / Urich / Truman Reservoir access family` -> `research_later`. MDC and Missouri DNR confirm a real South Grand River watershed with active USGS gauge support at Archie/Urich/Clinton-area stations, but this pass did not find one manager-published paddling day-trip endpoint pair or numeric route-specific paddling threshold support. The South Grand watershed also has water-quality/mining-impairment caveats that would need practical route framing.
    - `Moreau River - Jefferson City / Moreau 50 Access family` -> `threshold_weak`. MDC confirms Moreau 50 Access as public Moreau River access with a boat ramp, and the Moreau River has a direct USGS near-Jefferson-City gauge with current values visible through RiverApp/search. The route was not added because no source-backed public put-in/take-out pair and no credible numeric paddling floor or range cleared the V2 threshold gate.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 2:44 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Sac River / Caplinger Mills and Little Piney Creek / Newburg gauge clusters:
    - `Sac River - Highway 32 bridge below Stockton Reservoir to Caplinger Mill Park Access` -> `no_live_gauge`. Float Missouri / A Paddler's Guide route-family evidence and MoHERP Caplinger Mills bands are promising, but visible MoHERP/USGS current evidence was stale relative to May 26, 2026, the shell could not reach USGS Water Services, and the reach needs release-aware Stockton Dam caveats before any future implementation.
    - `Little Piney Creek - Lane Spring Recreation Area / Milldam Hollow / Vida access family` -> `research_later`. USFS and MDC confirm Little Piney access context, and USGS `06932000` is the obvious same-stream gauge lead, but the evidence found today supports trout fishing, wading, tubing, and creek access more than one manager-published paddling day-trip reach with numeric threshold support.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 2:34 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the lower Pomme de Terre / Hermitage release-gauge lead:
    - `Pomme de Terre River - Hermitage Access to Cross Timbers Access` -> remains `no_live_gauge`.
    - MDC still confirms Cross Timbers Access as public Pomme de Terre River access, prior USACE/public-route evidence still supports the lower-river route family and 100-800 cfs release window, and NOAA/MBRFC surfaced a May 25, 2026 Hermitage value. The route was not added because same-day May 26 product-fetchable USGS current observations were still not verified, and the route remains release-influenced rather than a clean everyday threshold model.
  - Net result: 1 Missouri candidate re-reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 2:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes are `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Reviewed a fresh Big Sioux / Jay Heath sub-segment lead:
    - `Big Sioux River - Big Sioux Recreation Area North access to South access` -> `gauge_proxy_weak`.
    - GFP/SDCKA news names an official 2.4-mile Big Sioux Recreation Area north-to-south Jay Heath Trail Cruise, GFP confirms the park supports canoeing/kayaking, USGS `06482020` North Cliff Ave showed same-day May 26 discharge and gage-height values, and Sioux Empire Paddlers lists the Cliff Ave Big Sioux gauge as ideal above 300 cfs. The route was not added because exact official coordinates for both canoe access sites were not captured and the Cliff Ave threshold/gauge fit remains local proxy evidence rather than route-specific manager-published paddling bands.
  - Net result: 1 South Dakota candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 3:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed a fresh Finley River / Riverdale gauge cluster. MoHERP has substantial Riverdale-gauge trip evidence, including Lindenlure-to-Ozark, Johns-Ford-to-Reed-Road, and Reed-Road/Finley-River-Park local rows with Good reports around 198 to 532 cfs and Low/Poor rows below that. MDC confirms the Finley is a real canoeable spring/high-water stream, and Ozark's active transportation planning lists current Linden and Finley River Park access concepts plus planned Riverside/OC access context. The route was not added because the official USGS `07052345` text view did not expose same-day observations in the browser output, and no manager-published exact public day-trip endpoint pair with coordinates cleared the access gate.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 3:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked `Jacks Fork - Alley Spring to Eminence` as the cleanest fresh Missouri gauge-first lead. NPS names Alley Spring to Eminence as the popular summer Jacks Fork float and gives a 4-hour estimate. MoHERP has a stronger threshold package than previously recorded: Alley Spring gauge bands show Good from 100 to 360 cfs, High around 637 cfs, Flood around 1430 cfs, and exact Alley-to-Eminence Good trip rows exist at 57 and 107 cfs. The route was not added because the official USGS `07065495` current-conditions page opened during this May 26 run with most recent discharge and gage-height observations from May 25, 2026 at 22:30 CDT, not same-day May 26 data; the modern USGS page also showed a May 26 WDFN maintenance notice without current observations in the text view. Ledger status was changed from `threshold_weak` to `no_live_gauge`.
  - Rechecked `Flat Creek - McDowell Low Water Bridge to Stubblefield Access` only as a backup lead. The direct Flat Creek gauge and community range remain promising, and MDC Stubblefield Access is strong, but McDowell Low Water Bridge still lacks a manager-published or similarly strong public put-in source, so it remains `research_later`.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 2:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed a fresh upper Meramec / Steelville public-access lead:
    - `Meramec River - Scott's Ford Access to Riverview Access` -> remains covered by the broader `mo-meramec-river-steelville-scotts-ford-indian-springs-family` ledger item at `threshold_weak`.
    - MDC confirms both Scott's Ford Access and Riverview Access as public Meramec River accesses, and MDC's St. Louis Region southern small river accesses plan says Scott's Ford Access to Riverview Access is a 7-mile canoe float. USGS search-visible evidence for `07013000` surfaced May 26 data, but opening the official USGS current-conditions page during this run showed stale May 22 values; MoHERP has useful nearby Steelville-gauge trip rows but not an exact Scott's-Ford-to-Riverview row or a manager-published route-specific floor. The route was not added.
  - Rechecked `Meramec River - Onondaga Cave State Park to Campbell Bridge / Blue Springs Creek / Sappington Bridge family` while reviewing the Meramec corridor. Missouri State Parks confirms Onondaga river access, MDC confirms Campbell Bridge and Sappington public access context, and the route shape is real, but the Sullivan gauge page opened with May 24 values during this May 26 run and the route overlaps the already implemented Sappington-to-State-Park gauge family without a cleaner same-day live-data story. It was not promoted.
  - Net result: 2 Missouri Meramec-family candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 1:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes are `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the priority South Dakota clusters:
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail day-trip segments` -> remains `threshold_weak`. GFP official trail/access mapping and the Jay Heath PDF still support the corridor and access spacing, but no route-specific numeric threshold package appeared for a new segment beyond the already-implemented Farm Field-to-Rotary route.
    - `Missouri National Recreational River day-trip segments` -> remains `research_later`. The NPS/SDCKA Fort Randall-to-Sioux City mapping work remains promising, but the evidence is still a corridor inventory rather than a named day route with a gauge model, dam-release caveats, and wind exposure handling.
    - `Spearfish Creek - City Park to Evans Park` -> remains `threshold_weak`. American Whitewater search-visible route text now surfaces the Spearfish town section with about 47 cfs below recommended and notes 50 cfs can be banged down, but the AW gauge-detail page still exposes stale readings and no stable numeric runnable floor/range suitable for PaddleTodayV2 scoring.
    - `Rapid Creek - Heisga to Dark Canyon` and `Whitewood Creek - Highway 14A to Whitewood / Vale gauge family` -> remain `research_later`; fresh searches did not resolve public endpoint, access, water-quality, or route-specific threshold blockers.
  - Net result: 5 South Dakota candidates re-reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 1:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked `Current River - Akers Ferry to Pulltite` after fresh NPS search. It remains `blocked_until_date`: NPS still lists Pulltite Campground as closed after November 2024 flood damage, and 2026 basic-information text says Pulltite Ranger Station is closed for the 2026 season due to flood damage. The route/gauge/threshold story remains strong, but the Pulltite take-out/access status is not clean enough for a conservative implementation.
  - Reviewed fresh `Cedar Creek - Mark Twain National Forest / Fulton-area float family` via the Pleasant View gauge cluster. USGS `06919500` showed same-day May 26 discharge and stage, but the route was parked at `research_later` because Missouri-specific endpoint support did not clear the bar: MoHERP has no trip rows for the gauge, AllTrails is not enough endpoint authority, and MDC's lower Cedar Creek Capitol View Access news says that access is closed and had only limited walk-in canoe access before closure. Search also produced strong Cedar Creek paddle-access evidence in Wisconsin, which is unrelated and should not be conflated with Missouri Cedar Creek.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 1:45 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked fresh/current gauge evidence for recently deferred Missouri leads:
    - `Big Piney River - Sand Shoals / Sandy Shoals Ford to Boiling Spring Access` -> remains `no_live_gauge`. The route/access/threshold package remains promising, but the current USGS `06930000` monitoring page now reports no continuous data available and no continuous monitoring locations found in the last 120 days, so the product-ready live path is worse rather than better.
    - `Beaver Creek - Brownbranch to Bradleyville` -> remains `no_live_gauge`. MDC and MoHERP still support the route concept, but the USGS `07054080` legacy current page still shows the latest visible instantaneous discharge and gage-height values from May 12, 2026, not same-day May 26.
    - `Huzzah Creek - Huzzah Conservation Area to Meramec River` -> remains `research_later`. Search surfaced the same lower-Huzzah route/gauge evidence, but MoHERP visible current evidence was from April 24, 2026, the route still ends at an unnamed Meramec River landing, and no clean public take-out/access package appeared.
  - Net result: 3 Missouri candidates re-reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 1:35 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed a stronger route-specific Big Piney / USGS `06930000` lead:
    - `Big Piney River - Sand Shoals / Sandy Shoals Ford to Boiling Spring Access` -> `no_live_gauge`.
    - MDC's 2024 paddling article names Sandy Shoals Ford to Boiling Springs as a little-over-6-mile day trip, MDC confirms Boiling Spring Access as public Big Piney River access with a boat ramp and picnic area, and Rivers.MOHERP has exact Sand/Sandy Shoals-to-Boiling Spring trip rows tied to `USGS 06930000`, including Good reports at 125 cfs / 2.42 ft and 486 cfs / 3.35 ft. The route was not added because same-day product-fetchable gauge data could not be verified: the automation shell could not connect to USGS Water Services or the legacy USGS page, and search-visible USGS current-condition evidence still topped out around May 23, 2026.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 1:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Rechecked prior Missouri gauge clusters rather than creating duplicate candidates:
    - `Big Piney River - East Gate to Bookers Bend / Slabtown-to-Ross family` -> remains `threshold_weak`. Forest Service and MDC support public access and route shape, and MoHERP has useful Big Piney trip rows, but no official or route-specific numeric ladder cleared the bar. The USGS `06930000` legacy page also showed latest visible values from May 24, 2026, not same-day May 26.
    - `Niangua River - Bennett Spring Access to Barclay Conservation Area Access` -> remains `gauge_proxy_weak`. MDC access support and MoHERP trip rows remain useful, but Windyville is upstream of Bennett Spring, and the USGS `06923250` legacy page showed latest visible values from May 25, 2026, not same-day May 26.
  - Net result: 2 Missouri candidates re-reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 1:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes are `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the strongest Black Hills threshold lead:
    - `Spearfish Creek - City Park to Evans Park` -> remains `threshold_weak`.
    - American Whitewater identifies the Spearfish town section as a Class II reach with the `USGS 06431500` Spearfish gauge, and City of Spearfish confirms Evans Park creek access. The route was not added because AW's gauge-detail page is stale and this pass still did not find a stable route-specific numeric paddling floor or range tied to the gauge.
  - Reviewed fresh prairie-river clusters:
    - `Vermillion River - Centerville / Wakonda to Missouri River family` -> `research_later`.
    - `James River - South Dakota highway-access family` -> `research_later`.
    - Sioux Empire Paddlers supports both as real South Dakota paddling corridors and USGS has obvious gauge families, but neither produced one clean public endpoint pair with route-specific numeric threshold support. The Vermillion evidence is broad seasonal/access-at-road-crossings guidance, and the James evidence remains broad spring/early-summer corridor guidance on a slow, sometimes no-flow prairie river.
  - Net result: 3 South Dakota candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 1:15 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh St. Francis River / Roselle and D-bridge gauge cluster:
    - `St. Francis River - Millstream Gardens to Silver Mines` -> `no_live_gauge`.
    - American Whitewater and Missouri Whitewater Association support the lower St. Francis as a real 2.3-mile Class II-III whitewater run from Millstream Gardens to Silver Mines, with route-specific Roselle/D-bridge level guidance, and MDC/USFS confirm the public land/access context. The route was not added because the current product-ready live-data path is not clean: American Whitewater's gauge detail for `USGS 07034000` appeared stale, public whitewater guidance also points to USACE/NOAA Roselle/D-bridge context, and the automation shell could not fetch USGS Water Services for `07034000`.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 1:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh upper Current River / Akers gauge cluster:
    - `Current River - Akers Ferry to Pulltite` -> `blocked_until_date`.
    - NPS supports Akers to Pulltite as a standard Upper Current day float, USGS `07064533` is the direct Akers gauge, and MoHERP has extensive Akers-gauge trip evidence including exact Akers-to-Pulltite Good reports. The route was not added because NPS currently says Pulltite Campground is closed for an unknown period after extreme flooding in November 2024, and the take-out/access/parking status is not clean enough for a conservative public route implementation.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 12:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Salt River / Center-New London gauge cluster:
    - `Salt River - See Spillway to Cincinnati Road` -> `no_live_gauge`.
    - MoHERP has exact 7.0-mile See Spillway-to-Cincinnati Road trip rows tied to `USGS 05507800`, and A Paddler's Guide/MDC sources support real Salt River access context. The route was not added because MoHERP's visible Center gauge page showed latest data from 2025-04-13 rather than same-day May 26, 2026, and the public route/access package is release-influenced rather than a clean everyday public day-trip threshold model.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 12:55 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live South Dakota routes are `split-rock-creek-split-rock-park-palisades`, `big-sioux-river-farm-field-rotary`, and `skunk-creek-legacy-park-farm-field`; all have matching `added` ledger records and were not duplicated.
  - Rechecked Jay Heath / Big Sioux corridor with a narrower Lien Park-to-Big Sioux-Recreation-Area lens:
    - `Big Sioux River - Lien Park to Big Sioux Recreation Area / Jay Heath segment family` -> `threshold_weak`.
    - GFP official Jay Heath map support remains strong, with mapped access spacing including Lien Park to Big Sioux Recreation Area North at 8.8 miles, and Sioux Empire Paddlers favors the broader Lien Park-to-Newton Hills stretch with 250 cfs and up at the Sioux Falls gauge. The route was not added because the threshold support is corridor-level rather than exact-segment guidance, and the broader corridor carries low-head-dam, rock-crossing, urban water-quality, and endpoint/gauge-fit caveats that are not clean enough for a second Big Sioux route today.
  - Rechecked Missouri National Recreational River / SDCKA mapping context:
    - `Missouri National Recreational River day-trip segments` -> `research_later`.
    - SDCKA describes an NPS-led 2026-2027 Fort Randall Dam-to-Sioux City water-trail mapping project with more than 40 locations to inventory, but the current evidence remains an in-progress corridor inventory rather than a route-specific day-trip package with gauge thresholds and dam-release/wind caveats suitable for V2.
  - Net result: 2 South Dakota candidates re-reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 12:46 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, `bryant-creek-sycamore-warren-bridge`, and `james-river-shelvin-rock-hooten-town`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh upper Jacks Fork / Mountain View gauge cluster:
    - `Jacks Fork River - Bay Creek to Alley Spring` -> `no_live_gauge`.
    - NPS supports Bay Creek to Alley as a standard 4-hour Jacks Fork section, MoHERP has Mountain View gauge ratings and route-family trip evidence, and local outfitters describe Bay Creek-to-Alley as a normal 7-mile trip when depth permits. The route was not added because USGS `07065200` showed latest visible discharge and gage-height values from May 25, 2026 during this May 26 run, not same-day current data.
  - Reviewed fresh lower Meramec / Eureka gauge cluster:
    - `Meramec River - Pacific Palisades Access to Allenton Access` -> `threshold_weak`.
    - MDC gives an unusually clean public route shape by saying Allenton is 6.90 river miles downriver from Pacific Palisades, but MoHERP's Eureka gauge page currently has no evaluative discharge thresholds or trip rows, and USGS `07019000` latest visible values were May 25 rather than same-day May 26 in the browser view.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 12:25 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh lower Pomme de Terre / Hermitage release-gauge cluster:
    - `Pomme de Terre River - Hermitage Access to Cross Timbers Access` -> `no_live_gauge`.
    - USACE and public Missouri route sources support a real lower-Pomme route family, MDC confirms Cross Timbers Access as a public Pomme de Terre ramp with parking, and USACE gives 100-800 cfs as the optimal release window. The route was not added because same-day live data could not be verified: MoHERP showed the Hermitage gauge latest visible update from May 24, 2026 during this May 26 run, the USGS WDFN browser view exposed station metadata rather than current readings, and the automation shell could not reach USGS Water Services.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

## Added

- 2026-05-26: `James River - Shelvin Rock Access to Hooten Town Access`
  - Added to PaddleTodayV2 as `james-river-shelvin-rock-hooten-town`.
  - Reconciliation result: existing Missouri routes `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge` were already live with matching `added` ledger records, so none were duplicated.
  - Qualification path: MDC confirms Shelvin Rock and Hooten Town as public James River day-use accesses with boat ramps and parking; Rivers.MOHERP names exact Shelvin Rock-to-Hootentown 6.2-mile trip rows tied to `USGS 07052500`; the May 26 12:35 PM recheck found current Galena values on MoHERP after earlier stale-data blockers; and USGS `07052500` (`James River at Galena, MO`) is a standard product-ready live gauge.
  - Threshold model: conservative `minimum-only` at 200 cfs on the Galena gauge. No ideal range or upper cutoff was claimed because the level support is community trip evidence rather than an official manager-published paddling band.
  - Remaining caveats: endpoint coordinates remain practical public-location anchors paired with MDC access confirmation, both MDC endpoints are day-use/no-camping areas, low water can mean dragging and slow pools, high/rising water and fresh wood deserve extra caution, summer traffic can be heavy, and private banks away from public/legal stops should be respected.
  - Route-gallery result: no rights-clean exact-route asset was selected.

- 2026-05-26: `Skunk Creek - Legacy Park to Farm Field Park`
  - Added to PaddleTodayV2 as `skunk-creek-legacy-park-farm-field`.
  - Reconciliation result: `Big Sioux River - Farm Field Park to Rotary Park` and `Split Rock Creek - Split Rock Park to Palisades State Park` were already live with matching `added` ledger records, so neither was duplicated. The prior Skunk Creek candidate had been parked at `no_live_gauge`, but this run found same-day USGS values and promoted it instead of creating a new candidate.
  - Qualification path: City of Sioux Falls confirms Legacy Park and Farm Field Park as public park accesses with boat/canoe/kayak access and coordinates; Sioux Empire Paddlers names the Legacy Park-to-Farm Field segment as 5 miles and gives a 4.5 ft good-paddling floor tied to the Skunk Creek Sioux Falls flow link; USGS `06481500` (`Skunk Creek at Sioux Falls, SD`) showed same-day May 26, 2026 values during review: 35.8 cfs and 2.96 ft at 11:30 CDT.
  - Threshold model: conservative `minimum-only` at 4.5 ft. No ideal range or upper cutoff was claimed because the level support is local-community guidance rather than an official manager-published paddling band.
  - Remaining caveats: the current May 26 reading was below the app floor, so the route may be too shallow today; urban Skunk Creek water quality, E. coli monitoring May through September, worse water after rain, shallow scraping below 4.5 ft, storm debris, bridge approaches, Big Sioux continuation hazards below Farm Field, and possible fences or unexpected obstructions on South Dakota navigable streams.
  - Route-gallery result: no rights-clean exact-route asset was selected.

- 2026-05-26: `Big Sioux River - Farm Field Park to Rotary Park`
  - Added to PaddleTodayV2 as `big-sioux-river-farm-field-rotary`.
  - Reconciliation result: `Split Rock Creek - Split Rock Park to Palisades State Park` was already live as `split-rock-creek-split-rock-park-palisades` with a matching ledger record, so it was not duplicated. The broad `Big Sioux River - Jay Heath Canoe and Kayak Trail` corridor remained too broad for app segmentation, but this shorter in-town Farm Field-to-Rotary segment cleared the bar.
  - Qualification path: City of Sioux Falls confirms Farm Field Park and Rotary Park as public kayak/canoe accesses with coordinates and posted park hours; Sioux Empire Paddlers names Farm Field-to-Rotary as a 4.15-mile Big Sioux in-town segment and gives a 250 cfs good-paddling floor tied to the Big Sioux River Sioux Falls flow link; USGS `06482000` (`Big Sioux River at Sioux Falls, SD`) is a direct product-ready gauge at the put-in corridor.
  - Threshold model: conservative `minimum-only` at 250 cfs. No ideal range or upper cutoff was claimed because the level support is local-community guidance rather than an official manager-published paddling band.
  - Remaining caveats: urban Big Sioux water quality, E. coli monitoring May through September, worse water after rain, shallow scraping below the 250 cfs floor, storm debris, bridge approaches, downstream downtown/falls/low-head-dam hazards if users continue past Rotary, and possible fences or unexpected obstructions on South Dakota navigable streams.
  - Route-gallery result: no rights-clean exact-route asset was selected.

- 2026-05-26: South Dakota no-add pass at 11:55 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. `Big Sioux River - Farm Field Park to Rotary Park` and `Split Rock Creek - Split Rock Park to Palisades State Park` are already live with matching `added` ledger records, so neither was duplicated.
  - Reviewed fresh Skunk Creek / Sioux Falls gauge cluster:
    - `Skunk Creek - Legacy Park to Farm Field Park` -> `no_live_gauge`.
    - Sioux Empire Paddlers gives a route-specific 5-mile Legacy Park-to-Farm Field segment and a 4.5 ft good-paddling floor tied to the Skunk Creek Sioux Falls gauge. City of Sioux Falls confirms both Legacy Park and Farm Field Park as public canoe/kayak access parks with coordinates. The blocker is live-data freshness: USGS `06481500` showed latest visible instantaneous discharge and gage height from May 15, 2026, not same-day May 26 current data.
  - Net result: 1 South Dakota candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-04-27: `Otter Tail River - Wannigan Road to Riverside Park`
  - Added to PaddleTodayV2 as a conservative proxy-gauge route with official MN DNR route support, official public-water-access records for both endpoints, and official MN DNR interpretation bands on downstream `MN DNR 344` (`Otter Tail River nr Battle Lake, CR72`).
  - Recheck that changed the outcome: the route was previously parked under `no_live_gauge` when DNR-only live feeds were treated as blocked. The current app supports MN DNR gauges, so the remaining question became gauge fit rather than gauge availability.
  - Remaining caveat: threshold confidence is intentionally lower than a direct-gauge route because the Battle Lake gauge sits downstream of the Frazee-area day trip. The app uses a minimum-only floor and keeps route notes explicit about late-spring water, shallow main-channel picking, rock weirs, faster water near Riverside Park, and the low utility pipe past the take-out.

- 2026-04-27: `Big Fork River - Highway 6 South to Highway 6 North`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on direct `MN DNR 281`.
  - Recheck that changed the outcome: the route was previously parked under `no_live_gauge` when DNR-only live feeds were treated as blocked, but the current app supports MN DNR gauges. MN DNR explicitly recommends this 15.7-mile route, public-water-access data resolves both Highway 6 endpoints with access IDs `WAS01794` and `WAS01792`, and the Craigsville/Highway 6 gauge sits at the put-in river mile.
  - Remaining caveat: this is a remote long-day or overnight route; DNR's general Big Fork low-water warning also references the upstream Highway 38 / Bigfork gauge, so the route notes preserve that supplemental caution while scoring from the closer Craigsville gauge.

- 2026-04-26: `North Fork Crow River - Rockford Access to Riverside County Park`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on direct `MN DNR 310`.
  - Supplemental research added: MN DNR's Rockford Access guide names this exact 8.5-mile day trip, the Minnesota public-water-access layer confirms both endpoints with access IDs `WAS03086` and `WAS01955`, Wright County confirms Riverside County Park public river access and campsite facilities, and the DNR Riverside Access guide adds the practical note that the take-out is somewhat steep but launchable for small boats/canoes.
  - Remaining caveat: this uses the same lower North Fork Crow gauge family as the existing Riverside-to-Dayton route; it is useful as a shorter day-trip option, but same-day wood and shallow-gravel checks still matter.

- 2026-04-26: `Cottonwood River - Juenemann Landing to Springfield`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on direct `MN DNR 42`.
  - Supplemental research added: MN DNR Map 4 names Juenemann carry-in access and Springfield carry-in access with river miles, the Minnesota public-water-access layer confirms both endpoints with access IDs `WAS01422` and `WAS01421`, Brown County confirms Jueneman Landing as a county Cottonwood River canoe landing with parking and seasonal day-use, and the DNR Cottonwood page supports the general beginner-friendly no-major-rapids character.
  - Remaining caveat: this exact 6.4-mile segment is map/access-supported rather than highlighted by DNR as a recommended day trip, so notes keep it framed as a compact local level-first route.

- 2026-04-26: `Long Prairie River - Long Prairie to Browerville`
  - Added to PaddleTodayV2 with an official-source-backed `two-sided` model on direct `MN DNR site 89` (`Long Prairie River at Long Prairie, MN`).
  - Qualification path was clean: MN DNR directly recommends the exact 13.3-mile day trip, the city access names were resolved in the MN DNR public-water-access GIS, and the current product already supports this DNR gauge path with the current-level fallback panel when chart samples are unavailable.
  - Remaining caveat: chart history is still not available from the DNR feed path, so users get a current reading plus official DNR interpretation rather than a recent trend line.

- 2026-04-26: `Pomme de Terre River - Larson Landing to Appleton`
  - Added to PaddleTodayV2 with an official-source-backed `two-sided` model on direct `MN DNR site 168` (`Pomme De Terre River at Appleton, MN`).
  - Recheck that changed the outcome: earlier passes incorrectly treated the route as blocked by live-data plumbing, but the current codebase already supports `provider: 'mn_dnr'` through `src/lib/mn-dnr.ts` and the river detail page explicitly falls back to a working current-level panel when DNR does not provide recent chart samples.
  - Remaining caveat: chart history is still not available from the DNR feed path, so users get a current reading plus official DNR interpretation rather than a recent trend line.

- 2026-04-26: `Minnesota River - Franklin City Park to Mack Lake Park`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on `MN DNR 107` and `USGS 05316580` as fallback source.
  - Supplemental research added: MN DNR Map 4 recommends this exact 10.1-mile trip, names Franklin and Mack Lake as trailer accesses with campsite/rest facilities, City of Franklin confirms river-access camping, Renville County confirms Mack Lake park facilities, Explore Minnesota independently confirms the Franklin boat-ramp/campground listing, and the DNR public-water-access layer confirms both endpoints with access IDs `WAS02279` and `WAS02304`.
  - Remaining caveat: the Morton gauge is upstream of Franklin rather than at the put-in, so the route uses a conservative proxy-gauge confidence note.

- 2026-04-26: `North Fork Crow River - Betty T. Mason River Access to Wildlife County Park`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on `MN DNR 308`.
  - Supplemental research added: MN DNR recommends this exact 10.2-mile day trip, Wright County confirms both endpoints as public river accesses, and DNR fisheries guidance supports 500 cfs as fairly easy canoeing context.
  - Remaining caveat: this upper reach is tight and obstruction-prone; the Cokato gauge is strong corridor support, but wood, steep access, and occasional fences still require same-day judgment.

- 2026-04-26: `South Fork Crow River - Rick Johnson Park to Lake Rebecca Park Reserve`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on `MN DNR 51`.
  - Supplemental research added: MN DNR recommends this exact 14.3-mile day trip, the DNR map places the Delano gauge directly on the route corridor, and Three Rivers confirms Crow River carry-in access at Lake Rebecca.
  - Remaining caveat: the route starts on the South Fork and finishes on the North Fork side near the confluence, so the detail page calls out map review and take-out planning.

- 2026-04-26: `Sauk River - Spring Hill County Park to St. Martin`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on `MN DNR 328`.
  - Supplemental research added: Stearns County confirms St. Martin Canoe Access is a one-acre county site retained as access to the Sauk River.
  - Remaining caveat: this is a shorter, cleaner day-route replacement for the old Spring Hill-to-Rockville draft; the St. Martin take-out is a simple carry-in rather than a full-service park landing.

- 2026-04-26: `Crow Wing River - Little White Dog to Cottingham County Park`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on `MN DNR 55` and `USGS 05244000` as a fallback source.
  - Supplemental research added: Wadena County pages confirm Little White Dog and Cottingham as county campground/access sites, and the county canoe-trail map provides address-level context.
  - Remaining caveat: saved access coordinates remain map/access-inventory derived and should defer to on-site signage.

- 2026-04-26: `Whitewater River - Elba to Highway 74`
  - Added to PaddleTodayV2 with official MN DNR river-level bands on `MN DNR 265` and `USGS 05377500` as a fallback source.
  - Supplemental research added: MilesPaddled and Post Bulletin reports support the same Highway 26/Center Street put-in and Highway 74/County Road 30 take-out pattern.
  - Remaining caveat: the route has strong DNR water-trail and level support, but the access points are still less polished roadside-style endpoints without a clean standalone official landing page, and wood/logjam conditions can dominate the gauge call.

- 2026-04-24: `Crow Wing River - Stigman's Mound to Little White Dog carry-in access`
  - Added to PaddleTodayV2 with an official-source-backed `minimum-only` model on direct `USGS 05244000`.
  - Remaining caveat: the Nimrod evidence is strong on the low-water floor, but there is still no published route-specific preferred upper band, so the route stays minimum-only.

- 2026-04-20: `Milwaukee River - Lime Kiln Park to Village Park`
  - Added to PaddleTodayV2 with a route-specific conservative `minimum-only` model on `USGS 04086600`.
  - Remaining caveat: the 260 cfs floor is a route-day recommendable level from MilesPaddled, not a stronger published ladder, so the route stays minimum-only.

- 2026-04-20: `Snake River - County Road 9 carry-in access to Snake Bit Access`
  - Added to PaddleTodayV2 with an official-source-backed `minimum-only` model on `USGS 05338500`.
  - Remaining caveat: Snake Bit is clearly named on the DNR map, but the best exact access anchor today is the nearby official Snake/St. Croix public-water-access record rather than a standalone Snake Bit facility page.

- 2026-04-20: `Cloquet River - Island Lake Dam Carry-in Access to Bachelor Road Access`
  - Added to PaddleTodayV2 with an official-source-backed `minimum-only` model on `USGS 04021960`.
  - Remaining caveat: MN DNR provides a strong low-flow floor and a better May-June release target, but no published upper threshold band for this exact route.

- 2026-04-18: `Iowa River - Sturgis Ferry Park to Hills Access`
  - Added to PaddleTodayV2 with a conservative `minimum-only` model on `USGS 05454500`.
  - Remaining caveat: no official paddling ladder for the Iowa City gauge.

## Likely addable

- None yet beyond what is already in the implementation queue.
- 2026-04-27 07:28 America/Chicago: bounded fresh Minnesota-first sweep produced no new implementation-ready route. Minnesota River Map 5 (Mankato-to-Seven-Mile / Le Sueur-to-Henderson) still reads as broad easy-stretch guidance rather than a cleaner exact recommended day trip than the already-live Mankato and Henderson routes, and the lower Blue Earth / Watonwan confluence corridor still does not beat the existing Rapidan add plus the parked Watonwan research-later hold.
- 2026-04-27 07:40 America/Chicago: conservative no-add pass. Re-read the live V2 inventory, route details, triage memory, and candidate ledger exactly as instructed, then stopped without reopening the same saturated Minnesota River Map 5 and lower Blue Earth / Watonwan clusters from 07:28 because no new evidence path had emerged in the meantime. Per the run rules, there were still no queued `likely_addable` candidates and no fresh new-evidence candidate strong enough to outrank the preserved `needs_manual_coordinates` queue, so this remained a short bounded no-add pass rather than a recycled shortlist review. No candidate statuses changed, no code changed, and `npm test` / `npm run build` were not run because no product files changed.
- 2026-04-27 07:48 America/Chicago: fresh Mississippi headwaters gauge-cluster pass still produced no new implementation-ready route. Segment 1 (`Lake Itasca to Coffee Pot Landing`) and segment 2 (`Cass Lake to Lake Winnibigoshish`) are both real official recommended trips, but this evidence path is now lower-yield for PaddleTodayV2 because the blocker is not route legitimacy; it is live-gauge operability plus lake/open-water complexity. `Lake Itasca to Coffee Pot Landing` was preserved as `no_live_gauge` because the current official page gives only qualitative riffle / vegetation / wave hazard context without a route-operable live gauge model. `Cass Lake to Lake Winnibigoshish` was also preserved as `no_live_gauge` because the official route depends on big-lake transitions and the page explicitly warns that paddling across Cass and Winnibigoshish lakes is not recommended. Fresh-discovery takeaway: future Mississippi work should keep favoring river-only direct-gauge corridors over remaining headwaters/lake-transition recommendation blocks unless a stronger official gauge path appears.
- 2026-04-27 08:08 America/Chicago: bounded Minnesota-first gauge-cluster pass produced no new implementation-ready route, but it did surface one fresh hold worth keeping. `Zumbro River - Zumbro Falls to Hammond` was parked at `threshold_weak` because MN DNR explicitly recommends the exact 7-mile main-stem route, the direct `USGS 05374000` Zumbro Falls gauge is a clean live story, and the map text names `Village Park` at Hammond as the take-out; the blocker is that the best numeric support surfaced on this pass is still neighboring-reach mixed evidence from the longer `Miles Paddled Zumbro River II` run using the same put-in/gauge rather than a clean Hammond-specific ladder. Also logged two cluster outcomes so future runs rotate away faster: the Crow Wing Map 2 / Nimrod family is saturated because `Little White Dog to Cottingham County Park` is already live and the farther-downstream same-gauge subreaches still do not have a defensible threshold carryover, and the Vermilion `Twomile Creek to Eightmile Creek` corridor was not reopened because it is already parked at `research_later` and this pass did not surface any genuinely new official gauge or threshold source.

## Rejected

- 2026-04-20: `Snake River - Rush City Public Access to Bridgeview Park (Pine City)`
  - Old PaddleToday route exists, and the Pine City gauge ladder on `USGS 05338500` is strong.
  - Blocker: official support is strong for nearby Snake routes, but this exact reach still lacks a clean official trust trail naming both endpoints with enough specificity to clear the current bar.
  - Retry only if: MN DNR map/PDF extract, county access map, or city/agency access page clearly names both the Rush City and Bridgeview/Pine City landings for this exact route.

- 2026-04-20: `Root River - Lanesboro to Rushford`
  - Old PaddleToday route exists, but current official Root River materials support adjacent recommended trips instead of this combined corridor.
  - Blocker: the route is not presented as a single official recommended trip, so the access and threshold story would still be a stitched composite.
  - Retry only if: official route or access documentation clearly supports this exact combined segment and provides a defensible gauge story for the corridor.

- 2026-04-20: `Cedar River - Riverwood Landing to State Line Road`
  - Official Cedar River route support and direct `USGS 05457000` gauge support look promising.
  - Blocker: no non-guessy numeric threshold model was found, and the official flow guidance stayed qualitative or seasonal rather than route-calibration-ready.
  - Retry only if: official river-level interpretation or strong same-route numeric evidence supports at least a conservative minimum-only model.

- 2026-04-18: `Cannon River - Cannon Falls to Miesville Ravine County Park`
  - Strong official route support, but thresholding is still too weak.
  - Blocker: only a nearby Welch gauge story exists; porting Welch thresholds upstream would be guesswork.
  - Retry only if: new official or mixed-source evidence establishes a defensible route-specific model for this shorter upstream segment.

- 2026-04-18: `Cannon River - Welch to Highway 61`
  - Blocker: endpoint authority gaps, especially around the Welch / Highway 61 public-access story.
  - Retry only if: official access pages, GIS records, or manager documentation resolve both endpoints cleanly.

- 2026-04-18: `Cannon River - Highway 61 to Bay Point`
  - Blocker: endpoint authority gaps and weak trust trail on public access.
  - Retry only if: official access documentation resolves both endpoints cleanly.

- 2026-04-18: `Chippewa River - Dunnville to Durand`
  - Direct USGS gauge and public-land context exist, but threshold support is still too weak.
  - Retry only if: official or mixed-source evidence supports a defensible low floor or route range without guesswork.

- 2026-04-18: `Apple River - County Highway E to Apple River County Park`
  - Blocker: no usable live-gauge model at current V2 standard.
  - Retry only if: a defensible live USGS pairing or clearly supportable proxy model is found.

- 2026-04-19: `Rum River - Wayside Landing to Milaca City Park`
  - Official route and direct gauge exist.
  - Blocker: no defensible published paddling ladder or same-route numeric evidence tied to `USGS 05284660`.
  - Retry only if: DNR, USGS-adjacent manager guidance, or strong mixed-source numeric evidence supports a route-level low floor or range.

- 2026-04-19: `Sauk River - Spring Hill County Park to Rockville County Park`
  - Official endpoints exist.
  - Blocker: only a looser downstream same-river gauge story for a long upstream reach.
  - Retry only if: a defensible direct or near-direct threshold model is found for this exact corridor.

- 2026-04-19: `Minnesota River - Kinney Access to Skalbekken County Park`
  - Official day-trip listing exists.
  - Blocker: threshold support is still weak and endpoint detail is still thinner than the current bar.
  - Retry only if: endpoint authority improves and a defendable gauge model is found.

- 2026-04-19: `Cedar River - Janesville 183 to Winegar Park`
  - Direct gauge exists.
  - Blocker: 47-mile corridor is too broad and portage-heavy for a clean route-level threshold model.
  - Retry only if: broken into smaller route units with clear endpoint and threshold support.

- 2026-04-20: `Rice Creek - Peltier Lake to County Road I`
  - Blocker: duplicate coverage. The existing `Rice Creek - Peltier Lake to Long Lake` route already carries the same official `USGS 05288580` gauge story and includes `County Road I access` as the 11-mile intermediate official exit.
  - Retry only if: product policy changes to explicitly split already-covered routes into separately listed official subsegments instead of keeping them as intermediate exits on the parent route.

- 2026-04-20: `Des Moines River - Austin Park to Keosauqua Boat Ramp`
  - Official route support is strong: Iowa DNR names this exact 5.8-mile Segment #4, Van Buren County Conservation runs an official `Austin Park to Keosauqua Paddle`, Austin Park has an official county launch page, and Villages of Van Buren clearly treats Keosauqua Boat Ramp as a public named access.
  - Blocker: threshold support is still too qualitative. The official route materials say the segment is beginner-friendly when water levels are normal and warn about low/high water and Red Rock release effects, but they do not provide a non-guessy numeric paddling floor or range for `USGS 05490450` or `USGS 05490500`.
  - Retry only if: Iowa DNR, Van Buren County, USGS-adjacent manager guidance, or strong same-route mixed evidence ties this exact Austin-to-Keosauqua segment to a defensible numeric minimum or range.

- 2026-04-24: `Crow Wing River - Cottingham County Park to Bullard Bluff County Park`
  - Official route support is real: MN DNR Map 2 names both county-park carry-in accesses on the same downstream Crow Wing corridor, and the route would fit the existing by-river group.
  - Blocker: the only live gauge story still available is the upstream Nimrod site (`USGS 05244000`), and I did not find official or mixed-source evidence tying a defensible numeric floor from that gauge to this farther-downstream Cottingham-to-Bullard reach. Reusing the 300 cfs Nimrod floor here would be guesswork.
  - Retry only if: MN DNR, USGS-adjacent guidance, or strong same-route mixed evidence explicitly supports a live gauge pairing or threshold model for this downstream reach.

- 2026-04-24: `Crow Wing River - Bullard Bluff County Park to Old Wadena County Park`
  - Official route support is real: MN DNR Crow Wing Map 2 names both county-park carry-in accesses on the same downstream corridor, and the short route shape itself is clean.
  - Blocker: I still did not find a defensible live gauge model. The only active official gauge in the current Crow Wing product set is the upstream Nimrod site (`USGS 05244000`), and I did not find official or mixed-source evidence tying that gauge to a route-level threshold for this farther-downstream Bullard-to-Old-Wadena reach. Reusing the 300 cfs Nimrod floor here would still be guesswork.
  - Retry only if: MN DNR, USGS-adjacent guidance, or strong same-route mixed evidence explicitly supports a live gauge pairing or numeric threshold model for this downstream reach.

- 2026-04-24: `Mississippi River - Coon Rapids Dam Regional Park to North Mississippi Park`
  - MN DNR does recommend this exact 8.3-mile metro trip and names both endpoints clearly.
  - Blocker: I did not find a defensible live USGS gauge pairing with route-level threshold support strong enough for PaddleTodayV2. The route page is qualitative about swift current and urban conditions, but it does not provide a usable numeric paddling model or a cleaner official gauge story.
  - Retry only if: official manager guidance or strong same-route evidence ties this exact reach to a defensible live gauge model, even if that model is only a conservative minimum-only floor.

- 2026-04-24: `Little Turkey River - U Avenue to Eldorado`
  - The old seed still looks directionally interesting because northeast Iowa route utility is plausible and the corridor appears to have a live USGS story nearby.
  - Blocker: I did not find a trustworthy enough current package of official route naming, public endpoint authority, and route-level numeric threshold support to clear the V2 bar. Iowa DNR's current water-trails hub did not yield a clean route-specific trust trail for this exact segment, and I did not find a defensible numeric paddling model I could ship without guesswork.
  - Retry only if: Iowa DNR, county conservation, or strong same-route mixed evidence clearly names both endpoints and ties the route to a defensible live gauge floor or range.

- 2026-04-24: `Bark River - Highway 83 to Upper Nemahbin Lake Public Boat Launch`
  - The Bark still has a real live gauge story at Delafield and a plausible public downstream launch corridor.
  - Blocker: I did not find enough trustworthy evidence to turn it into a V2-ready route. The main weak points are put-in legitimacy at Highway 83, lake-and-portage logistics into the Nemahbin chain, and the lack of route-level threshold support stronger than a generic same-river gauge reference.
  - Retry only if: official manager pages, GIS access records, or strong same-route evidence clearly validate the Highway 83 launch and the Upper Nemahbin finish while supporting a defensible numeric model.

- 2026-04-24: `Cannon River - Dundas City Park to Hannah's Bend Park`
  - MN DNR Map 2 clearly names both endpoints, and the Northfield gauge (`USGS 05355000`) sits upstream on the corridor.
  - Blocker: I did not find a defensible live gauge model for this exact route. The only obvious live gauge is at Northfield upstream of Lake Byllesby, and MN DNR explicitly says Lake Byllesby Dam affects water levels and canoeing downstream. Reusing the Northfield gauge for the full Dundas-to-Hannah's-Bend reach would be guesswork across a dam-controlled lake section.
  - Retry only if: official manager guidance, USGS-adjacent dam/release guidance, or strong same-route evidence ties a live gauge or release model to this exact Dundas-to-Cannon-Falls corridor.

- 2026-04-24: `Crawfish River - County Road I to County Road G`
  - A live USGS story likely exists somewhere on the Crawfish system, so the corridor is not obviously dead.
  - Blocker: I did not find a strong enough trust package on this pass. The exact bridge-access endpoints still look too thinly documented, and I did not find official or strong same-route threshold evidence that would justify even a conservative shipped model without inventing too much.
  - Retry only if: county, state, or water-trail materials clearly support both bridge accesses and a defensible live gauge model emerges for this exact reach.

- 2026-04-24: `Root River - Houston to Hokah`
  - The lower Root corridor is product-relevant because the Houston gauge (`USGS 05385000`) is real and MN DNR strongly supports nearby Root day trips.
  - Blocker: I did not find official route support strong enough for this exact Houston-to-Hokah segment. The current MN DNR Root River segments page clearly supports `Rushford to Houston`, but I did not find the same level of exact-trip endpoint naming or a route-specific threshold story for `Houston to Hokah`. Shipping it would mean stitching a downstream extension onto the existing Houston route and porting the Houston gauge story farther downstream without enough proof.
  - Retry only if: MN DNR map/PDF or other official manager materials clearly present `Houston` to `Hokah` as a supported trip and tie that reach to a defensible live gauge model.

- 2026-04-24: `Minnesota River - Le Sueur to Henderson`
  - MN DNR does explicitly mention `Le Sueur to Henderson` as an easy stretch worth paddling on the Minnesota River.
  - Blocker: I still did not find a shippable exact-route package. The mention on the segments page is directional rather than a full recommended-trip spec, and I did not find route-level endpoint detail or a defensible numeric gauge model tied to that exact Le-Sueur-to-Henderson corridor. Reusing the broad `Jordan` gauge story or the already-shipped downstream `Henderson Station to Belle Plaine` model here would be guesswork.
  - Retry only if: MN DNR or other official manager guidance publishes exact access naming and a defensible live gauge / threshold model for the Le Sueur to Henderson reach.

## Blocked Until Date

- Through 2026-11-30: `Cannon River - Cannon Falls to Miesville Ravine County Park`
  - Dakota County reported Miesville access closure through November 2026.
  - Do not retry before 2026-12-01 unless an updated official access notice says the closure ended earlier.

## Needs manual coordinates


- 2026-04-26: `South Fork Crow River - Rick Johnson Park to Lake Rebecca Regional Park carry-in access`
  - Fresh Minnesota-first gauge sweep found a cleaner official recommended-trip candidate on the lower South Fork Crow / upper North Fork Crow confluence corridor.
  - Official support is strong: MN DNR South Fork Crow PDF names this exact `RECOMMENDED DAY TRIP` from `Rick Johnson Park trailer access` below the Watertown dam to `Lake Rebecca Regional Park carry-in access` on the North Fork Crow, about 14.3 river miles.
  - Gauge support is strong: the direct MN DNR Delano gauge (`South Fork Crow River at Delano, Bridge Ave`, site 51) sits on the route corridor and carries a full official ladder (`below 26 cfs scrapable`, `26-200 low`, `200-600 medium`, `600-800 high`, `above 800 very high`).
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Rick Johnson Park trailer access` and `Lake Rebecca Regional Park carry-in access`.

- 2026-04-26: `Sauk River - Spring Hill County Park to St. Martin carry-in access`
  - Fresh Minnesota-first gauge sweep found a cleaner upstream companion to the existing lower Sauk coverage.
  - Official support is strong: MN DNR Sauk Map 2 clearly names both endpoints, and the route is a practical ~9-mile day trip from RM 56.2 to RM 47.1.
  - Gauge support is strong: the direct MN DNR `Sauk River nr St. Martin, CR12` site carries a full official ladder (`below 14 ft scrapable`, `14-15 low`, `15-17 medium`, `17-20 high`, `above 20 very high`).
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Spring Hill County Park` and `St. Martin carry-in access`.

- 2026-04-26: `North Fork Crow River - City of Rockford trailer access to Riverside County Park`
  - Fresh Minnesota-first gauge sweep found a shorter, cleaner downstream-of-Rockford day trip adjacent to the existing `Riverside County Park to Dayton` route.
  - Official support is strong: MN DNR North Fork Crow Map 2 clearly names both endpoints, and the overview explicitly points paddlers to family-friendly routes downstream of Rockford.
  - Gauge support is strong: the Rockford/Farmington Avenue MN DNR gauge story already has a full official ladder (`below 345 cfs scrapable`, `345-500 low`, `500-1500 medium`, `1500-1750 high`, `above 1750 very high`).
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `City of Rockford trailer access` and `Riverside County Park`.

- 2026-04-26: `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`
  - Fresh Minnesota-first gauge sweep found a short direct-gauge Cottonwood day trip worth preserving even though the broader Cottonwood corridor did not produce a cleaner recommended-trip package.
  - Official support is good enough: MN DNR Map 4 clearly names both endpoints on the official water trail, and the route is a practical ~6.4-mile same-river segment.
  - Gauge support is strong: the direct MN DNR Springfield gauge carries a full official ladder (`below 12.5 ft scrapable`, `12.5-13 low`, `13-17 medium`, `17-19 high`, `above 19 very high`).
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Juenemann carry-in access` and `Springfield carry-in access`.

- 2026-04-26: `Red Lake River - Smiley Bridge to Centennial Park`
  - Re-reviewed under the current shipping rule that allows first-class MN DNR live gauges when the app can actually operate them.
  - Official support is strong: MN DNR explicitly recommends this beginner-friendly 12.3-mile day trip and clearly names `Smiley Bridge` and `Centennial Park` as the public endpoints.
  - Gauge support is strong: the direct MN DNR Thief River Falls gauge (`Red Lake River at Thief River Falls, Zeh St W`, site 179) sits on the route corridor and carries a full official ladder (`below 1098 ft scrapable`, `1098-1099 low`, `1099-1103 medium`, `1103-1105 high`, `above 1105 very high`).
  - Product-fit check is now good enough: the current app already supports `provider: 'mn_dnr'` current readings, so the old DNR-only live-data blocker no longer applies.
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Smiley Bridge` and `Centennial Park`.

- 2026-04-26: `Pine River - Rock Dam to Harvey Drake access`
  - Re-reviewed under the current shipping rule that allows first-class MN DNR live gauges when the app can actually operate them.
  - Official support is strong: MN DNR explicitly recommends this lower-Pine day trip and clearly names `Rock Dam` and `Harvey Drake access` as the route endpoints.
  - Gauge support is strong: the direct MN DNR Jenkins gauge (`Pine River nr Jenkins, CSAH15`, site 316) sits on the route corridor and carries a full official ladder (`below 35 cfs scrapable`, `35-50 low`, `50-200 medium`, `200-500 high`, `above 500 very high`).
  - Product-fit check is now good enough: the current app already supports `provider: 'mn_dnr'` current readings, so the old DNR-only live-data blocker no longer applies.
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Rock Dam` and `Harvey Drake access`.

- 2026-04-26 / 2026-04-27: `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`
  - Re-reviewed under the current shipping rule that allows first-class MN DNR live gauges when the app can actually operate them.
  - Official support is strong: MN DNR explicitly recommends this 15.7-mile day trip and clearly names `Highway 6 (S)` and `Highway 6 (N)` as the route endpoints.
  - Gauge support is usable: the direct Bigfork / Highway 38 MN DNR gauge is the live corridor source, and the route page gives a conservative floor by saying some rapids will be too rocky to run if that gauge is below `4 ft`.
  - Product-fit check is now good enough: the current app already supports `provider: 'mn_dnr'` current readings, so the old DNR-only live-data blocker no longer applies.
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for the two Highway 6 carry-in accesses.

- 2026-04-26: `Little Fork River - Veterans Park to Highway 73 bridge`
  - Re-reviewed under the current shipping rule that allows first-class MN DNR live gauges when the app can actually operate them.
  - Official support is strong: MN DNR explicitly recommends this experienced-paddler day trip and clearly names `Veterans Park` and the `Highway 73 bridge` access.
  - Gauge support is strong: the direct MN DNR Linden Grove / Highway 73 gauge (`Little Fork River nr Linden Grove, TH73`, site 88) sits on the route corridor and carries a full official ladder (`below 100 cfs scrapable`, `100-175 low`, `175-500 medium`, `500-1000 high`, `above 1000 very high`). The route page also says three feet or lower at the Highway 73 bridge makes most rapids too shallow for easy passage.
  - Product-fit check is now good enough: the current app already supports `provider: 'mn_dnr'` current readings, so the old DNR-only live-data blocker no longer applies.
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Veterans Park` and the `Highway 73 bridge` access.

- 2026-04-27: `Minnesota River - Thompson Ferry Access to Carver Riverfront Park`
  - Fresh Minnesota-first segment-page sweep found a cleaner lower-Minnesota preserve-now candidate than the broader stitched corridor ideas.
  - Official support is strong: MN DNR Map 6 explicitly recommends this exact `Thompson Ferry Access` to `Carver Riverfront Park` day trip at `8.1 river miles` and clearly names both public endpoints.
  - Gauge support is strong enough today: the current best live story is the existing Jordan lower-Minnesota gauge ladder already used on adjacent coverage, and this exact route fits that gauge more cleanly because the put-in is effectively gauge-adjacent rather than far upstream.
  - Product-fit check is good enough: the current app already supports `provider: 'mn_dnr'` current readings, so there is no remaining live-data integration blocker on this pass.
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Thompson Ferry Access` and `Carver Riverfront Park`.

- 2026-04-27: `Mississippi River - Hidden Falls to Harriet Island`
  - Fresh metro-Mississippi gauge-cluster pass mined the second official MN DNR Twin Cities recommended trip instead of reopening weaker threshold holds.
  - Official support is strong: MN DNR explicitly recommends this exact `Hidden Falls` to `Harriet Island` day trip at `6.5 river miles` and clearly names both public endpoints.
  - Gauge support is strong enough today: the existing St. Paul Mississippi gauge ladder already underpins the shipped `East River Flats to Hidden Falls` route, and for this downstream trip the same gauge is at least as defensible because it sits closer to the take-out side of the reach.
  - Product-fit check is good enough: the current app already supports `provider: 'mn_dnr'` current readings for the St. Paul site, so there is no remaining live-data integration blocker on this pass.
  - Endpoint support is good enough to preserve: Hidden Falls is already a documented public launch in V2, and Saint Paul documents Harriet Island Regional Park with a `Public Dock` amenity.
  - Blocker is only coordinate cleanup: this pass did not finish authoritative coordinates for `Hidden Falls Regional Park` and `Harriet Island Regional Park`.

## Research later

- 2026-04-27: `Mississippi River - Palisade to Waldeck Landing` (`threshold_weak`)
  - Fresh Mississippi Headwaters Board follow-on from the official DNR segment page's linked excursion maps.
  - Official support is now cleaner: the Mississippi Headwaters Board excursion page names the exact `Palisade to Waldeck Landing` trip and links driving directions for both public endpoints.
  - Live-gauge support is directionally strong: `USGS 05220600` (`Mississippi River at Palisade, MN`) sits directly on the upstream half of the corridor.
  - Blocker: threshold support is still too qualitative. I did not surface any route-level numeric paddling floor or range; current evidence still collapses back to the parent DNR segment's low-water riffle language rather than a shippable route model.
  - Retry only if: Mississippi Headwaters Board, MN DNR, USGS-adjacent guidance, or strong same-route evidence ties the Palisade gauge to a defensible numeric model for this exact route.

- 2026-04-27: `Mississippi River - Waldeck Landing to Kimball` (`threshold_weak`)
  - Fresh Mississippi Headwaters Board follow-on from the same Aitkin/Palisade excursion-map path.
  - Official support is now cleaner: the Mississippi Headwaters Board excursion page names the exact `Waldeck to Kimball` trip and links driving directions for both public endpoints.
  - Live-gauge support is only directionally useful: the cleanest story surfaced on this pass is the downstream Aitkin gauge family (`USGS 05227500` / `05227510`), which is better than broad corridor guessing but still not a clean exact-route sensor match.
  - Blocker: threshold support is still too qualitative. I did not surface any route-level numeric paddling floor or range for this exact subreach.
  - Retry only if: Mississippi Headwaters Board, MN DNR, USGS-adjacent guidance, or strong same-route evidence ties the Aitkin gauge family to a defensible numeric model for this exact route.

- 2026-04-27: `Mississippi River - Kimball to Aitkin County Campground gauge cluster` (non-yield cluster note)
  - Fresh cluster check only; no new candidate was logged.
  - Why it did not yield: the Mississippi Headwaters Board excursion page confirms a real short public day trip near the Aitkin gauge, but the evidence pattern is the same as the other Aitkin-area subtrips—good endpoint legitimacy, no shippable numeric threshold—so it was not worth creating a third near-duplicate hold on the same pass.
  - Revisit later only if: Mississippi Headwaters Board, MN DNR, or USGS-adjacent guidance publishes a route-level numeric gauge model for the Aitkin corridor.

- 2026-04-27: `Mississippi River - Fort Ripley to Fletcher Creek` (`threshold_weak`)
  - Fresh central-Minnesota Mississippi discovery from a new direct-USGS gauge family.
  - Official support is real: MN DNR explicitly recommends this exact 9.6-mile day trip and clearly names `Fort Ripley` and `Fletcher Creek` as the endpoints.
  - Live-gauge support is directionally strong: `USGS 05261000` (`Mississippi River near Fort Ripley, MN`) sits on the same corridor.
  - Blocker: threshold support is still too qualitative. The official page only says river levels can be fairly shallow, especially late in the summer, and does not tie the route to a numeric paddling floor or range.
  - Retry only if: MN DNR, USGS-adjacent guidance, Mississippi Headwaters Board materials, or strong same-route evidence ties the Fort Ripley gauge to a defensible numeric model for this exact route.

- 2026-04-27: `Mississippi River - Royalton Sportsman's Club to Stearns County Park` (`threshold_weak`)
  - Fresh central-Minnesota Mississippi discovery from a new direct-USGS gauge family.
  - Official support is real: MN DNR explicitly recommends this exact 11.4-mile day trip and clearly names `Royalton Sportsman's Club` and `Stearns County Park` as the endpoints.
  - Live-gauge support is directionally strong: `USGS 05267000` (`Mississippi River near Royalton, MN`) sits on the same corridor.
  - Blocker: threshold support is still too qualitative. The official page only warns to watch for rocky riffles during low water levels and does not tie the route to a numeric paddling floor or range.
  - Retry only if: MN DNR, USGS-adjacent guidance, Mississippi Headwaters Board materials, or strong same-route evidence ties the Royalton gauge to a defensible numeric model for this exact route.

- 2026-04-27: `Mississippi River at Brainerd / Highway 6 to Trommald gauge cluster` (non-yield cluster note)
  - Fresh cluster check only; no new candidate was logged.
  - Why it did not yield: the official trip is real, but this pass did not surface a cleaner threshold package than the same broad qualitative rain/current language already seen elsewhere on the Mississippi segments page, so it did not outrank the fresher Fort Ripley and Royalton candidates.
  - Revisit later only if: MN DNR, USGS-adjacent guidance, or Mississippi Headwaters Board materials publish a route-level numeric gauge model for the Brainerd corridor.

- 2026-04-27: `Snake River - Silver Star Road to Lower Falls Campsite` (`threshold_weak`)
  - Fresh Minnesota-first upper-Snake discovery from the official DNR segment page.
  - Official support is real: MN DNR explicitly recommends this exact 7.6-mile day trip and clearly names `Silver Star Road access` and `Lower Falls Campsite` as the public endpoints.
  - Blocker: the only practical live story surfaced on this pass is the downstream Pine City gauge family already used on lower Snake coverage, and I did not find route-level manager guidance tying that lower ladder cleanly to this rockier, portage-heavier upper segment.
  - Retry only if: MN DNR, USGS-adjacent manager guidance, race/outfitter evidence, or another strong same-route source ties a live gauge and conservative numeric threshold directly to the Silver-Star-to-Lower-Falls corridor.

- 2026-04-27: `Cloquet River - Indian Lake Access to Bear Lake Road` (`no_live_gauge`)
  - Fresh Minnesota-first upper-Cloquet discovery from the Map 2 segment page.
  - Official support is real: MN DNR explicitly recommends this exact 10.3-mile day trip and clearly names `Indian Lake Access` and `Bear Lake Road`.
  - Blocker: the current official page only gives qualitative flow guidance (`medium to heavy stream flow is best`; rapids may only be runnable after heavy rains) rather than a route-operable live gauge plus defensible threshold model for this exact upper corridor.
  - Retry only if: MN DNR, USGS, or other manager guidance ties the Indian-Lake-to-Bear-Lake-Road route directly to a usable live gauge and threshold story.

- 2026-04-27: `Mississippi River - Coon Rapids Dam Regional Park to Riverfront Regional Park` (`no_live_gauge`)
  - Fresh metro segment-page discovery from Mississippi Map 9.
  - Official support is real: MN DNR explicitly recommends this exact 6.1-mile day trip and clearly names `Coon Rapids Dam Regional Park` and `Riverfront Regional Park`.
  - Blocker: this pass did not surface a defensible live gauge pairing or route-level threshold package for the exact reach; the official page stays qualitative about swift current and urban conditions.
  - Retry only if: MN DNR, NPS, USGS-adjacent manager guidance, or strong same-route evidence ties this reach to a conservative live-gauge model.

- 2026-04-27: `Minnesota River - Judson/Mankato gauge cluster` (non-yield cluster note)
  - Fresh cluster check only; no new candidate was logged.
  - Why it did not yield: the strongest official same-gauge day trips here are already live in V2 (`Judson Access to Land of Memories Park` and `Franklin City Park to Mack Lake Park`), so this cluster is effectively saturated for current trust-first route expansion.
  - Revisit later only if: MN DNR publishes another exact recommended short day trip on the Judson/Mankato family or new manager guidance creates a cleaner same-gauge subreach than the already-shipped set.



- 2026-04-26: `Watonwan River - County Road 32 trailer access to Garden City trailer access`
  - Fresh Minnesota-first gauge sweep found a plausible lower Watonwan day-trip slice with a direct live-gauge story near existing south-central Minnesota coverage.
  - Official support is partial: the MN DNR Blue Earth / Watonwan map PDF clearly names both `County Road 32 trailer access` and `Garden City trailer access` on the same corridor, but the strongest official narrative still highlights the broader 30-mile `Madelia to the confluence` paddle rather than this shorter subsegment.
  - Gauge support is strong: the direct MN DNR Garden City gauge (`Watonwan River nr Garden City, CSAH13`, site 254) carries a full official ladder (`below 1.5 ft scrapable`, `1.5-1.6 low`, `1.6-4.4 medium`, `4.4-6.0 high`, `above 6.0 very high`).
  - Blocker: route trust still feels too stitched for PaddleTodayV2 today; thresholds are not the issue.
  - Retry only if: MN DNR or another official manager source explicitly recommends a shorter Watonwan day trip using these lower-river accesses, or if stronger same-route manager guidance appears.

- 2026-04-24: `Rum River - Princeton City Park to Martin's Landing`
  - MN DNR Map 2/3 gives named public endpoints (`Princeton City Park` at RM 87.9 and `Martin's Landing` at RM 34.8), so the route shape itself is real.
  - Blocker: no defensible live USGS gauge pairing was found for this exact reach. The existing St. Francis gauge is far downstream of Martin's Landing, and I did not find official route-level threshold support tying that gauge back to this 50-plus-mile upstream corridor.
  - Rechecked later on 2026-04-24: blocker unchanged. Current official materials still support the route shape but do not fix the gauge story; the St. Francis site remains too far downstream to reuse conservatively for the full Princeton-to-Martin corridor.
  - Retry only if: an official or clearly defensible same-river gauge story appears for the Princeton-to-Martin corridor, or the product policy changes to accept a much weaker downstream proxy.

- 2026-04-24: `Whitewater River - Elba to Highway 74`
  - Official route support exists on MN DNR Whitewater water-trail materials, and the route still looks product-relevant for southeast Minnesota.
  - Blocker: I did not find a defensible live gauge-plus-threshold story strong enough for PaddleTodayV2. The active official Whitewater river-level site is `Whitewater River nr Beaver, CSAH30`, which sits downstream near Beaver, but I did not find official or mixed-source evidence tying a usable paddling floor or range from that site back to the Elba-to-Hwy-74 reach without guesswork.
  - Rechecked later on 2026-04-24: blocker unchanged. The official Whitewater pages still support the broader Elba-to-Mississippi corridor and novice-warning language below Beaver, but they still do not connect the Beaver gauge to an Elba-to-Hwy-74 numeric route model cleanly enough to ship.
  - Retry only if: MN DNR, USGS-adjacent guidance, or strong same-route mixed evidence ties the Elba-to-Hwy-74 reach to a defensible live gauge model.

- 2026-04-24: `Vermilion River - Twomile Creek Access to Eightmile Creek Access`
  - MN DNR clearly names this exact 7-mile route and describes it as a wide easy stretch with no rapids.
  - Blocker: the strongest official gauge guidance I found on the Vermilion water-trail page says most rapids are runnable above four feet at the USGS gauge below Vermilion Dam. That is not a clean fit for this specific easy no-rapids Twomile-to-Eightmile segment, so using it here would be a stitched threshold story rather than a trustworthy route model.
  - Rechecked later on 2026-04-24: blocker unchanged. The exact official day-trip language is still strong, but I still did not find route-specific threshold support that cleanly links the relevant gauge guidance to this easy Twomile-to-Eightmile reach rather than to the broader rapids-heavy river.
  - Retry only if: official manager guidance or strong same-route evidence ties this exact Twomile-to-Eightmile reach to a defensible live gauge floor or range.

- 2026-04-24: `Namekagon River - Earl Park Landing to Trego Town Park`
  - NPS support is strong and the route itself is real.
  - Blocker: duplicate coverage. The existing V2 `Namekagon River - Big Bend Landing to Trego Town Park` route already covers the same official gauge story, the same take-out, and the Earl Park corridor as a named mid-route feature.
  - Retry only if: product policy changes to split already-covered Riverway routes into separate subsegment listings instead of keeping them inside the longer parent route.

- 2026-04-24: `St. Croix River - Osceola Landing to Somerset Landing`
  - Official Riverway support is real: NPS lower St. Croix guide and Map 9 clearly support `Osceola Landing` and the downstream `High Bridge` / lower-river corridor, and Somerset is a real public landing corridor.
  - Blocker: I did not find a defensible numeric threshold model for this exact Osceola-to-Somerset reach. The strongest official numeric support I found still belongs upstream on the `Interstate Parks to Osceola Landing` stretch (`below 3,000 cfs, stay in the main channel`), and porting that downstream to the lake-like Osceola-to-Somerset corridor would be guesswork.
  - Retry only if: NPS, USGS-adjacent manager guidance, or strong same-route evidence ties this exact lower-river reach to a defensible live gauge floor or range.

- 2026-04-24: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`
  - A direct live gauge exists on the North Fork Maquoketa at Fulton (`USGS 05418450`), so the corridor is still worth keeping in mind.
  - Blocker: I did not find a trustworthy route-definition and threshold package strong enough for V2. The official access trail was brittle during this pass (`Dunlap Park` access page returned 404, `Mon-Maq` access page returned 500), and I did not find official or strong same-route numeric paddling guidance that would support even a conservative minimum-only model without guesswork.
  - Retry only if: official county or Iowa DNR access pages for both endpoints are reachable and a defensible numeric route model appears for the Fulton gauge or another clearly matched live gauge.

- 2026-04-24: `Mississippi River - Hidden Falls Regional Park to Harriet Island Regional Park`
  - The corridor is real: Map 10 of the Mississippi River State Water Trail covers this St. Paul reach, both parks are clearly named public riverfront endpoints, and the direct St. Paul live gauge (`USGS 05331000`) carries official MN DNR level bands.
  - Blocker: I did not find a trustworthy route-specific threshold story for this exact subreach. The strongest official trip guidance nearby is the separate DNR recommended `East River Flats to Hidden Falls` trip, while this lower segment still looks like a stitched urban subsegment with lock, wake, and pool effects but no exact-route numeric paddling guidance.
  - Retry only if: MN DNR, NPS, or strong same-route evidence explicitly ties this exact Hidden-Falls-to-Harriet-Island reach to a defensible shipped gauge model.

- 2026-04-24: `Mississippi River - Harriet Island Regional Park to Kaposia Landing`
  - The downstream metro corridor appears product-relevant and likely has a usable same-river gauge story at St. Paul, with named public endpoints on the lower Mississippi map corridor.
  - Blocker: I did not find a clean enough exact-route trust package. The route still looks like a map-derived urban subsegment rather than an officially recommended day trip, and I did not find route-level threshold support strong enough to separate this reach from the broader St. Paul pool conditions without guesswork.
  - Retry only if: official route or access documentation clearly presents Harriet Island to Kaposia as a day-trip reach and ties it to a defensible live gauge model.

- 2026-04-24: `Mississippi River - North Mississippi Park to East River Flats Park`
  - This fills the obvious geographic gap between the rejected `Coon Rapids Dam to North Mississippi Park` reach and the already-added `East River Flats to Hidden Falls` trip.
  - Blocker: I did not find an official recommended-trip or route-specific threshold package for this exact North-Mississippi-to-East-River-Flats corridor. The route definition would still be a stitched metro segment, and the available official gauge ladders do not clearly resolve that corridor as a trustworthy standalone PaddleToday route.
  - Retry only if: MN DNR, NPS, or strong same-route evidence clearly names this exact reach as a standalone trip and supports a defensible live gauge pairing.

- 2026-04-24: `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`
  - The corridor still looks directionally useful because the Monticello / North Fork Maquoketa access family appears real and the downstream park finish is product-shaped.

- 2026-04-26: `Zumbro River - Village Park to Theilman Access`
  - Fresh same-gauge follow-on preserved from the Zumbro Falls cluster after rechecking the official map PDF instead of the vaguer route page alone.
  - Official support improved on this pass: MN DNR Map 2 clearly names `Village Park` at Hammond and `Theilman` carry-in access on the same main stem.
  - Live-gauge support is directionally strong: `USGS 05374000` at Zumbro Falls is on the same main stem and already underpins nearby shipped Zumbro routes.
  - Blocker: threshold support is still a stitched mixed-source story from neighboring Miles Paddled reaches (`Zumbro River II` and `Zumbro River III`) rather than a clean exact-route ladder for Hammond-to-Theilman itself.
  - Retry only if: MN DNR, USGS-adjacent guidance, or strong same-route evidence ties the Zumbro Falls gauge directly to the Hammond-to-Theilman corridor with a defensible floor or range.
  - Blocker: I did not find a trustworthy enough current package of official endpoint authority and route-level threshold support to clear the V2 bar. The Iowa DNR water-trail PDF path was not cleanly recoverable during this pass, Jones County MyCountyParks endpoint pages for `Upper Mon-Maq Access` / `Pictured Rocks Access` returned generic error pages, and I did not find defensible numeric paddling guidance tying a live gauge to this exact route.
  - Retry only if: Iowa DNR or Jones County publishes reachable endpoint pages or map materials for both accesses and a defensible numeric live-gauge model appears for this exact Mon-Maq-to-Pictured-Rocks corridor.

- 2026-04-24: `Namekagon River - County Road K Landing to Riverside Landing`
  - NPS support is strong for the broader Riverway corridor: NPS maps clearly split the lower Namekagon into `Map 3 - Trego to Riverside Landing`, and the current-conditions dataset still publishes the Leonards gauge (`150-230 cfs` normal, `>650 cfs` high) for the Namekagon.
  - Blocker: I still did not find route-specific threshold support for this exact County Road K to Riverside subreach. NPS Map 3 does describe the downstream County Road K corridor qualitatively (narrow riffles, several Class I rapids before the confluence, more rapids approaching Riverside, low-water challenge on the St. Croix side), but that is not the same as a defensible numeric model for this exact segment. Shipping it would mean porting the broader Leonards guidance onto a more technical lower subreach without enough proof.
  - Retry only if: NPS or strong same-route evidence ties the County Road K to Riverside subreach itself to a defensible numeric live-gauge model rather than only to the broader lower-Namekagon current-conditions panel.

- 2026-04-25: Triage sweep found no fresh high-yield candidates left in the current bounded seed list.
  - Current old-repo shortlist is effectively exhausted: remaining items are either already in V2, already rejected, or still blocked by the same weak gauge / threshold fit.
  - Route-candidate ledger was normalized from placeholder form into a real queue so implementation runs can prefer genuinely pre-vetted routes once any likely-addable candidates appear.
- 2026-04-25: Re-reviewed the remaining bounded old-repo shortlist with Minnesota-first triage and still found no candidate that cleared `likely_addable`.
  - Set aside as still `research_later`: `Whitewater River - Elba to Highway 74`, `Vermilion River - Twomile Creek Access to Eightmile Creek Access`, `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing`.
  - Moved to clearer near-term `rejected` posture instead of vague queue occupancy: `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G`.
  - Main pattern: the remaining misses are not endpoint-name problems first; they are gauge-fit and threshold-quality problems. The next useful breakthrough probably needs new official manager guidance, not more reshuffling of the same old-repo seeds.

- 2026-04-25: Follow-up ledger sweep at 09:48 America/Chicago reviewed the same 8 bounded carryover candidates and found no new evidence that changed status.
  - Reviewed again as still `research_later`: `Whitewater River - Elba to Highway 74`, `Vermilion River - Twomile Creek Access to Eightmile Creek Access`, `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing`.
  - Reviewed again as still `rejected`: `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G`.
  - No candidates were promoted to `likely_addable` or `needs_manual_coordinates`.
  - No implementation work was triggered; this remained a documentation and queue-maintenance pass only.

- 2026-04-25: Conservative no-add pass at 09:50 America/Chicago.
  - Started from the live V2 inventory plus the normalized candidate ledger and again found no queued `likely_addable` route.
  - Re-reviewed the Minnesota-first blocked set that still matters most for near-term adds: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access`. Both remain blocked by route-specific gauge / threshold fit rather than endpoint naming.
  - Also reconfirmed the strongest non-Minnesota holdovers in the bounded ledger: `Namekagon River - County Road K Landing to Riverside Landing`, `St. Croix River - Osceola Landing to Somerset Landing`, and `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`. All still fail the same route-level threshold bar.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 10:08 America/Chicago.
  - Re-reviewed the bounded 8-candidate queue already tracked in `docs/route-candidate-ledger.json` against the current live V2 inventory and prior blocker memory.
  - Minnesota-first review again found the same nearest-miss pattern: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still fail on route-specific gauge / threshold fit, not on endpoint naming.
  - The strongest non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack a trustworthy enough route-level threshold model.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected` with no fresh evidence fixing the same old trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 10:28 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, the current ledger, and prior blocker memory.
  - Minnesota-first status remains unchanged: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still fail on route-specific gauge / threshold fit rather than endpoint names or coordinate cleanup.
  - The strongest non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still do not have trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no new evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 10:48 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, and prior blocker memory.
  - Minnesota-first status remains unchanged: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still fail on route-specific gauge / threshold fit rather than endpoint names or coordinate cleanup.
  - The strongest non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still do not have trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no new evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 10:49 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, the normalized ledger, and prior blocker memory.
  - Minnesota-first status still did not move: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` remain blocked by route-specific gauge / threshold fit, not by endpoint naming or missing coordinates.
  - Non-Minnesota near-misses also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 11:08 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, the normalized ledger, and prior blocker memory.
  - Minnesota-first status still did not move: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` remain blocked by route-specific gauge / threshold fit, not by endpoint naming or missing coordinates.
  - Non-Minnesota near-misses also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 11:28 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, the normalized ledger, and prior blocker memory.
  - Minnesota-first status still did not move: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` remain blocked by route-specific gauge / threshold fit, not by endpoint naming or missing coordinates.
  - Non-Minnesota near-misses also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 11:48 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, the normalized ledger, and prior blocker memory.
  - Minnesota-first status still did not move: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` remain blocked by route-specific gauge / threshold fit, not by endpoint naming or missing coordinates.
  - Non-Minnesota near-misses also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 11:49 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, the normalized ledger, and prior blocker memory.
  - Minnesota-first status still did not move: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` remain blocked by route-specific gauge / threshold fit, not by endpoint naming or missing coordinates.
  - Non-Minnesota near-misses also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 12:08 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, the normalized ledger, and prior blocker memory.
  - Minnesota-first status still did not move: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` remain blocked by route-specific gauge / threshold fit, not by endpoint naming or missing coordinates.
  - Non-Minnesota near-misses also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-25: Conservative no-add pass at 15:28 America/Chicago.
  - Re-reviewed the same bounded 8-candidate queue against the live V2 inventory, route details, the normalized ledger, and prior blocker memory.
  - Minnesota-first status still did not move: `Whitewater River - Elba to Highway 74` and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` remain blocked by route-specific gauge / threshold fit, not by endpoint naming or missing coordinates.
  - Non-Minnesota near-misses also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still lack trustworthy enough route-level threshold models.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 10:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts` and the current route details file, then checked the normalized candidate ledger and prior blocker memory.
  - There were still no queued `likely_addable` candidates, so the run stayed in bounded re-review mode instead of forcing a weak fresh candidate.
  - Minnesota-first blockers remain unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific gauge/threshold mapping from the downstream Beaver site, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader rapids-oriented Vermilion context.
  - The strongest non-Minnesota holdovers also remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality rather than route shape alone.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed endpoint-authority and threshold-support gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 10:48 America/Chicago.
  - Started again from the live V2 inventory in `src/data/rivers.ts`, the current route details file, the triage memory, and the normalized 8-candidate ledger.
  - Re-reviewed the same bounded queue because there were still no fresh Minnesota-first candidates with stronger gauge-first evidence than the known holdovers.
  - Minnesota-first blockers remain unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific gauge/threshold mapping from the downstream Beaver site, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader rapids-oriented Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality rather than route shape alone.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their endpoint-authority and threshold-support gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 11:08 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, the current route details file, the triage memory, and the normalized 8-candidate ledger.
  - Re-reviewed the same bounded queue because there were still no fresh Minnesota-first candidates with stronger gauge-first evidence than the known holdovers.
  - Minnesota-first blockers remain unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific gauge/threshold mapping from the downstream Beaver site, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader rapids-oriented Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality rather than route shape alone.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their endpoint-authority and threshold-support gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 11:28 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, the current route details file, the triage memory, and the normalized 8-candidate ledger.
  - Re-reviewed the same bounded 8-candidate queue because there were still no fresh Minnesota-first candidates with stronger gauge-first evidence than the known holdovers.
  - Minnesota-first blockers remain unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific gauge/threshold mapping from the downstream Beaver site, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader rapids-oriented Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality rather than route shape alone.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their endpoint-authority and threshold-support gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 11:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, the current route details file, this memory file, and the normalized 8-candidate ledger.
  - There were still no queued `likely_addable` candidates, so the run stayed in bounded re-review mode rather than forcing a weak fresh route.
  - Minnesota-first blockers remain unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific gauge/threshold mapping from the downstream Beaver site, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader rapids-oriented Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality rather than route shape alone.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their endpoint-authority and threshold-support gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 11:48 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, the current route details file, this memory file, and the normalized 8-candidate ledger.
  - There were still no queued `likely_addable` candidates, so the run stayed in bounded re-review mode rather than forcing a weak fresh route.
  - Minnesota-first blockers remain unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific gauge/threshold mapping from the downstream Beaver site, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader rapids-oriented Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality rather than route shape alone.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their endpoint-authority and threshold-support gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 12:08 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, the current route details file, this memory file, and the normalized 8-candidate ledger.
  - There were still no queued `likely_addable` candidates, so the run stayed in bounded re-review mode rather than forcing a weak fresh route.
  - Minnesota-first blockers remain unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific gauge/threshold mapping from the downstream Beaver site, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader rapids-oriented Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality rather than route shape alone.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no fresh evidence fixed their endpoint-authority and threshold-support gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 12:28 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized 8-candidate ledger.
  - No fresh Minnesota-first gauge-first candidate with a genuinely new evidence path surfaced, so the run stopped conservatively instead of re-litigating stale holdovers.
  - The bounded queue still has no `likely_addable` or `needs_manual_coordinates` candidate; the main blocker pattern remains route-level gauge / threshold fit rather than endpoint naming.
  - Minnesota-first status remains unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific mapping from the downstream Beaver gauge, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no new evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first DNR gauge reassessment at 21:48 America/Chicago.
  - Reviewed 4 candidates from 2 fresh evidence paths instead of re-litigating the stale bounded queue.
  - Moved to `needs_manual_coordinates`: `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, and `Little Fork River - Veterans Park to Highway 73 bridge`.
  - Why they moved: the current app already supports `provider: 'mn_dnr'` current readings, each route has a direct official DNR gauge with a full official ladder, and the remaining blocker is endpoint coordinate cleanup rather than live-data viability.
  - Rechecked but did not promote: `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`. The route is still real and useful, but the current practical floor looks tied to mixed height/discharge context rather than a cleaner same-route implementation package.
  - Explored non-yield cluster: `St. Louis River at Floodwood, CSAH8` with the official `Paupores to Brookston` day trip. Official trip support is real, but the gauge fit still looks upstream/proxy-like and more rapid-sensitive than the cleaner preserve-now candidates.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-27: Conservative no-add gauge-first pass at 1:48 AM America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the repaired candidate ledger, then did one bounded fresh Minnesota-first sweep instead of reopening stale threshold-weak or `research_later` holdovers.
  - Explored non-yield gauge/search cluster: `Red River of the North` `Map 5` (`Grand Marais Creek to Drayton`) from the official DNR segments page. Useful outcome: this official segment page currently has no recommended day-trip block at all, only general corridor hazards plus fishing/shoreline notes, so it does not presently yield a route candidate worth queueing.
  - Explored non-yield gauge/search cluster: `Shell Rock River` canonical DNR page recheck. Outcome unchanged: the current official recommended outing on the Minnesota page is still lake-only around Albert Lea Lake rather than a river day trip with a route-operable live-gauge story.
  - Fresh-discovery takeaway: the remaining obvious Minnesota DNR page value is now heavily mined, and future triage should keep favoring genuinely new official route/gauge releases or coordinate cleanup on the preserved `needs_manual_coordinates` set over repeated page-mining of saturated systems.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.


- 2026-04-27: Fresh Minnesota-first gauge-cluster pass at 04:28 America/Chicago.
  - Reviewed 1 fresh candidate from 1 genuinely new evidence path instead of reopening stale holds.
  - Parked as `threshold_weak`:
    - `Snake River - Silver Star Road to Lower Falls Campsite` — MN DNR explicitly recommends this 7.6-mile upper Snake day trip and clearly names both endpoints, but the only practical live story surfaced on this pass is the downstream Pine City gauge family already used on lower Snake coverage. I did not find route-level guidance tying that lower ladder cleanly to this rockier upper segment.
  - Explored non-yield gauge cluster: `Blue Earth River at Rapidan`. The direct-gauge recommended day trip is already live in V2, and this pass did not surface a cleaner same-gauge follow-on than the existing `Rapidan Dam Park to County Road 90` route, so the cluster remains saturated.
  - Explored non-yield gauge cluster: `Straight River at Faribault`. Outcome unchanged: the strongest direct-gauge route value is already live as `Krogh's Landing to Two Rivers Landing/Park`, and the current DNR page still does not expose a new recommended day trip worth queueing.
  - Explored non-yield gauge cluster: lower `Snake River` around `Canary Road` / `Cross Lake` / `Pine City`. Outcome unchanged: the strongest official same-gauge route is already live, and this pass did not surface a new short same-gauge reach that would add more value than overlap.
  - Fresh-discovery takeaway: the obvious Blue Earth, Straight, and lower-Snake gauge families are now clearly saturated, while the upper Snake still has route-shape value but fails on route-specific gauge calibration rather than endpoint naming.
  - Net result: 1 candidate reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.

- 2026-04-27: Conservative gauge-first no-add pass at 04:48 AM America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed, then used one bounded fresh Minnesota-first saturation sweep instead of reopening stale threshold holds.
  - Explored non-yield gauge/search cluster: `Root River` canonical DNR segment page. Useful outcome: the only current official `Recommended day trip` block is still `Rushford to Houston`, which is already live in V2, so the cluster remains saturated for trust-first expansion.
  - Explored non-yield gauge/search cluster: `Rum River` canonical DNR segment page. Useful outcome: the only current official recommended trips are `Wayside landing to Milaca` (already rejected for threshold-quality reasons), `Walbo to Cambridge West` (already live in V2), and `Martin's Landing to North County Park` (already live in V2), so the cluster is saturated.
  - Explored non-yield gauge/search cluster: `Cannon River` canonical DNR segment page. Useful outcome: the current official recommended trips are still `Two Rivers to Dundas` (already live in V2 as the Faribault/Dundas route) and `Riverside Park to Miesville` (already blocked by the known Miesville access closure), so this cluster is also saturated.
  - Fresh-discovery takeaway: the obvious Root / Rum / Cannon recommendation-page value is now mined out. Future runs should keep preferring genuinely new gauge clusters, new official route/gauge releases, or coordinate cleanup on the preserved `needs_manual_coordinates` set over re-reading these three systems.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.


- 2026-04-27: `Mississippi River - Steamboat Access to Blackberry Bridge Access` (`threshold_weak`)
  - Fresh upper-Mississippi discovery from a new direct-USGS gauge family.
  - Official support is real: MN DNR explicitly recommends this exact 8-mile day trip and clearly names `Steamboat Access` and `Blackberry Bridge Access` as the endpoints.
  - Live-gauge support is directionally strong: `USGS 05211000` (`Mississippi River at Grand Rapids, MN`) is the cleanest live source on the same corridor.
  - Blocker: threshold support is still too qualitative. The official page only says there may be small sections of riffles when the water is low and does not tie the route to a numeric paddling floor or range.
  - Retry only if: MN DNR, Mississippi Headwaters Board materials, USGS-adjacent manager guidance, or strong same-route evidence ties the Grand Rapids gauge to a defensible numeric model for this exact route.

- 2026-04-27: `Mississippi River - Beaver Island Trail Access to Clearwater` (`threshold_weak`)
  - Fresh central-Mississippi discovery from a new same-river evidence path.
  - Official support is real: MN DNR explicitly recommends this exact 12.1-mile day trip and clearly names `Beaver Island Trail Access` and `Clearwater` as the endpoints.
  - Live-gauge support is directionally plausible: the cleanest current live story is the broader St. Cloud Mississippi gauge family.
  - Blocker: threshold support is still too qualitative. The official page only warns about riffles when river levels are low and fast-moving water when they are high, without tying the route to a numeric paddling floor or range.
  - Retry only if: MN DNR, USGS-adjacent manager guidance, outfitters, or strong same-route evidence ties a live gauge and conservative numeric threshold directly to the Beaver-Island-to-Clearwater corridor.

- 2026-04-27: `Mississippi River - Lake Itasca to Coffee Pot Landing` gauge cluster (non-yield cluster note)
  - Fresh cluster check only; no new candidate was logged.
  - Why it did not yield: the official trip is real, but this pass did not surface a defensible live gauge pairing or threshold package strong enough to outrank the fresher downstream Mississippi candidates.
  - Revisit later only if: MN DNR, Mississippi Headwaters Board, or USGS-adjacent guidance publishes a route-level gauge model for the headwaters corridor.

## Rules

- Do not retry a route listed here unless new evidence directly addresses the blocker.
- Prefer genuinely new candidates over rechecking old rejected ones.
- If a route is added to PaddleTodayV2, move it to `Added`.
- If a route remains blocked, keep the exact blocker explicit and actionable.
- Treat the live V2 inventory in `src/data/rivers.ts` as the route source of truth if this file lags behind added routes.

- 2026-04-26: Conservative no-add pass at 12:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized 8-candidate ledger.
  - No fresh Minnesota-first candidate with a genuinely new gauge-first evidence path surfaced, so the run stopped conservatively instead of recycling stale holdovers as if they were new work.
  - The ledger still has no `likely_addable` or `needs_manual_coordinates` candidate; the main blocker pattern remains route-level gauge / threshold fit rather than endpoint naming or coordinate cleanup.
  - Minnesota-first status remains unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific mapping from the downstream Beaver gauge, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no new evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 12:48 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized 8-candidate ledger.
  - No fresh Minnesota-first candidate with a genuinely new gauge-first evidence path surfaced, so the run stopped conservatively instead of re-litigating stale holdovers.
  - The ledger still has no `likely_addable` or `needs_manual_coordinates` candidate; the main blocker pattern remains route-level gauge / threshold fit rather than endpoint naming or coordinate cleanup.
  - Minnesota-first status remains unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific mapping from the downstream Beaver gauge, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no new evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 13:08 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized 8-candidate ledger.
  - No fresh Minnesota-first candidate with a genuinely new gauge-first evidence path surfaced, so the run stopped conservatively instead of recycling stale holdovers as if they were new work.
  - The ledger still has no `likely_addable` or `needs_manual_coordinates` candidate; the main blocker pattern remains route-level gauge / threshold fit rather than endpoint naming or coordinate cleanup.
  - Minnesota-first status remains unchanged: `Whitewater River - Elba to Highway 74` still lacks a defensible route-specific mapping from the downstream Beaver gauge, and `Vermilion River - Twomile Creek Access to Eightmile Creek Access` still lacks threshold support tied to that exact easy segment rather than the broader Vermilion context.
  - Non-Minnesota holdovers remain unchanged: `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, and `St. Croix River - Osceola Landing to Somerset Landing` still fail on route-level threshold quality.
  - `Little Turkey River - U Avenue to Eldorado` and `Crawfish River - County Road I to County Road G` remain correctly parked as `rejected`; no new evidence fixed their trust gaps.
  - No candidates were promoted to `likely_addable`, `needs_manual_coordinates`, or `added`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 13:28 America/Chicago.
  - Reviewed 3 fresh candidates from 4 gauge clusters instead of re-litigating the stale bounded queue.
  - Promoted to `likely_addable`:
    - `Long Prairie River - Long Prairie to Browerville` — official MN DNR recommended day trip; direct Long Prairie live gauge with full official ladder; both endpoints resolved in the MN DNR public-water-access GIS.
    - `Pomme de Terre River - Larson to Appleton` — official MN DNR recommended day trip; direct Appleton live gauge with full official ladder; both endpoints resolved in the MN DNR public-water-access GIS.
  - Parked as `threshold_weak`:
    - `Chippewa River - Lentz Access to Watson Lion's Park` — official recommended trip is real, but the Benson gauge story still looks too upstream/proxy-like for conservative shipping, and the Watson finish is not yet as cleanly anchored as the stronger candidates.
  - Explored non-yield gauge cluster: `Cottonwood River nr Springfield, CR2` (`USGS/MN DNR site id 42`). The live gauge ladder is real, but this pass did not surface a similarly clean official recommended trip plus endpoint package near the gauge, so no candidate was queued from Cottonwood.
  - Fresh-discovery takeaway: central and western Minnesota DNR water-trail pages still have unmined value when paired with the public-water-access GIS; the best near-term adds are direct-gauge recommended trips, not more downstream proxy corridors.

- 2026-04-26: Conservative no-add implementation check at 13:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - The queue finally had two real `likely_addable` candidates worth implementation review: `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton`.
  - I did not add either route on this pass because the current live-data fetcher in `src/lib/usgs.ts` is still USGS-only, while both candidates currently depend on MN DNR CSG gauge sites (`Long Prairie` site id `89` / csg_id `14051001`; `Pomme de Terre at Appleton` site id `168` / csg_id `23007001`). Those sites do not expose usable NWIS IV time series through the existing USGS ingestion path, so shipping either route today would create a dead live gauge in product.
  - Status decision: keep both candidates in `likely_addable` because the route evidence package is still strong; the blocker is implementation plumbing, not route quality.
  - `Chippewa River - Lentz Access to Watson Lion's Park` was deliberately not revisited beyond the prior fresh sweep because it already sits correctly at `threshold_weak` and this run's useful discovery was the gauge-ingestion constraint, not a new threshold breakthrough.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 13:48 America/Chicago.
  - Reviewed 3 fresh candidates from 4 gauge clusters instead of recycling the stale bounded queue.
  - Set aside as `needs_manual_coordinates`:
    - `Sauk River - Spring Hill County Park to St. Martin carry-in access` — direct official gauge ladder, named official endpoints, practical ~9-mile route; only coordinate cleanup remains.
    - `North Fork Crow River - City of Rockford trailer access to Riverside County Park` — direct Rockford gauge story, named official endpoints, cleaner shorter companion to the existing lower Crow route; only coordinate cleanup remains.
    - `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` — short direct-gauge official water-trail segment with named endpoints; only coordinate cleanup remains.
  - Explored non-yield gauge cluster: `Otter Tail River nr Elizabeth, MN` plus the downstream `below Orwell Dam` corridor. The ladder support is real, but the near-gauge route shapes are chopped up by dams, culverts, portages, reservoir complications, or long awkward transitions before they resolve into a trust-first day trip.
  - Fresh-discovery takeaway: the best remaining Minnesota opportunities still look like short-to-medium official water-trail segments sitting right on top of official DNR ladders, even when they are not packaged on the website as flashy standalone recommended trips.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative route-triage pass at 14:08 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - The queue already contained 6 fresh Minnesota-first candidates reviewed today (`2 likely_addable`, `3 needs_manual_coordinates`, `1 threshold_weak`), so this pass did not pretend those same candidates were fresh discoveries.
  - No genuinely new gauge-first evidence path surfaced beyond the 13:28 and 13:48 sweeps, so the run stopped conservatively instead of re-litigating stale holdovers or fabricating a weaker seventh or eighth candidate.
  - Current best next-implementation targets remain `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton`, but both still depend on MN DNR CSG gauges rather than currently ingested USGS feeds.
  - Current best preserve-for-cleanup targets remain `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`; all three look implementation-worthy once coordinates are resolved.
  - `Chippewa River - Lentz Access to Watson Lion's Park` remains correctly parked at `threshold_weak` because the Benson ladder still looks too proxy-like for conservative shipping.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative route-triage pass at 14:28 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - The queue still contained the same 6 fresh Minnesota-first candidates reviewed earlier today (`2 likely_addable`, `3 needs_manual_coordinates`, `1 threshold_weak`).
  - No genuinely new post-14:08 gauge-first evidence path surfaced, so this run stopped conservatively instead of recycling the same six candidates as fake fresh discovery.
  - Current best next-implementation targets remain `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton`, but both still depend on MN DNR CSG gauges rather than the current USGS-only ingestion path.
  - Current best preserve-for-cleanup targets remain `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`; all three still look worth implementing once coordinates are resolved.
  - `Chippewa River - Lentz Access to Watson Lion's Park` remains correctly parked at `threshold_weak` because the Benson ladder still looks too proxy-like for conservative shipping.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 14:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - There were still no shippable `likely_addable` candidates for this run. The two strongest queued routes, `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton`, remain blocked by implementation reality rather than route quality: both rely on MN DNR CSG gauges that the current PaddleTodayV2 live-data path does not ingest.
  - I deliberately did not re-litigate stale `research_later` or `rejected` holdovers because no genuinely new Minnesota-first evidence path surfaced after the earlier fresh gauge sweeps.
  - `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` remain correctly parked as `needs_manual_coordinates`; none was downgraded or rejected because the remaining blocker is still coordinate resolution only.
  - `Chippewa River - Lentz Access to Watson Lion's Park` remains correctly parked as `threshold_weak`; no new evidence improved the Benson proxy-threshold fit enough to ship it.
  - No candidates were promoted to `added` on this pass.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 14:48 America/Chicago.
  - Reviewed 2 fresh gauge clusters and 1 fresh candidate instead of revisiting the stale bounded queue.
  - Set aside as `no_live_gauge` on this pass, later superseded by the 2026-04-27 add:
    - `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` — MN DNR explicitly recommends this 15.7-mile day trip and gives a usable qualitative floor (`some rapids will be too rocky to run if the gauge at the Highway 38 bridge in Bigfork is below four feet`), but this pass incorrectly treated MN DNR live support as blocked. The route was later added after confirming current PaddleTodayV2 support for MN DNR gauges and the closer Craigsville/Highway 6 DNR site.
  - Explored non-yield gauge cluster: `St. Louis River at Floodwood, CSAH8` and the nearby `Paupores to Brookston` recommended trip corridor. The route itself is official and practical, but this pass did not surface a defensible live USGS gauge-plus-threshold package; the available live levels in the DNR system are CSG sites and the route page stayed qualitative about rapids/high water.
  - Fresh-discovery takeaway: some remaining Minnesota DNR trails still have real route utility, but they are not automatic wins for PaddleTodayV2 if the live gauge story is DNR-only or qualitative. The current best queue remains the earlier direct-gauge Minnesota candidates already preserved in the ledger.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 15:08 America/Chicago.
  - Reviewed 1 fresh candidate and 2 additional non-yield gauge clusters instead of recycling the stale bounded queue.
  - Parked as `threshold_weak`:
    - `Des Moines River - Mayflower Park to Christianna Bridge` — MN DNR map explicitly recommends this 7-mile Windom-area day trip and clearly names both endpoints, while the official Jackson river-level site (`West Fork Des Moines River at Jackson, River St`) carries a full five-band ladder (`below 75 cfs scrapable`, `75-200 low`, `200-900 medium`, `900-1800 high`, `above 1800 very high`). The blocker is route-to-gauge fit: Jackson sits well downstream of Mayflower and Christianna, and this pass did not surface manager guidance tying that ladder directly enough to the upstream route.
  - Explored non-yield gauge cluster: `Cedar River nr Austin, MN` plus `Cedar River nr Lansing, CR2`. The corridor still has real official route utility, but the only fresh route-shaped candidate near the gauges on this pass was the already-rejected `Riverwood Landing to State Line Road`, and I did not find a new cleaner same-gauge day trip with stronger trust support than the existing blocker record.
  - Explored non-yield gauge cluster: `Redwood River at Russell, CR15` / `nr Marshall, MN` / `nr Redwood Falls, MN`. The DNR ladder support is real at all three sites, but the route opportunities surfaced here were either on the already-tracked `Kinney Access to Skalbekken County Park` corridor or on broader Minnesota-river-adjacent stretches where the best named day trips still resolve onto the Minnesota River page rather than a clean new Redwood-specific add.
  - Fresh-discovery takeaway: the remaining Minnesota-first opportunities are still mostly being sorted by route-specific gauge fit, not by whether DNR has enough named access points. That keeps the existing queue intact and argues against forcing weaker proxy-based adds.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 15:28 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - The queue already contained the same fresh Minnesota-first candidates discovered earlier today (`2 likely_addable`, `3 needs_manual_coordinates`, `2 threshold_weak`, `1 no_live_gauge`), and no genuinely new post-15:08 gauge-first evidence path surfaced.
  - I stopped conservatively instead of re-litigating those same candidates as fake fresh discovery.
  - Current best next-implementation targets remain `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton`, but both still depend on MN DNR CSG gauges rather than the current USGS-only ingestion path.
  - Current best preserve-for-cleanup targets remain `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`.
  - `Chippewa River - Lentz Access to Watson Lion's Park` and `Des Moines River - Mayflower Park to Christianna Bridge` remain correctly parked at `threshold_weak` because both still fail route-specific gauge-fit quality.
  - `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` was listed here as `no_live_gauge`, but that blocker was later superseded when MN DNR gauge support was confirmed and the route was added on 2026-04-27.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 15:40 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then sanity-checked the current codebase for live-gauge support.
  - No fresh Minnesota-first evidence path surfaced after the 15:28 pass, so this run stayed bounded instead of re-litigating stale `research_later` or `rejected` holdovers.
  - The current implementation blocker remains unchanged: `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton` are still the best queued `likely_addable` routes in content terms, but the app still only ingests `provider: 'usgs'` gauges through `src/lib/usgs.ts` and route typing still expects `provider: 'usgs'`, so adding either DNR-CSG-dependent route now would still ship a dead gauge.
  - The clean preserve-for-later set also remains unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` still look good enough to keep at `needs_manual_coordinates` rather than downgrading.
  - `Chippewa River - Lentz Access to Watson Lion's Park` and `Des Moines River - Mayflower Park to Christianna Bridge` were deliberately not re-reviewed because both remain correctly parked at `threshold_weak`. `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` was later promoted and added on 2026-04-27.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 16:58 America/Chicago.
  - Reviewed 2 fresh Otter Tail candidates from 2 fresh gauge-adjacent route clusters, plus 1 additional non-yield Zumbro follow-on cluster, instead of rehashing the stale bounded queue.
  - Set aside as `no_live_gauge` on this pass, later superseded by the 2026-04-27 add:
    - `Otter Tail River - Wannigan Road carry-in access to Riverside Park carry-in access` — MN DNR explicitly recommends this 8.4-mile upstream Otter Tail day trip and names both endpoints cleanly, but this pass still did not surface a defensible route-level live gauge pairing or numeric ladder. It was later added as a conservative proxy route after confirming MN DNR gauge support and intentionally limiting the model to a minimum-only downstream-proxy floor.
    - `Otter Tail River - Phelps Mill County Park carry-in access to West Red River Lake trailer access` — another explicit MN DNR recommended day trip with clean endpoint names, but the same gauge problem remains: official trip support is real while the live-gauge story is still too vague to ship.
  - Explored non-yield gauge cluster: `Zumbro River at Zumbro Falls, MN` plus the official `Zumbro Falls to Hammond` follow-on corridor. The same-gauge idea is attractive because the live USGS site is direct and already trusted on nearby Zumbro routes, but this pass did not surface clear public endpoint names for the Hammond trip from the current route materials, so it did not clear the preserve-for-implementation bar.
  - Fresh-discovery takeaway: fresh Minnesota DNR day trips still exist beyond the earlier central-Minnesota queue, but some otherwise real official recommended trips still fail because the product bar is live-gauge clarity first, not route-shape quality alone.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first same-gauge follow-on sweep at 17:08 America/Chicago.
  - Reviewed 1 fresh candidate from the `Zumbro River at Zumbro Falls, MN` cluster instead of reopening stale holdovers.
  - Parked as `threshold_weak`:
    - `Zumbro River - Village Park to Theilman Access` — re-mining MN DNR Map 2 fixed the prior endpoint-name blocker by clearly naming `Village Park` at Hammond and `Theilman` carry-in access on the same official main-stem corridor. The live USGS gauge fit is good, but the numeric threshold package is still stitched from neighboring `Miles Paddled` reaches rather than a clean exact-route ladder for this official Hammond-to-Theilman segment.
  - Fresh-discovery takeaway: the Zumbro cluster still has some life when the map PDFs are read directly, but gauge adjacency alone is not enough if the route-specific threshold story still has to be inferred from neighboring subreaches.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 16:28 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, the normalized candidate ledger, and the bounded old seed list.
  - No genuinely fresh Minnesota-first gauge-first evidence path surfaced beyond the queue already built earlier today, so this run stopped conservatively instead of pretending the same Zumbro, Otter Tail, Des Moines, or stale old-repo holdovers were new work.
  - The best near-term queue remains unchanged:
    - `likely_addable`: `Long Prairie River - Long Prairie to Browerville`, `Pomme de Terre River - Larson to Appleton`
    - `needs_manual_coordinates`: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`
    - `threshold_weak`: `Chippewa River - Lentz Access to Watson Lion's Park`, `Des Moines River - Mayflower Park to Christianna Bridge`, `Zumbro River - Village Park to Theilman Access`
    - `no_live_gauge`: `Otter Tail River - Phelps Mill County Park carry-in access to West Red River Lake trailer access`
  - Fresh-discovery takeaway: the current hit-rate gain is in implementation follow-through on the preserved Minnesota queue, not in forcing another weaker discovery pass from the same evidence pool.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 16:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the current candidate ledger.
  - I deliberately stayed bounded to the existing fresh Minnesota queue instead of re-litigating stale `research_later`, `threshold_weak`, or `rejected` holdovers with no new evidence.
  - No route was added. The two `likely_addable` candidates remain `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton`, but both are still blocked by live-data integration because the current app path is USGS-only while both routes depend on MN DNR CSG gauges.
  - The three `needs_manual_coordinates` candidates remain worth preserving as-is: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`.
  - I intentionally did not reopen the stale bounded holdovers (`Whitewater River - Elba to Highway 74`, `Vermilion River - Twomile Creek Access to Eightmile Creek Access`, `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`, `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`, `Namekagon River - County Road K Landing to Riverside Landing`, `St. Croix River - Osceola Landing to Somerset Landing`, `Little Turkey River - U Avenue to Eldorado`, `Crawfish River - County Road I to County Road G`) because no new evidence changed their blockers.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 16:48 America/Chicago.
  - Reviewed 3 fresh official recommended-trip candidates from 4 fresh DNR gauge clusters instead of reopening the stale bounded queue.
  - Set aside as `no_live_gauge`:
    - `Red Lake River - Smiley Bridge to Centennial Park` — clean official beginner-friendly day trip, direct Thief River Falls DNR ladder, but the live story is still DNR CSG only rather than a defensible live USGS feed the current product can ship.
    - `Pine River - Rock Dam to Harvey Drake access` — clean official lower-Pine day trip with a strong Jenkins DNR ladder, but again the live story is DNR CSG only rather than a shippable USGS pairing.
    - `Little Fork River - Veterans Park to Highway 73 bridge` — clean official experienced-paddler day trip with a strong Linden Grove / Highway 73 DNR ladder, but the same DNR-only live-feed blocker remains.
  - Explored non-yield gauge cluster: `Watonwan River nr Garden City, CSAH13`. The DNR ladder is real, but this pass did not surface a comparably clean official recommended day-trip package near the gauge, so no candidate was queued from that cluster.
  - Fresh-discovery takeaway: there are still real Minnesota water-trail candidates left, but another chunk of them die on the same product truth — strong official DNR ladders are not enough for `likely_addable` if the current app can only ship working USGS live feeds and charts.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first sweep at 18:15 America/Chicago.
  - Reviewed 1 fresh candidate from the `Red River of the North near Georgetown, MN` cluster plus 2 additional non-yield clusters instead of reopening the stale bounded queue.
  - Parked as `threshold_weak`:
    - `Red River of the North - Kidder Recreation Area to Brushvale Bridge Recreation Area` — MN DNR explicitly recommends this 10.4-mile day trip and names both recreation-area endpoints clearly, while `USGS 05062130` at Georgetown is a nearby same-corridor live gauge. The blocker is threshold quality: this pass did not surface route-level numeric guidance tying the Georgetown gauge to a conservative shipped model for the Kidder-to-Brushvale reach.
  - Explored non-yield gauge cluster: `Shell Rock River near Glenville / Gordonsville`. Fresh USGS support exists on the corridor, but the current official recommended outing on the Minnesota DNR page is lake-only around Albert Lea Lake rather than a clean river day trip, so it did not produce a route candidate worth queuing.
  - Explored non-yield gauge cluster: `Watonwan River near Garden City / Madelia`. Fresh USGS sites exist on the river, but the current DNR trail materials surfaced maps and general river context rather than a comparably clean named recommended day trip near the gauge cluster.
  - Fresh-discovery takeaway: fresh USGS-backed border and southern-Minnesota clusters still exist, but the remaining misses are mostly route-package and threshold-quality problems rather than simple gauge absence.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 17:28 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - No genuinely fresh Minnesota-first gauge-first evidence path surfaced beyond the queue already built earlier today, so the run stopped conservatively instead of re-litigating the same holdovers as fake discovery.
  - The best queue remains unchanged:
    - `likely_addable`: `Long Prairie River - Long Prairie to Browerville`, `Pomme de Terre River - Larson to Appleton`
    - `needs_manual_coordinates`: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`
    - `threshold_weak`: `Chippewa River - Lentz Access to Watson Lion's Park`, `Des Moines River - Mayflower Park to Christianna Bridge`, `Zumbro River - Village Park to Theilman Access`, `Red River of the North - Kidder Recreation Area to Brushvale Bridge Recreation Area`
    - `no_live_gauge`: `Otter Tail River - Phelps Mill County Park carry-in access to West Red River Lake trailer access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`
  - Fresh-discovery takeaway: the remaining Minnesota-first opportunities are now mostly sorted by product-fit blockers, especially DNR-only live feeds and route-specific threshold quality, not by lack of named routes.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Implementation pass at 17:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - Rechecked the earlier live-data blocker in code instead of trusting the prior assumption. The current app already supports MN DNR live gauges: `src/lib/gauges.ts` dispatches `provider: 'mn_dnr'`, `src/lib/mn-dnr.ts` fetches live DNR current readings, and `src/scripts/river-detail-page.js` explicitly renders a current-level fallback panel when DNR does not provide recent chart samples.
  - Added `Pomme de Terre River - Larson Landing to Appleton` as the one clean route for this run because it has a direct official DNR gauge, a full official five-band ladder, clear official endpoint names with resolved coordinates, a practical 6-mile beginner route shape, and no unresolved access or duplicate-coverage conflict.
  - Chose `Pomme de Terre` over `Long Prairie River - Long Prairie to Browerville` because the Appleton route is the shorter, cleaner beginner day trip and both share the same now-confirmed MN DNR live-data implementation path.
  - `Long Prairie River - Long Prairie to Browerville` remains correctly parked as `likely_addable` for a future one-route run.
  - `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` remain correctly parked as `needs_manual_coordinates`.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 17:48 America/Chicago.
  - Reviewed 4 fresh gauge clusters and 1 fresh candidate instead of reopening the stale bounded queue.
  - Parked as `threshold_weak`:
    - `Red River of the North - Kidder Recreation Area to Brushvale Bridge Recreation Area` — MN DNR explicitly recommends this 10.4-mile day trip and names both recreation-area endpoints clearly, while `USGS 05062130` near Georgetown is a nearby same-corridor live gauge. The blocker is still threshold quality: this pass did not surface route-level numeric guidance tying the Georgetown gauge to a conservative shipped model for the Kidder-to-Brushvale reach.
  - Explored non-yield gauge cluster: `Shell Rock River near Gordonsville, MN` / `Shell Rock River near Northwood, IA`. Fresh USGS support exists on the corridor, but the current Minnesota DNR water-trail package still resolves mostly as a headwaters/lake-to-border trail rather than a clean route-specific recommended day trip with a route-ready threshold story.
  - Explored non-yield gauge cluster: `Watonwan River near Garden City, MN` / `Watonwan River near Madelia, MN`. Fresh USGS sites exist on the river, but the current DNR trail materials surfaced general corridor context and a broad 30-mile Madelia-to-confluence idea rather than a tighter named day trip near the gauges.
  - Explored non-yield gauge cluster: `Des Moines River at Jackson, MN`. Rechecked against the official DNR river page and the `Mayflower Park to Christianna Bridge` candidate remains correctly parked at `threshold_weak`; the only official ladder surfaced still belongs downstream at Jackson and is not tied tightly enough to the upstream Windom-area route.
  - Fresh-discovery takeaway: the remaining Minnesota-first USGS-backed misses are mostly failing on route-package tightness and threshold calibration, not because official river pages or gauges are missing entirely.

- 2026-04-26: Conservative route-triage pass at 18:08 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the candidate ledger, then did one additional fresh Minnesota-first gauge-first sanity sweep against official DNR segment pages.
  - Reviewed 1 fresh candidate and 2 fresh non-yield clusters.
  - Kept `Red River of the North - Kidder Recreation Area to Brushvale Bridge Recreation Area` at `threshold_weak`. New evidence path was the current Red River DNR segments page itself: it still says to check water levels before the trip, but it does not provide a numeric route ladder or other manager guidance tying `USGS 05062130` at Georgetown to a conservative shipped model for this exact reach.
  - Explored non-yield cluster: `Long Prairie River at Long Prairie, MN`. No new blocker surfaced; this was a sanity recheck confirming `Long Prairie to Browerville` still belongs at `likely_addable` after the same-day `Pomme de Terre` add.
  - Explored non-yield cluster: `Watonwan River near Garden City / Madelia`. Official page still presents broad corridor context and a 30-mile Madelia-to-confluence outing rather than a tighter gauge-ready recommended day trip, so no new candidate was queued.
  - Fresh-discovery takeaway: the best next implementation target remains `Long Prairie River - Long Prairie to Browerville`; the remaining fresh Minnesota misses continue to fail on route-specific threshold support, not on route existence.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first recommendation-page sweep at 18:28 America/Chicago.
  - Reviewed 2 fresh official DNR recommended corridors that had not been logged yet instead of reopening stale threshold-weak holdovers.
  - Parked as `duplicate_corridor`:
    - `North Fork Crow River - Crow-Hassan Park Reserve to Crow/Dayton Public Water Access` — official recommendation is real, but it mostly duplicates the existing split coverage strategy: queued `City of Rockford trailer access to Riverside County Park` plus the live `Riverside County Park to Dayton` route already span the same downstream corridor in cleaner product-sized units.
    - `St. Croix River - Interstate State Park Landing to William O'Brien State Park Landing` — official recommendation is real, but the app already covers the same lower-St. Croix corridor with `Interstate to Osceola` and `Osceola to William O'Brien`, so the longer combined listing would add overlap more than utility.
  - Fresh-discovery takeaway: the official DNR recommendation pages still hold real route ideas, but some of the remaining Minnesota-first misses are duplicate-corridor problems rather than gauge or endpoint problems. That is a useful queue-cleaning result because it argues against spending more time on longer combined corridors that the current product already covers in better decision units.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative recommendation-page sweep at 18:48 America/Chicago.
  - Reviewed 3 fresh Minnesota-first official recommendation-page clusters instead of reopening stale `threshold_weak` or `research_later` holdovers: Cannon River, Rum River, and Minnesota River recommended-trip pages.
  - `Cannon River` cluster did not yield a new candidate. The current official recommendation still centers on `Riverside Park (Cannon Falls) to Miesville Ravine County Park`, with the longer Welch extension explicitly noting weak public-access quality at Welch. That leaves the cluster blocked exactly where the queue already knows it is blocked: the Miesville route is still `blocked_until_date` because of the official access closure, and the Welch continuation still does not clear the endpoint-trust bar.
  - `Rum River` cluster did not yield a new candidate. The current official recommendation is the already-live `Martin's Landing to Rum River North County Park` route, so the cluster was a coverage sanity check rather than fresh queue value.
  - `Minnesota River` recommendation-page path did not yield a usable route review on this pass because the expected DNR recommended-trip page did not expose a clean route block from this fetch path, so there was no genuinely new evidence package to log as a candidate.
  - Fresh-discovery takeaway: recommendation-page mining is now low yield on the remaining Minnesota-first set because the clean obvious trips are either already in V2, already queued, or still blocked by the same access-trust problem. That argues for future sweeps to go back to gauge-cluster discovery rather than spending more time on already-known recommendation pages.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative gauge-cluster sanity pass at 19:08 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger before doing a bounded fresh-cluster sweep.
  - Reviewed 3 fresh Minnesota-first gauge-adjacent coverage clusters and deliberately did not force a weak new candidate from any of them:
    - `Straight River at Faribault` cluster: the obvious gauge-adjacent day trip is already live as `Straight River - Krogh's Landing to Two Rivers Landing/Park`. Nearby same-river follow-ons did not surface a cleaner official route package or stronger threshold path than the existing live coverage, so the cluster was treated as saturated for now.
    - `Blue Earth River at Rapidan` cluster: the direct-gauge recommended day trip is already live as `Blue Earth River - Rapidan Dam Park carry-in access to County Road 90 bridge access`. Downstream or upstream same-gauge follow-ons did not expose a clearly better official endpoint package than the current live route, so the cluster did not justify a duplicate or weaker add.
    - `Minnesota River at Jordan / Henderson-Belle Plaine` cluster: the strongest recommendation-page-shaped route near the gauge is already live as `Minnesota River - Henderson Station public water access to Belle Plaine public water access`. I did not surface a new tighter official subsegment with a better trust package than the current live route.
  - Fresh-discovery takeaway: the most obvious direct-gauge Minnesota clusters near current V2 coverage are now mostly saturated. The next useful breakthrough is more likely to come from genuinely new river systems or from cleaning the saved `needs_manual_coordinates` queue than from forcing follow-on segments off already-covered gauges.
  - No candidate statuses changed.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 19:28 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - Attempted one fresh Minnesota-first gauge-first sweep beyond the already-saturated near-coverage clusters, but the new evidence path did not mature into a trustworthy route review.
  - Fresh gauge/search cluster note: broad discovery attempts against Minnesota DNR / official route-search paths were low-yield from this runtime and did not return a new official route-plus-gauge package strong enough to log as a reviewed candidate.
  - I stopped conservatively instead of re-litigating stale holdovers or inventing a weak candidate from thin evidence.
  - Net result: no candidate statuses changed.
  - Current queue takeaway remains unchanged: the best next hit-rate gain is still in the already-preserved Minnesota queue, especially `needs_manual_coordinates` cleanup and the remaining direct-gauge DNR-backed opportunities already logged.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 19:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the candidate ledger exactly as instructed.
  - The ledger currently has no queued `likely_addable` candidates left: the former high-confidence DNR-backed Minnesota targets (`Pomme de Terre River - Larson to Appleton` and `Long Prairie River - Long Prairie to Browerville`) are already marked `added`, while the remaining active queue is split across `needs_manual_coordinates`, `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected`.
  - Per the run rules, I did not recycle stale holdovers from `research_later`, `threshold_weak`, or `rejected` as if they were fresh work because no genuinely new evidence path surfaced in this run.
  - The most relevant deliberately skipped candidates remain unchanged:
    - `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` still look content-strong but remain correctly parked at `needs_manual_coordinates` because authoritative endpoint coordinates are still missing.
    - `Chippewa River - Lentz Access to Watson Lion's Park`, `Des Moines River - Mayflower Park to Christianna Bridge`, `Zumbro River - Village Park to Theilman Access`, and `Red River of the North - Kidder Recreation Area to Brushvale Bridge Recreation Area` remain correctly parked at `threshold_weak` because route-specific numeric threshold support is still not strong enough to ship conservatively.
    - `Otter Tail River - Phelps Mill County Park carry-in access to West Red River Lake trailer access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, and `Little Fork River - Veterans Park to Highway 73 bridge` remain correctly parked at `no_live_gauge` because their current live-data path is still DNR-only rather than a separately validated fresh add path for this run.
  - Net result: short no-add pass, no candidate statuses changed, and no code changes were made.
  - `npm test` and `npm run build` were not run because no product files changed on this pass.

- 2026-04-26: Conservative no-add pass at 19:48 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the candidate ledger.
  - Did one fresh Minnesota-first bounded discovery sweep instead of reopening stale holdovers. Fresh clusters checked:
    - `Mississippi River recommended trip #1` (`East River Flats Park` to `Hidden Falls Park`): no queue value because the exact route is already live in V2 and already documented with a stronger route package than anything new surfaced from the recommendation page.
    - `Mississippi River recommended trip #2` (`Coon Rapids Dam Regional Park` to `North Mississippi Park`): no queue change because the recommendation page is real but it does not fix the known blocker already recorded in memory — there is still no defensible route-level live gauge / threshold model strong enough for this exact metro reach.
    - `North Fork Crow recommended trip` (`Crow-Hassan Park Reserve` to `Crow/Dayton Public Water Access`): no queue change because the official recommendation is already tracked as `duplicate_corridor`, and this run surfaced no new evidence that would make the long combined corridor more useful than the existing split coverage strategy.
  - Fresh-discovery takeaway: recommendation-page mining on the remaining Minnesota-first set is now mostly saturated. The official pages are still useful for corridor sanity checks, but they are not currently producing better add candidates than the queue already holds.
  - I stopped conservatively instead of pretending those same already-known corridors were fresh candidate reviews.
  - Net result: 0 new candidates reviewed, 0 status changes, no code changes, and no validation run.

- 2026-04-26: Conservative no-add pass at 20:28 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger.
  - No queued `likely_addable` candidate remains: the earlier direct-gauge Minnesota wins are already shipped, while the active queue is still split across `needs_manual_coordinates`, `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected`.
  - I deliberately did not re-litigate stale `research_later`, `threshold_weak`, or `rejected` holdovers because this run did not surface a genuinely new official route page, new official gauge guidance, new threshold evidence, or new endpoint coordinates.
  - Fresh-discovery takeaway remains unchanged from the late-afternoon sweeps: the best hit-rate improvement now comes from coordinate cleanup on the preserved Minnesota `needs_manual_coordinates` set and from waiting for genuinely new manager guidance on the threshold-weak routes, not from padding the ledger with weaker proxy corridors.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.

- 2026-04-26: Conservative no-add pass at 20:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - There are still no queued `likely_addable` candidates. The previously strongest direct-gauge Minnesota adds are already shipped, and the remaining queue is still correctly partitioned across `needs_manual_coordinates`, `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected`.
  - Per the run rules, I did not recycle stale `research_later`, `threshold_weak`, or `rejected` holdovers as fake fresh work because no genuinely new evidence path surfaced in this pass.
  - Deliberately skipped as unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` remain correctly parked at `needs_manual_coordinates`; `Chippewa River - Lentz Access to Watson Lion's Park`, `Des Moines River - Mayflower Park to Christianna Bridge`, `Zumbro River - Village Park to Theilman Access`, and `Red River of the North - Kidder Recreation Area to Brushvale Bridge Recreation Area` remain correctly parked at `threshold_weak`; the current `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-26: Conservative no-add pass at 20:48 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then did one bounded fresh Minnesota-first discovery sweep.
  - Fresh search path checked: the current MN DNR `recommended` index and its six linked trip pages (`Cannon`, `North Fork Crow`, `Mississippi #1`, `Mississippi #2`, `Rum`, `St. Croix`). This path is now effectively saturated for triage purposes.
  - No fresh candidate was reviewed because the pages only pointed back to already-live routes, already-logged duplicate corridors, or already-known blocked corridors (`Cannon Falls to Miesville` access closure, `Coon Rapids Dam to North Mississippi Park` missing route-level gauge/threshold model).
  - Fresh-discovery takeaway: recommendation-page mining is no longer where the next hit-rate gain lives. Future runs should keep favoring new gauge clusters or coordinate cleanup on the saved `needs_manual_coordinates` set instead of re-reading the same six DNR recommendation pages.
  - Net result: 0 candidates reviewed, 0 promotions, 0 rejections, no code changes, and no validation run.

- 2026-04-26: Conservative no-add pass at 21:28 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then tried a fresh Minnesota-first search path instead of reopening stale route reviews.
  - Fresh discovery path tested: official Minnesota DNR page hunt for `Buffalo River` and `Wild Rice River` water-trail coverage plus a quick sanity recheck of the already-known `Red River of the North` trail page.
  - Result: no fresh candidate was reviewable. `Red River` only reaffirmed the already-logged `Kidder Recreation Area to Brushvale Bridge Recreation Area` threshold gap, while the Buffalo and Wild Rice hunts were still low-yield from this runtime because straightforward official DNR water-trail URL patterns returned 404 and did not expose a clean route page or live-gauge story worth logging as a candidate.
  - Fresh-discovery takeaway: brute-force DNR page guessing is not a good use of future runs. Revisit Buffalo or Wild Rice only if a direct official page URL, sitemap lead, or other manager source surfaces first.
  - Net result: 0 candidates reviewed, 0 promotions, 0 rejections, no code changes, and no validation run.

- 2026-04-26: Conservative no-add pass at 21:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - The ledger still has no queued `likely_addable` candidates. The best remaining queue is unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` stay at `needs_manual_coordinates`; the current `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged.
  - Per the run rules, I did not re-review stale holdovers in `research_later`, `threshold_weak`, or `rejected` because no genuinely new official route page, new gauge guidance, new threshold evidence, or new endpoint coordinates surfaced in this run.
  - Fresh-discovery takeaway remains unchanged: the next useful hit-rate gain is still coordinate cleanup on the preserved Minnesota `needs_manual_coordinates` set rather than re-litigating the same blocked shortlist.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Conservative no-add gauge-cluster pass at 23:28 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then checked two fresh official Minnesota gauge-adjacent clusters instead of reopening stale threshold-weak holdovers.
  - Explored non-yield gauge cluster: `Cedar River near Austin, MN` plus the official `Riverwood Landing to State Line Road` corridor. The current official Cedar water-trail page still exposes only that same downstream segment, which is already correctly parked as `rejected` for threshold-quality reasons, and this pass did not surface a cleaner same-gauge day trip with stronger trust support.
  - Explored non-yield gauge cluster: `Redwood River` official one-segment trail plus the `Redwood River at Marshall / Russell / Redwood Falls` live-gauge family. The ladder support is real, but the route opportunities still collapse back into the already-known lower-Redwood / Redwood Falls corridor where lake, dam, and shuttle ambiguity prevent a cleaner short day-trip candidate.
  - Fresh-discovery takeaway: the remaining unmined Minnesota-first value is no longer in the obvious one-segment DNR pages. Cedar and Redwood both reconfirmed that some rivers have live gauges but still do not produce a cleaner product-sized route than the queue already knows about.
  - Net result: 0 new candidates reviewed, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Conservative no-add sitemap-assisted gauge pass at 00:08 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then used the live MN DNR sitemap instead of guessed URL patterns to confirm canonical water-trail slugs before doing a bounded fresh Minnesota-first sweep.
  - Useful process discovery: `https://www.dnr.state.mn.us/sitemap.xml?page=1` exposes the real water-trail slug set (`bigforkriver`, `redwoodriver`, `stlouisriver`, etc.). Future runs should use the sitemap first instead of brute-force DNR URL guessing like `buffalo` or `wild_rice`, which had been wasting cycles on 404s.
  - Explored non-yield gauge cluster: `Big Fork River at Bigfork / Highway 38` plus the official `Highway 6 (S) to Highway 6 (N)` recommended trip. Cluster is now saturated for discovery: the route is already preserved in the ledger as `needs_manual_coordinates`, and this pass surfaced no cleaner same-gauge follow-on route near Bigfork.
  - Explored non-yield gauge cluster: `St. Louis River` upper segment pages. The same `County Road 4 to County Road 95` route remains the only clean official day-trip package surfaced here, and it is already parked at `no_live_gauge`; no fresh live-gauge evidence changed that blocker.
  - Explored non-yield gauge cluster: `Redwood River` canonical DNR page recheck. Canonical slug confirmation did not change the route outcome: the practical lower-river opportunities still run into Lake Redwood / dam / shuttle ambiguity rather than a cleaner short direct-gauge day trip.
  - Fresh-discovery takeaway: canonical DNR slug discovery is valuable, but this pass still did not surface a genuinely new candidate with a new evidence path strong enough to log as reviewed. The next useful hit-rate gain is still more likely to come from coordinate cleanup on the saved `needs_manual_coordinates` set than from more brute-force page hunting.
  - Net result: 0 new candidates reviewed, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Conservative no-add sitemap follow-up at 00:28 America/Chicago.
  - Re-read `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then did one more bounded Minnesota-first discovery pass using the sitemap-confirmed DNR water-trail list instead of guessed URLs.
  - Explored non-yield cluster: `Buffalo River` Minnesota DNR hunt. Result stayed negative even after the sitemap-first correction: the current sitemap-backed water-trail list does not expose a Buffalo River trail slug, so there is still no clean official MN DNR route page or live-gauge path to review from this runtime. Revisit only if a direct official Buffalo trail URL or another manager source surfaces.
  - Explored non-yield cluster: `Wild Rice River` Minnesota DNR hunt. Same outcome as Buffalo: no canonical water-trail slug surfaced from the live DNR sitemap, so earlier guessed-URL 404s were not missing a hidden obvious page. Revisit only if a direct official trail page or other manager source appears.
  - Explored non-yield cluster: sitemap-backed canonical slug sanity list (`redwoodriver`, `stlouisriver`, `bigforkriver`, `shellrockriver`, `ottertailriver`, `redlakeriver`). This was a process check, not a candidate review; it confirmed the current Minnesota-first queue already covers the route-shaped value currently discoverable from the official DNR slug set.
  - Fresh-discovery takeaway: the next useful Minnesota-first hit-rate gain is unlikely to come from more brute-force page hunting for missing river slugs. Future runs should bias toward coordinate cleanup on the preserved `needs_manual_coordinates` set or genuinely new official gauge/route releases.
  - Net result: 0 new candidates reviewed, 0 status changes, no code changes, and no validation run.

- 2026-04-26 / 2026-04-27: Conservative no-add pass at 11:40 PM America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - The ledger still has no queued `likely_addable` candidate. The former strongest direct-gauge Minnesota adds are already shipped, and the active queue remains correctly partitioned across `needs_manual_coordinates`, `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected`.
  - Per the run rules, I did not reopen stale `research_later`, `threshold_weak`, or `rejected` holdovers because no genuinely new evidence path surfaced in this run.
  - Deliberately skipped as unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, and `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` remain correctly parked at `needs_manual_coordinates`; the current `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Conservative no-add gauge-cluster pass at 1:08 AM America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - Used the live MN DNR sitemap again to confirm canonical water-trail coverage before doing a bounded fresh Minnesota-first sweep. That process is still useful, but this pass again confirmed that the obvious official slug set is mostly mined out for clean route-triage value.
  - Explored non-yield gauge cluster: `Cedar River near Austin, MN` plus the official `Riverwood Landing to State Line Road` corridor. Outcome unchanged: the only clean official route package surfaced there is the already-rejected state-line segment, and this pass did not produce a stronger same-gauge day trip or fresh threshold evidence.
  - Explored non-yield gauge cluster: `Redwood River` canonical DNR trail plus the `Marshall / Russell / Redwood Falls` live-gauge family. Outcome unchanged: ladder support is real, but the practical lower-river opportunities still collapse into the same Redwood Lake / dam / shuttle ambiguity rather than a tighter direct-gauge day trip worth queueing.
  - Explored process-only non-yield path: the canonical Minnesota DNR water-trail sitemap slug list itself (`bigforkriver`, `redwoodriver`, `stlouisriver`, `shellrockriver`, `ottertailriver`, `redlakeriver`, etc.). It reaffirmed that the current active Minnesota queue already covers the route-shaped value presently discoverable from the official slug set.
  - Fresh-discovery takeaway: the next hit-rate gain is still more likely to come from coordinate cleanup on the preserved `needs_manual_coordinates` set than from continuing to brute-force already-mined one-page DNR river systems.
  - Net result: 0 new candidates reviewed, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Fresh Minnesota-first Red River segment-page sweep at 1:28 AM America/Chicago.
  - Reviewed 2 fresh candidates from 1 genuinely new official evidence path instead of reopening stale threshold-weak holdovers: the unmined Red River `Map 2` and `Map 6` segment pages.
  - Parked as `threshold_weak`:
    - `Red River of the North - North Dam to M.B. Johnson Park` — MN DNR explicitly recommends this short 3.1-mile Moorhead/Fargo day trip and clearly names both endpoints on Map 2, but the official page still only says to check water levels and warns that low water may not be suitable for boating. I did not find a numeric route model tying any live gauge cleanly to this exact urban subreach.
    - `Red River of the North - Golden Grain trailer access to Hilltop trailer access` — MN DNR explicitly recommends this 9-mile far-north day trip and clearly names both endpoints on Map 6, but the same threshold problem holds: the official page gives only generic water-level caution and no numeric route model for the exact trip.
  - Fresh gauge/search cluster note: `Red River of the North` segment-page mining still has some remaining official route-shape value beyond the earlier Georgetown and Grand Forks reviews, but the misses are still threshold-quality problems rather than endpoint naming problems.
  - Fresh-discovery takeaway: the Red River family now looks better mined for route definition than before, but still not ready for implementation because the official manager guidance keeps stopping at `check water levels` instead of tying a live gauge to a conservative shipped model.
  - Net result: 2 candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.

- 2026-04-27: Conservative no-add pass at 1:40 AM America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - No queued `likely_addable` candidate exists right now, and this run did not surface a fresh new-evidence candidate strong enough to outrank the current preserved queue.
  - Per the run rules, I did not recycle stale `research_later`, `threshold_weak`, or `rejected` holdovers as fake fresh work.
  - Deliberately skipped as unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, and `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` remain correctly parked at `needs_manual_coordinates`; the current `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-26 / 2026-04-27: Conservative no-add gauge hunt at 11:48 PM America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then did one bounded fresh Minnesota-first discovery sweep instead of reopening stale holdovers.
  - Fresh cluster path checked: guessed official Minnesota DNR water-trail URLs for `Buffalo River` and `Wild Rice River` (`/watertrails/buffalo/...`, `/watertrails/wildrice/...`) still returned `404`, so this runtime did not surface a clean official route page, map, or gauge story worth logging as a reviewed candidate.
  - Fresh-discovery takeaway: brute-force DNR URL guessing is still a low-yield path. Revisit Buffalo or Wild Rice only if a direct official page URL, sitemap lead, or other manager source appears first.
  - Net result: 0 new candidates reviewed, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Fresh Minnesota-first Red River segment-page sweep at 12:48 AM America/Chicago.
  - Reviewed 2 fresh candidates from 1 fresh official segment-page evidence path instead of reopening stale threshold-weak holdovers.
  - Parked as `threshold_weak`:
    - `Red River of the North - County Road 25 trailer access to Halstad trailer access` — MN DNR explicitly recommends this 11.2-mile Georgetown-to-Halstad day trip and clearly names both endpoints on Map 3, while the nearby Georgetown USGS gauge is the cleanest live source on the corridor. The blocker is still threshold quality: the official page only says to check water levels and warns that low water may be unsuitable, but it does not tie the Georgetown gauge to a numeric route model for this exact trip.
    - `Red River of the North - Lincoln Drive Park landing to LaFave Park trailer access` — MN DNR explicitly recommends this short 2-mile Grand Forks / East Grand Forks day trip and clearly names both endpoints on Map 4, but this pass still did not surface a defensible route-level numeric threshold model or a cleaner exact-reach gauge story than the general Red River water-level warning.
  - Fresh-discovery takeaway: Red River segment-page mining still has some unlogged official route-shape value, but the remaining misses are still threshold-quality problems rather than endpoint naming or route legitimacy.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-27: Conservative no-add pass at 12:40 AM America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - No queued `likely_addable` candidate exists right now. The former strongest direct-gauge Minnesota wins are already shipped, and the remaining active queue still sits in `needs_manual_coordinates`, `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected`.
  - Per the run rules, I did not re-litigate stale `research_later`, `threshold_weak`, or `rejected` holdovers because no genuinely new official route page, new threshold evidence, new endpoint coordinates, or other fresh evidence path surfaced in this run.
  - Deliberately skipped as unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, and `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` remain correctly parked at `needs_manual_coordinates`; the current `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-26 gauge-cluster notes:
  - `South Fork Crow River at Delano, Bridge Ave` (MN DNR site 51, direct corridor gauge) -> produced 1 strong candidate. Revisit soon only for coordinate cleanup; discovery value is otherwise mostly spent.
  - `Watonwan River nr Garden City, CSAH13` (MN DNR site 254, direct corridor gauge) -> produced 1 holdover candidate, but the best short route was still a map-derived subsegment rather than a clearly recommended day trip. Revisit later only if new official route framing appears.
  - `Redwood River nr Redwood Falls, MN` plus upstream Redwood gauges (MN DNR sites 196/195/194) -> no candidate promoted. The cluster has real DNR ladder support, but the lower practical routes run into Redwood Lake / dam / shuttle ambiguity, and this pass did not find a cleaner short official day trip worth preserving.
  - `Red Lake River / Pine River / Little Fork River / Red River recommendation-page recheck` (2026-04-26 late pass) -> no new candidate status changes. The pages still only reaffirm already-logged blockers (`no_live_gauge` on Red Lake, Pine, and Little Fork because the surfaced live path is still DNR-only; `threshold_weak` on Red River Kidder-to-Brushvale because the page still says only to check water levels without a numeric route model).
  - `Buffalo River` and `Wild Rice River` Minnesota DNR water-trail page hunt (2026-04-26 late pass, rechecked at 21:28 America/Chicago) -> still a low-yield cluster-search dead end from this runtime. Straight guesses at likely DNR water-trail URLs returned 404, and the follow-up search still did not surface a clean official route page or live-gauge story worth reviewing. Revisit only if a direct official page URL, sitemap lead, or other manager source appears first.
  - `St. Louis River` upper-segment page sweep (2026-04-26 22:48 America/Chicago) -> produced 1 fresh candidate (`County Road 4 bridge to County Road 95 carry-in access`) but it stayed `no_live_gauge` because the official page only surfaced seasonal/qualitative flow context, not a route-operable live gauge model for conservative shipping. Revisit only if DNR, USGS, or other manager guidance ties a live site to this exact upper corridor.
  - `Shell Rock River` segment-page sweep (2026-04-26 22:48 America/Chicago, rechecked 23:08 America/Chicago) -> no candidate routes. The official recommended outing on the current Minnesota page is still lake-only on Albert Lea Lake, so the cluster does not currently produce a river route worth queueing. Revisit only if a true river day-trip recommendation or clearer live-gauge-backed river segment appears.
  - `Big Fork River at Bigfork / Highway 38` recheck (2026-04-26 23:08 America/Chicago) -> produced 1 status correction. `Highway 6 (S) to Highway 6 (N)` should not stay `no_live_gauge` now that the current app's MN DNR live-reading path is confirmed; the direct DNR gauge plus the official `below 4 ft` route floor is enough to preserve the route as `needs_manual_coordinates`. Revisit mainly for endpoint coordinate cleanup, not for more threshold hunting.
  - `Red River of the North` segment-page sweep (2026-04-27 00:48 America/Chicago) -> produced 2 fresh candidates from a genuinely new official evidence path: `County Road 25 trailer access to Halstad trailer access` (Map 3 recommended day trip) and `Lincoln Drive Park landing to LaFave Park trailer access` (Map 4 recommended day trip). Both stayed `threshold_weak` because the official pages still only say to check water levels and warn that low water may be unsuitable; they do not tie a numeric threshold model to the exact routes.
  - `Minnesota River` segment-page sweep (2026-04-27 02:48 America/Chicago) -> produced 2 fresh candidates from the official Map 3 / Map 6 day-trip pages. `Thompson Ferry Access to Carver Riverfront Park` was worth preserving at `needs_manual_coordinates` because the Jordan lower-Minnesota gauge story is operationally close and the route is shorter/cleaner than the broader downstream corridors; `Kinney Access to Skalbekken County Park` stayed `threshold_weak` because the best remaining live story still looks like broader proxy context rather than a clean same-route threshold package. Revisit the lower-Minnesota cluster for coordinate cleanup, not for more threshold hunting; revisit the Kinney/Skalbekken cluster only if direct route-level gauge guidance appears.



- 2026-04-26: Fresh Minnesota-first DNR gauge reassessment at 22:08 America/Chicago.
  - Re-read `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the candidate ledger, then sanity-checked the current product reality against the preserved DNR-backed holdovers.
  - Reviewed 4 candidates from 2 fresh evidence paths.
  - Promoted from stale `no_live_gauge` posture to `needs_manual_coordinates`:
    - `Red Lake River - Smiley Bridge to Centennial Park`
    - `Pine River - Rock Dam to Harvey Drake access`
    - `Little Fork River - Veterans Park to Highway 73 bridge`
  - Why they moved: the current app already supports `provider: 'mn_dnr'` live readings, each route has a direct official DNR ladder plus a clearly named official recommended trip, and the remaining blocker is coordinate cleanup rather than live-data viability.
  - Rechecked but did not promote: `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`. The route is still real and useful, but the current threshold story is still more qualitative / height-context-driven than the cleaner implementation-ready DNR ladder candidates.
  - Explored non-yield cluster: `St. Louis River at Floodwood, CSAH8` with the official `Paupores to Brookston` corridor. Official trip support is real, but the current gauge fit still looks too proxy-like and rapid-sensitive for a trust-first queue promotion.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26 gauge-cluster correction:
  - `Red Lake River / Pine River / Little Fork River` should no longer be treated as `no_live_gauge` merely because the surfaced official live path is MN DNR. Current product reality already supports `provider: 'mn_dnr'` live readings. The remaining blocker on those three routes is endpoint coordinate cleanup.

- 2026-04-26: Fresh Minnesota-first gauge-cluster sweep at 22:28 America/Chicago.
  - Reviewed 1 fresh candidate from 3 fresh cluster checks instead of reopening stale threshold-weak or research-later holdovers.
  - Parked as `threshold_weak`:
    - `Kettle River - Musclewood carry-in access to #1 trailer access` — MN DNR explicitly recommends this 16.5-mile day trip and clearly names both endpoints. The best live gauge story surfaced here is the direct-corridor MN DNR Willow River / Long Lake Road site, but the current threshold wording is still too qualitative for clean shipping: the page only says the route is best when that gauge reads `Medium` or above and that many rapids will be scrapeable in lower water.
  - Explored non-yield gauge cluster: `Shell Rock River` official trail page. No route candidate was queued because the current official recommended outing is lake-only on Albert Lea Lake rather than a river day trip with a live-gauge route story.
  - Explored non-yield gauge cluster: lower `Kettle River` around the `#5 trailer access to #6 trailer access` recommended trip. No queue change because that exact route is already live in V2, so the cluster is saturated for discovery rather than blocked.
  - Fresh-discovery takeaway: Kettle still has real queue value upstream of the existing lower route, but the next breakthrough there needs cleaner route-level threshold calibration, not more endpoint hunting.

- 2026-04-26: Conservative no-add pass at 22:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - The ledger still has no queued `likely_addable` candidate. The strongest remaining queue stays in non-shippable buckets: `needs_manual_coordinates` (`Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`), plus the existing `threshold_weak`, `duplicate_corridor`, `research_later`, and `rejected` sets.
  - Per the run rules, I did not reopen stale `research_later`, `threshold_weak`, or `rejected` holdovers as fake fresh work because no genuinely new evidence path surfaced in this run.
  - The freshest reviewed candidate also remains correctly parked: `Kettle River - Musclewood carry-in access to #1 trailer access` still does not clear the threshold bar because the current official guidance is only `best when the gauge reads Medium or above`, not a clean route-level numeric ladder.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 22:48 America/Chicago.
  - Reviewed 1 fresh candidate from 2 fresh cluster checks instead of reopening stale holdovers.
  - Parked as `no_live_gauge`:
    - `St. Louis River - County Road 4 bridge to County Road 95 carry-in access` — MN DNR explicitly recommends this 7.3-mile upper-river day trip and clearly names both endpoints, but this pass did not surface a defensible live gauge-plus-threshold package for the exact corridor. The official segment page gives seasonal and qualitative water-level context (`stream flow usually peaks in late April and falls throughout the summer`, upper reaches can be impassable at medium to low water) but not a shippable route-level live model.
  - Explored non-yield gauge cluster: `Shell Rock River` Minnesota segment page. The current official recommended outing is lake-only on Albert Lea Lake, with no fresh river day-trip package near a defensible live gauge path, so the cluster did not produce a route candidate worth queuing.
  - Fresh-discovery takeaway: the remaining unlogged Minnesota DNR pages still have some route-shape value, but several are failing at the same trust-first step — official route existence without a route-operable live gauge story.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-27: Fresh Minnesota-first St. Louis River segment-page sweep at 2:08 AM America/Chicago.
  - Reviewed 2 fresh candidates from 1 genuinely new official evidence path instead of reopening stale Red River threshold holds.
  - Set aside as `no_live_gauge`:
    - `St. Louis River - Paupores trailer access to Brookston trailer access` — MN DNR explicitly recommends this 7.9-mile middle-river day trip and clearly names both endpoints on Map 2, but the current official material still only gives seasonal / qualitative flow context and Class I-II rapid caution rather than a route-operable live gauge plus defensible threshold model.
    - `St. Louis River - Fond du Lac Reservoir to Oldenburg Falls` — MN DNR explicitly recommends this 6-7 mile flatwater round trip from Fond du Lac Reservoir, but the page only says water flow affects how close paddlers can get to the falls and warns to stay clear of the dam; no shippable live gauge or release model surfaced for conservative product use.
  - Fresh-discovery takeaway: the St. Louis trail pages still contain real official route-shaped value, but upper/middle St. Louis remains blocked more by live-gauge operability than by endpoint naming.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-27: Conservative no-add segment-page pass at 2:28 AM America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then checked two fresh official Minnesota-first gauge-adjacent segment clusters instead of reopening stale threshold holds.
  - Explored non-yield gauge cluster: `Kettle River` Map 2 (`#5 trailer access to #6 trailer access`). Useful outcome: the official recommended trip is already live in V2, and the page did not surface a cleaner same-gauge follow-on route than the already-logged `Musclewood carry-in access to #1 trailer access` candidate. That keeps the Kettle cluster discovery-saturated for now rather than queue-worthy.
  - Explored non-yield gauge cluster: `Otter Tail River` Map 1 / Map 2 (`Wannigan Road to Riverside Park`, `Phelps Mill Park to West Red River Lake`). Outcome unchanged: both official day trips are real, but the current pages still stop at favorable-water / late-spring guidance and do not tie a live gauge plus numeric model cleanly enough to either exact route.
  - Fresh-discovery takeaway: the remaining obvious Minnesota DNR segment-page value is now mostly mined on these systems. The next hit-rate gain is more likely to come from coordinate cleanup on the preserved `needs_manual_coordinates` set or from genuinely new official gauge guidance, not from re-reading already-known Kettle and Otter Tail segment pages.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.

- 2026-04-27: Conservative no-add pass at 2:40 AM America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - The ledger still has no queued `likely_addable` candidate, so this run did not force a weak fresh review or reopen stale `research_later`, `threshold_weak`, or `rejected` holdovers without new evidence.
  - Deliberately skipped as unchanged: the preserved `needs_manual_coordinates` set (`Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, and `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`) remains the highest-value next queue, while the current `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged.
  - Fresh-discovery takeaway: the obvious official Minnesota-first route/gauge pool is still saturated enough that future runs should keep preferring coordinate cleanup on the preserved `needs_manual_coordinates` routes or genuinely new evidence paths instead of recycling the same blocked shortlist.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-27 gauge-cluster note:

  - `Snake River` upper segment-page sweep (`Silver Star Road access to Lower Falls Campsite`) -> produced 1 fresh candidate, but it stayed `threshold_weak` because the exact official day trip still lacks a route-level live gauge / numeric threshold package. The only already-proven live story surfaced on this pass is the downstream Pine City gauge family, which should not be ported onto the upper forest segment by guesswork. Revisit only if MN DNR, USGS-adjacent guidance, or other strong same-route evidence ties a live gauge directly to the Silver-Star-to-Lower-Falls reach.
  - `Blue Earth River at Rapidan` recheck -> discovery-saturated cluster. The only clean direct-gauge recommended day trip is already live in V2 (`Rapidan Dam Park carry-in access to County Road 90 bridge access`), and this pass did not surface a better same-gauge follow-on.
  - `Straight River at Faribault` recheck -> discovery-saturated cluster. The direct-gauge route value is already captured by the live `Krogh's Landing to Two Rivers Landing/Park` route, and the current DNR page still does not expose a new recommended day trip worth queueing.
  - lower `Snake River` around `Canary Road / Cross Lake / Pine City` recheck -> discovery-saturated cluster. The strongest official same-gauge route is already live in V2, and this pass did not surface a new short same-gauge reach that would add more value than overlap.
  - `St. Louis River` Map 2 / Map 3 segment-page sweep -> produced 2 fresh official route candidates (`Paupores to Brookston`, `Fond du Lac Reservoir to Oldenburg Falls`), but both stayed `no_live_gauge` because the current DNR pages stop at qualitative flow language rather than tying a live site or release model to a conservative shipped route. Revisit only if DNR, USGS, hydropower, or park-manager guidance surfaces a route-operable live data story.
  - `Kettle River` Map 2 (`#5 trailer access to #6 trailer access`) -> discovery-saturated cluster. The official recommended trip is already live in V2, and the page did not surface a cleaner same-gauge follow-on route than the already-logged `Musclewood to #1 trailer access` threshold-weak hold. Revisit only if a different official Kettle segment exposes a new route-specific threshold path.
  - `Otter Tail River` Map 1 / Map 2 recheck (`Wannigan Road to Riverside Park`, `Phelps Mill Park to West Red River Lake`) -> no new evidence beyond the already-logged `no_live_gauge` blocker. The official pages still say the trips are best with late-spring / favorable levels but do not tie a live gauge and numeric model cleanly enough to either exact route. Revisit only if MN DNR or USGS guidance publishes a route-operable live-gauge pairing.
  - `Crow Wing River` upper segment sweep (`Huntersville (N) carry-in access to Mary Brown Rest Area carry-in access`) -> produced 1 fresh official route candidate, but it stayed `no_live_gauge` because the route page gives a clean day-trip package without a defensible live gauge/threshold model for the exact upper corridor. The current Nimrod live story is materially downstream and should not be ported upstream by guesswork. Revisit only if MN DNR, USGS, or other manager guidance ties a live site directly to the Huntersville-to-Mary-Brown reach.
  - `Blue Earth River at Rapidan` recheck -> discovery-saturated cluster. The only clean direct-gauge recommended day trip is already live in V2 (`Rapidan Dam Park to County Road 90`), and this pass did not surface a better same-gauge follow-on.
  - `Straight River at Faribault` recheck -> discovery-saturated cluster. The direct-gauge route value is already captured by the live `Krogh's Landing to Two Rivers Landing/Park` route, and this pass did not surface a cleaner same-gauge follow-on.
- 2026-04-27: Fresh Minnesota River segment-page sweep at 02:48 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then used one bounded fresh Minnesota-first official segment-page path instead of reopening stale threshold holds.
  - Reviewed 2 fresh candidates from 1 genuinely new official evidence path family:
    - `Minnesota River - Thompson Ferry Access to Carver Riverfront Park` -> `needs_manual_coordinates`
      - MN DNR Map 6 explicitly recommends the exact route, clearly names both endpoints, and the existing Jordan lower-Minnesota DNR ladder is a usable operational fit for this shorter downstream reach.
      - Remaining blocker is only authoritative coordinate lookup for the two endpoints.
    - `Minnesota River - Kinney Access to Skalbekken County Park` -> `threshold_weak`
      - MN DNR Map 3 clearly recommends the exact route and names both endpoints, but this pass still did not surface a clean route-level gauge/threshold package for conservative shipping.
      - The best live story still looks like broader Minnesota River proxy context rather than a clean same-route sensor-backed model.
  - Fresh cluster takeaway: the Minnesota River segment pages can still yield preservable day trips when they stay close to an already-proven lower-river gauge story, but upstream/mainstem segments still degrade quickly into proxy-threshold guesswork.
  - Net result: 2 candidates reviewed, 0 promoted to `likely_addable`, 1 added to `needs_manual_coordinates`, 1 parked at `threshold_weak`, 0 rejections, and no code changes.

- 2026-04-27: Fresh upper-Crow-Wing / saturation sanity pass at 03:28 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then used one fresh official upper-Crow-Wing route page plus two saturation checks instead of reopening stale threshold holds.
  - Reviewed 1 fresh candidate:
    - `Crow Wing River - Huntersville (N) carry-in access to Mary Brown Rest Area carry-in access` -> `no_live_gauge`
      - MN DNR explicitly recommends this exact 7.3-mile upper-forest day trip and clearly names both endpoints.
      - Blocker: this pass did not surface a defensible route-operable live gauge plus threshold model for the exact corridor. The current Nimrod gauge story is materially downstream and should not be ported upstream by guesswork.
  - Explored non-yield cluster: `Blue Earth River at Rapidan` -> no fresh queue value because the only clean direct-gauge recommended day trip is already live in V2.
  - Explored non-yield cluster: `Straight River at Faribault` -> no fresh queue value because the direct-gauge route value is already captured by the live `Krogh's Landing to Two Rivers Landing/Park` route.
  - Fresh cluster takeaway: some direct-gauge Minnesota systems are now clearly saturated, so future sweeps should keep rotating toward genuinely new rivers or coordinate cleanup instead of mining already-shipped gauge families.
  - Net result: 1 candidate reviewed, 0 promoted to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, and no code changes.

- 2026-04-27: Conservative no-add pass at 03:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - No queued `likely_addable` candidate exists right now, and this run did not surface a fresh new-evidence candidate strong enough to outrank the preserved `needs_manual_coordinates` queue.
  - Per the run rules, I did not reopen stale `research_later`, `threshold_weak`, or `rejected` holdovers as fake fresh work.
  - Deliberately skipped as unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`, and `Minnesota River - Thompson Ferry Access to Carver Riverfront Park` remain correctly parked at `needs_manual_coordinates`.
  - The active `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged on this pass.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Conservative gauge-first no-add pass at 03:48 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed, then spent the run on four bounded fresh Minnesota-first clusters instead of reopening stale holdovers.
  - Explored non-yield gauge/search cluster: `Red River of the North` `Map 5` (`Grand Marais Creek to Drayton`). Useful outcome: the current official page still does not expose a `Recommended day trip` block at all, so the cluster remains low-yield for PaddleTodayV2 and should not be mined again soon without a page update.
  - Explored non-yield gauge/search cluster: `Kettle River` `Map 1` and the surrounding same-gauge corridor. Outcome unchanged: the only clean official candidate still surfaced there is the already-logged `Musclewood carry-in access to #1 trailer access`, and the threshold package is still only the broad `Medium or above` guidance already preserved in `threshold_weak`.
  - Explored non-yield gauge/search cluster: `Crow Wing River` upper/direct-gauge family around `Huntersville` / `Nimrod`. Outcome unchanged: the downstream direct-gauge value is already live in V2, while the upper `Huntersville (N) carry-in access to Mary Brown Rest Area carry-in access` hold still lacks a route-operable live gauge story and remains correctly parked at `no_live_gauge`.
  - Explored non-yield gauge/search cluster: `Minnesota River` `Map 5` around the `Mankato to Seven Mile Creek` / `Le Sueur to Henderson` discussion. Useful outcome: the page still reads as broad segment guidance rather than a cleaner exact-trip package that would outrank the already-live `Judson Access to Land of Memories Park` or the preserved lower-Minnesota queue, so I did not force a weaker stitched candidate.
  - Fresh-discovery takeaway: the obvious Red River / Kettle / Crow Wing / mid-Minnesota follow-ons are now mostly saturated. The next hit-rate gain is still more likely to come from coordinate cleanup on the preserved `needs_manual_coordinates` routes or from genuinely new official route/gauge guidance than from re-reading these same four clusters.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.

- 2026-04-27: Conservative gauge-first no-add pass at 04:08 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed, then used one bounded fresh Minnesota-first sweep instead of reopening stale threshold holds.
  - Explored non-yield gauge/search cluster: `Rum River` canonical DNR page plus the Milaca / Princeton gauge-adjacent corridor. Useful outcome: the strongest official same-gauge route shapes here are already exhausted by the live `Martin's Landing to Rum River North County Park` coverage and the already-rejected `Wayside Landing to Milaca City Park` threshold gap, so this cluster is saturated for current trust-first expansion.
  - Explored non-yield gauge/search cluster: `Root River` canonical DNR page plus the Rushford / Houston corridor. Useful outcome: the current page still presents only broad segment families (`Chatfield to Rushford`, `Rushford to the Mississippi River`) rather than a fresh exact recommended day trip with a cleaner live-gauge story than the already-tracked `Rushford to Houston` live route or the already-rejected / research-later lower-root extensions.
  - Explored non-yield gauge/search cluster: `Cedar River` canonical DNR page plus the Austin / Lansing gauge family. Useful outcome: the current official route value still collapses back to the already-rejected `Riverwood Landing to State Line Road` corridor, and this pass did not surface a new shorter same-gauge day trip with stronger threshold support than that existing blocker record.
  - Fresh-discovery takeaway: the next Minnesota-first hit-rate gain is not in re-reading the most obvious canonical river pages once their direct-gauge route families are already either live or explicitly blocked. Future runs should keep preferring coordinate cleanup on the preserved `needs_manual_coordinates` set or genuinely new official route/gauge releases.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.

- 2026-04-27: Conservative no-add pass at 04:40 America/Chicago.
  - Started from the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - No queued `likely_addable` candidate exists right now, and the freshest new-evidence review (`Snake River - Silver Star Road to Lower Falls Campsite`) immediately parked at `threshold_weak` rather than clearing the ship bar.
  - Per the run rules, I did not recycle stale `research_later`, `threshold_weak`, or `rejected` holdovers as fake fresh work.
  - Deliberately skipped as unchanged: the preserved `needs_manual_coordinates` set (`Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`, and `Minnesota River - Thompson Ferry Access to Carver Riverfront Park`) remains the highest-value next queue.
  - The active `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged on this pass.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.

- 2026-04-27: Conservative gauge-first no-add pass at 05:08 AM America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed, then used one bounded fresh Minnesota-first sweep instead of reopening stale threshold holds.
  - Explored non-yield gauge/search cluster: `Wild Rice River` tributary lead from the official Red River `Map 3` page (`If water levels allow, start your paddle on the Wild Rice River ...`). Useful outcome: the current official evidence path is still too thin for PaddleTodayV2. I did not surface a canonical Minnesota DNR Wild Rice water-trail page, named public endpoint pair, or route-operable live-gauge-plus-threshold package strong enough to log a candidate. Revisit only if a direct official Wild Rice route page, manager map, or gauge-linked manager guidance appears.
  - Explored non-yield gauge/search cluster: `Buffalo River` Minnesota DNR / official-page hunt. Outcome unchanged but newly confirmed with the sitemap-first process: I still did not surface a canonical Minnesota DNR water-trail page or another official route package with named endpoints and a live-gauge story strong enough to review as a candidate. Revisit only if a direct official Buffalo route page, county water-trail map, or manager guidance appears.
  - Fresh-discovery takeaway: the next Minnesota-first hit-rate gain is still more likely to come from coordinate cleanup on the preserved `needs_manual_coordinates` set or genuinely new official route/gauge releases than from brute-force hunting on rivers that do not currently expose canonical official route pages.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.


- 2026-04-27: Fresh upper/central Mississippi gauge-cluster pass at 05:48 AM America/Chicago.
  - Reviewed 2 fresh candidates from 2 genuinely new Mississippi recommended-trip evidence paths.
  - Parked as `threshold_weak`:
    - `Mississippi River - Steamboat Access to Blackberry Bridge Access` — official 8-mile day trip with a direct Grand Rapids USGS corridor gauge, but threshold support is still only qualitative low-water riffle language.
    - `Mississippi River - Beaver Island Trail Access to Clearwater` — official 12.1-mile day trip with a plausible broader St. Cloud gauge story, but threshold support is still only qualitative low/high-water language.
  - Explored non-yield gauge cluster: `Mississippi River - Lake Itasca to Coffee Pot Landing`. Official trip is real, but this pass did not surface a defensible live gauge / threshold package strong enough to outrank the fresher downstream Mississippi candidates.
  - Fresh-discovery takeaway: upper and central Mississippi still have some unmined official day-trip value, but the current blocker pattern is threshold calibration rather than endpoint naming or route legitimacy.
  - Net result: 2 candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.


- 2026-04-27: Conservative no-add pass at 06:08 AM America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - No queued `likely_addable` candidate exists right now, and the freshest new-evidence Mississippi reviews from 05:48 AM still parked at `threshold_weak` rather than clearing the ship bar.
  - Per the run rules, I did not recycle stale `research_later`, `threshold_weak`, or `rejected` holdovers as fake fresh work.
  - Deliberately left unchanged: the preserved `needs_manual_coordinates` set (`Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`, and `Minnesota River - Thompson Ferry Access to Carver Riverfront Park`) remains the highest-value next queue.
  - The active `threshold_weak`, `no_live_gauge`, `duplicate_corridor`, `research_later`, and `rejected` sets also remain unchanged on this pass.
  - Net result: 0 new candidates reviewed, 0 promotions to `likely_addable`, 0 new `needs_manual_coordinates`, 0 rejections, no code changes, and no validation run.

- 2026-04-27: Conservative no-add pass at 06:40 AM America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger exactly as instructed.
  - The ledger still has no queued `likely_addable` route, so I did not force a weak addition or reopen stale `research_later`, `threshold_weak`, or `rejected` holdovers without genuinely new evidence.
  - Deliberately skipped as unchanged: the current `needs_manual_coordinates` queue remains the best next work (`Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`, `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`, and `Minnesota River - Thompson Ferry Access to Carver Riverfront Park`).
  - The freshest threshold-only Mississippi candidates (`Fort Ripley to Fletcher Creek`, `Royalton Sportsman's Club to Stearns County Park`, `Steamboat Access to Blackberry Bridge Access`, `Beaver Island Trail Access to Clearwater`, `Sandy Lake Recreation Area to Wold's Ferry Crossing`, and `Highway 6 to Trommald`) remain correctly parked at `threshold_weak`; no new evidence changed their blocker.
  - Net result: short no-add pass, 0 status changes, no code changes, and no validation run.


- 2026-04-27: `Mississippi River - Sandy Lake Recreation Area to Wold's Ferry Crossing` (`threshold_weak`)
  - Fresh upper/central Mississippi discovery from an unlogged official recommended-trip block on the Mississippi segments page.
  - Official support is real: MN DNR explicitly recommends this exact 9.5-mile day trip and clearly names `Sandy Lake Recreation Area` and `Wold's Ferry Crossing` as the endpoints.
  - Blocker: threshold support is still too qualitative. The official page only says the section is easy with `riffles during low water` and this pass did not surface a defensible numeric route model tied to a route-operable live gauge for the exact corridor.
  - Retry only if: MN DNR, Mississippi Headwaters Board materials, USGS-adjacent manager guidance, or strong same-route evidence ties a live gauge and conservative numeric threshold directly to the Sandy-Lake-to-Wold's-Ferry corridor.

- 2026-04-27: `Mississippi River - Highway 6 to Trommald` (`threshold_weak`)
  - Fresh upper/central Mississippi discovery from an unlogged official recommended-trip block on the Mississippi segments page.
  - Official support is real: MN DNR explicitly recommends this exact 11.7-mile day trip and clearly names `Highway 6` and `Trommald` as the endpoints.
  - Blocker: threshold support is still too qualitative. The official page only says the route has no rapids but `the current can be quite strong after a rain`, and this pass did not surface a defensible numeric route model tied to a route-operable live gauge for the exact corridor.
  - Retry only if: MN DNR, Mississippi Headwaters Board materials, USGS-adjacent manager guidance, or strong same-route evidence ties a live gauge and conservative numeric threshold directly to the Highway-6-to-Trommald corridor.

- 2026-04-27: `Mississippi River - Cass Lake to Lake Winnibigoshish` gauge cluster (non-yield cluster note)
  - Fresh cluster check only; no new candidate was logged.
  - Why it did not yield: the official trip is real, but this pass did not surface a route-operable live gauge / threshold package strong enough to outrank the fresher river-only Mississippi holds, and the corridor is also complicated by big-lake transitions rather than a cleaner direct-gauge river day trip.
  - Revisit later only if: Mississippi Headwaters Board, MN DNR, or USGS-adjacent guidance publishes a cleaner route-level gauge model for the Cass-to-Winnie corridor.

- 2026-05-26: First Missouri-first gauge pass at 09:44 America/Chicago.
  - Re-read `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, `docs/route-candidate-ledger.json`, and `docs/route-addition-requirements.md` exactly as instructed.
  - Missouri reconciliation result: there are currently no Missouri routes in the live V2 route inventory and no prior Missouri candidate records in the structured ledger, so there was nothing to dedupe or reconcile before research.
  - Reviewed 2 fresh Missouri candidates from 1 strong official gauge cluster:
    - `Current River - Akers Ferry to Pulltite` -> `research_later`
      - NPS clearly supports the route shape with named public endpoints, estimated float time, upper-Current access context, and a direct USGS gauge at Akers.
      - Blockers: threshold support is still only an average/closure story rather than a conservative runnable model, and NPS currently says Pulltite Campground is closed for an unknown period after November 2024 flood damage, making the downstream access story too unsettled to ship.
    - `Jacks Fork - Alley Spring to Eminence` -> `threshold_weak`
      - NPS clearly supports the route as a standard lower-Jacks float and the Alley Spring USGS gauge is live and same-river.
      - Blocker: the public threshold package is too conflicted between NPS average/closure markers and community floatability heuristics to produce an honest PaddleTodayV2 model.
  - Fresh gauge clusters explored so future runs can rotate faster:
    - `Ozark National Scenic Riverways / upper Current / Akers gauge family` -> route shape and access quality are strong, but current threshold language is still too soft and Pulltite remains closure-affected.
    - `Ozark National Scenic Riverways / lower Jacks Fork / Alley Spring gauge family` -> route shape and live gauge are strong, but the published numeric guidance is still too inconsistent for conservative shipping.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no validation run because only docs changed.

- 2026-05-26: `Eleven Point River - Whitten Access to Riverton East River Access`
  - Added to PaddleTodayV2 as `eleven-point-river-whitten-riverton`, the first Missouri V2 route.
  - Qualification path: Forest Service explicitly describes Whitten-to-Riverton as a popular 8-mile day float, publishes open public access pages and coordinates for both Whitten River Access and Riverton East River Access, and documents route-mile features including Conner Chute, Boze Mill Spring, Halls Bay, and Riverton Access. USGS `07071500` (`Eleven Point River near Bardley, MO`) is a direct lower-Eleven-Point live gauge, and American Whitewater ties the broader Highway 19-to-Highway 160 reach to the Bardley gauge.
  - Threshold model: conservative `minimum-only` at 300 cfs, sourced from Rivers.MOHERP's Bardley gauge rating and exact Whitten-to-Riverton trip evidence. No ideal range or high-water cutoff was claimed because the numeric support is community-derived rather than an official paddling band.
  - Remaining caveats: cold spring-fed water, rapid rises after rain, possible fresh wood, Halls Bay channel choice, motorized users under the 25 hp allowance, no glass/polystyrene, no overnight camping in day-use access areas, and private land away from public access/designated/legal stops.
  - Fresh gauge clusters also reviewed and parked:
    - `St. Francis River - Millstream Gardens to Silver Mines` -> `no_live_gauge`: route/access/threshold support is strong, but the established Roselle gauge story does not currently expose a product-fetchable standard USGS instantaneous-values path for PaddleTodayV2.
    - `Flat Creek - McDowell Low Water Bridge to Stubblefield Access` -> `research_later`: USGS `07052820` and Stubblefield Access are strong, but this pass did not find enough official public put-in authority for McDowell Low Water Bridge.

- 2026-05-26: Missouri no-add pass at 10:16 America/Chicago.
  - Re-read `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, `docs/route-candidate-ledger.json`, and `docs/route-addition-requirements.md` as instructed.
  - Reconciliation result: `Eleven Point River - Whitten Access to Riverton East River Access` is already live as `eleven-point-river-whitten-riverton` and has a matching added ledger record, so it was not duplicated.
  - Reviewed 2 fresh Missouri gauge clusters:
    - `Niangua River - Bennett Spring Access to Barclay Conservation Area Access` -> `gauge_proxy_weak`: MDC confirms both access areas and MoHERP has many exact Bennett-to-Barclay trip logs, but the practical live gauge is `USGS 06923250` at Windyville upstream of Bennett Spring. That gauge is useful context, but not clean enough as a direct route model below Bennett Spring without stronger source validation.
    - `Big Piney River - East Gate to Bookers Bend` -> `threshold_weak`: Forest Service confirms open public access, coordinates, and an 11-mile day-trip shape; `USGS 06930000` is a same-river live gauge; MoHERP and nearby Slabtown/Ross evidence are promising. Blocker is still threshold quality because no official or route-specific numeric ladder cleared the bar.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: `Split Rock Creek - Split Rock Park to Palisades State Park`
  - Added to PaddleTodayV2 as `split-rock-creek-split-rock-park-palisades`, the first South Dakota V2 route.
  - Reconciliation result: no existing South Dakota route was present in `src/data/rivers.ts`, and no obvious South Dakota slug already covered Split Rock Creek, so this was not a duplicate add.
  - Qualification path: Sioux Empire Paddlers documents the exact 2.8-mile Split Rock Park-to-Palisades State Park route, ties it to direct `USGS 06482610` (`Split Rock Creek at Corson, SD`), and gives a numeric 4.5 ft low-water floor. Visit Garretson confirms Split Rock Park has a canoe/kayak launch downstream from the dam, and South Dakota GFP confirms canoeing/kayaking on Split Rock Creek at Palisades State Park.
  - Threshold model: conservative `minimum-only` at 4.5 ft on the Corson gauge. No ideal range or upper cutoff was claimed because the level source is local-community guidance rather than an official manager-published paddling band.
  - Remaining caveats: this is a whitewater/moving-water creek route with Class I-II ledges, some Class III behavior near high flows around 1,000 cfs, possible fences across the creek, strainers, fast rain rises, state-park entry requirements, and mandatory same-day scouting.
  - Fresh gauge clusters also reviewed and parked:
    - `Big Sioux River - Jay Heath Canoe and Kayak Trail` -> `threshold_weak`: South Dakota GFP official trail/access mapping is real, but this pass did not find a manager-published route-specific numeric threshold package for an exact day-trip segment tied to `USGS 06482000` or another product-ready gauge.
    - `Missouri National Recreational River day-trip segments` -> `research_later`: NPS corridor support and SDCKA mapping context are real, but the current evidence is still too broad for a conservative day route because big-water wind, dam-release exposure, and lack of route-specific numeric paddling bands remain unresolved.

- 2026-05-26: `North Fork of the White River - North Fork Recreation Area / Hammond Camp to Blair Bridge Access`
  - Added to PaddleTodayV2 as `north-fork-white-river-north-fork-blair`.
  - Reconciliation result: `Eleven Point River - Whitten Access to Riverton East River Access` was already the only live Missouri route and was not duplicated.
  - Qualification path: the Forest Service lists North Fork Recreation Area as open, publishes coordinates, boat-access details, and an explicit route note that Blair Bridge, operated by MDC, is the downstream take-out about 10 river miles away; MDC confirms Blair Bridge Access as public fishing/floating access with a concrete boat ramp; USGS `07057500` (`North Fork River near Tecumseh, MO`) is a standard product-fetchable same-river live gauge downstream; and Rivers.MOHERP provides Tecumseh gauge ratings plus exact Hammond Camp-to-Blair Bridge trip evidence.
  - Threshold model: conservative `minimum-only` at 300 cfs on the Tecumseh gauge. Rivers.MOHERP's gauge page rates the gauge good at lower values, but V2 uses a higher floor because the exact Hammond-to-Blair trip evidence was logged good at 368 cfs and the gauge is downstream rather than in the reach.
  - Remaining caveats: downstream proxy-gauge fit, no official paddling band or high-water cutoff, cold spring-fed water, The Falls about 7 miles below the put-in, fresh wood/strainers after rain, ramp-to-steps carry at North Fork Recreation Area, and busy summer conditions at Blair Bridge.
  - Route-gallery result: no rights-clean exact-route asset was selected.
  - Validation: `npm.cmd run typecheck` passed; `npm.cmd test` and `npm.cmd run build` were blocked after typecheck by sandbox access-denied errors while Vite/Vitest loaded dependencies; `git diff --check` passed with line-ending warnings only.

- 2026-05-26: `Meramec River - Sappington Bridge Access to Meramec State Park`
  - Added to PaddleTodayV2 as `meramec-river-sappington-bridge-meramec-state-park`.
  - Reconciliation result: `Eleven Point River - Whitten Access to Riverton East River Access` and `North Fork of the White River - North Fork Recreation Area / Hammond Camp to Blair Bridge Access` were already live Missouri routes and were not duplicated.
  - Qualification path: MDC confirms Sappington Bridge Access as public Meramec boat/fishing access, the MDC St. Louis Region southern small river accesses plan explicitly says Sappington Bridge Access to Meramec State Park in Sullivan is a 5-mile canoe float, Missouri State Parks confirms the Meramec State Park concrete boat launch and canoe launch near River Stop Store, USGS `07014500` (`Meramec River near Sullivan, MO`) is the direct live gauge in the route corridor, and Rivers.MOHERP provides Sullivan-gauge condition ratings plus nearby trip logs.
  - Threshold model: conservative `minimum-only` at 200 cfs on the Sullivan gauge. No ideal range or upper cutoff was claimed because the numeric support is community-calibrated rather than an official paddling band; route copy preserves MoHERP's high/flood cautions for casual paddlers.
  - Remaining caveats: no official manager-published threshold band, high/flood water, shallow riffles near the low floor, weekend rental/tubing congestion, possible fresh wood after rain, private-bank rules away from legal stops, and coordinate precision at the state park launch.
  - Route-gallery result: no rights-clean exact-route asset was selected.
  - Validation: `npm.cmd run typecheck` passed; `npm.cmd test` and `npm.cmd run build` both reran typecheck successfully but failed afterward with sandbox access-denied / dependency-resolution errors while Vite/Vitest loaded config/dependencies; `git diff --check` passed with line-ending warnings only.

- 2026-05-26: `Bryant Creek - Sycamore Access to Warren Bridge Access`
  - Added to PaddleTodayV2 as `bryant-creek-sycamore-warren-bridge`.
  - Reconciliation result: the prior `needs_manual_coordinates` Bryant Creek ledger item was resolved and marked `added`; the existing Missouri routes `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, and `meramec-river-sappington-bridge-meramec-state-park` were not duplicated.
  - Qualification path: MDC currently confirms Sycamore Access as a Bryant Creek public access and popular upper-Bryant launch, MDC currently confirms Warren Bridge Access as public fishing/floating access, public Bryant Creek guides support the Hodgson/Sycamore-to-Warren day-float shape at about 7 to 7.6 miles, USGS `07058000` (`Bryant Creek near Tecumseh, MO`) showed same-day May 26, 2026 discharge and gage-height observations, and Rivers.MOHERP ties Bryant Creek condition ratings plus exact/nearby trip logs to that gauge.
  - Threshold model: conservative `minimum-only` at 300 cfs on the Tecumseh gauge. No ideal range or upper cutoff was claimed because the level source is community-calibrated rather than official manager-published paddling bands.
  - Coordinate resolution: put-in anchored to the adjacent Hodgson-Aid Mill / Highway 181 crossing coordinate because MDC locates Sycamore Access downstream of that bridge; take-out anchored to Mapcarta/OpenStreetMap Warren Bridge Access coordinates, with MDC page and area map confirming the access name and current public use.
  - Remaining caveats: no official threshold band, high-water/rapid-rise risk, shallow shoals near the 300 cfs floor, older post-2017 flood reports of rough or formerly closed access conditions at Warren Bridge, loose gravel/deep sand at Sycamore, private land away from public/legal stops, and no rights-clean exact-route image selected.
  - Route-gallery result: no image was added because MDC access photos are not clearly reusable as local gallery assets.

- 2026-05-26: Missouri no-add pass at 10:45 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are already `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, and `meramec-river-sappington-bridge-meramec-state-park`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Huzzah Creek / lower Meramec tributary cluster:
    - `Huzzah Creek - Huzzah Conservation Area to Meramec River` -> `research_later`.
    - USGS `07014000` and Rivers.MOHERP lower-Huzzah trip evidence are promising, including good-condition reports around 135-152 cfs, but the exact public take-out/access shape is too ambiguous because the trip rows end at "Meramec River" rather than a named managed landing.
  - Reviewed fresh upper Black River cluster:
    - `Black River - Lesterville Access to Route K Bridge` -> `research_later`.
    - MDC and A Paddler's Guide evidence support Lesterville Access / Route K as the public upper-Black corridor, and USGS `07061500` is usable same-river gauge context, but Lesterville Access has documented practical access uncertainty after channel movement and threshold evidence is not exact-route enough.
  - Reviewed fresh Elk River cluster:
    - `Elk River - Route DD to MO 43 / Cowskin Access family` -> `threshold_weak`.
    - MDC Cowskin Access and USGS `07189000` are strong, but the numeric route evidence is only one low-water Route-DD-to-MO-43 trip plus outfitter/corridor context, not enough for an honest V2 threshold model.
  - Net result: 3 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: South Dakota no-add pass at 10:54 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. `Split Rock Creek - Split Rock Park to Palisades State Park` is already live as `split-rock-creek-split-rock-park-palisades` with a matching `added` ledger record, so it was not duplicated.
  - Reviewed fresh Black Hills creek leads:
    - `Spearfish Creek - City Park to Evans Park` -> `threshold_weak`: direct `USGS 06431500` and public city-park endpoint names make this promising, but this pass found no defensible route-specific numeric paddling floor or range tied to the gauge.
    - `Rapid Creek - Heisga to Dark Canyon` -> `research_later`: American Whitewater documents the route and gauge context, but the reach is advanced whitewater with private/remote access complications and trip-report threshold evidence rather than a clean public PaddleToday route package.
    - `Whitewood Creek - Highway 14A to Whitewood / Vale gauge family` -> `research_later`: AW/USGS gauge context exists, but the route remains high-consequence whitewater with unresolved public access, water-quality caveats, and no conservative route-specific threshold model.
  - Net result: 3 South Dakota candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 10:56 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, and `meramec-river-sappington-bridge-meramec-state-park`; all already have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Big River / Washington State Park cluster:
    - `Big River - Washington State Park Access to Mammoth Access` -> `threshold_weak`.
    - MDC and Missouri State Parks confirm public endpoint access, and MDC says Mammoth Access is 3.30 river miles downriver from Washington State Park Access. The blocker is threshold quality: the best numeric support found was broad lower-Big / downstream Byrnesville gauge community context, not route-specific guidance for this short reach.
  - Reviewed fresh Bourbeuse River / Union cluster:
    - `Bourbeuse River - Reiker Ford Access to Mayers Landing Access / Union Access family` -> `research_later`.
    - MDC itself names the Reiker-to-Mayers 11-mile trip and says it can be extended to Union, but MDC currently warns that Mayers Landing main-channel access is limited because the river shifted away from the boat ramp. That makes the clean day-trip endpoint unsettled today.
  - Reviewed fresh Gasconade River gauge cluster:
    - `Gasconade River - Jerome / Rich Fountain gauge-supported day-trip family` -> `no_live_gauge`.
    - The obvious USGS gauges and MoHERP condition pages are real, but the USGS current-condition pages showed stale latest visible values during this run: Jerome latest visible value was May 22, 2026, and Rich Fountain latest visible value was May 18, 2026.
  - Net result: 3 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 11:20 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, and `meramec-river-sappington-bridge-meramec-state-park`; all already have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Bryant Creek / Tecumseh gauge cluster:
    - `Bryant Creek - Sycamore Access to Warren Bridge Access` -> `needs_manual_coordinates`.
    - MDC confirms Sycamore Access as a popular launch for canoeists and kayakers on upper Bryant Creek and Warren Bridge Access as public fishing/floating access. MoHERP ties the exact Hodgson Mill/Sycamore-to-Warren Bridge route to `USGS 07058000` and provides a conservative 300 cfs Good-condition floor plus exact-route trip evidence. The route was not added because source-backed endpoint coordinates were not captured during this run.
  - Reviewed lower-confidence fresh clusters:
    - `Roubidoux Creek - Waynesville / Fort Leonard Wood gauge family` -> `research_later`; public access exists, but no practical day-trip endpoint pair and threshold package cleared the bar.
    - `Little Sac River - Morrisville gauge family` -> `research_later`; `USGS 06918740` and MoHERP bands are promising, but public endpoint/route-shape evidence remains weak.
    - `Cuivre River - Troy gauge family` -> `threshold_weak`; `USGS 05514500` and MoHERP bands are promising, but public access and exact day-trip segmentation remain too thin.
  - Net result: 4 Missouri candidates reviewed, 0 routes added, 1 promoted to `needs_manual_coordinates`, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 11:27 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes are already `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh James River / Galena gauge cluster:
    - `James River - Shelvin Rock Access to Hooten Town Access` -> `no_live_gauge`.
    - MDC confirms both endpoints as public James River day-use boat-ramp accesses, and Rivers.MOHERP has exact Shelvin-Rock-to-Hootentown trip evidence at 194, 370, and 467 cfs on `USGS 07052500`. The blocker is live-data freshness: indexed USGS current-condition evidence showed latest visible discharge only through May 23, 2026, and direct USGS API checks from the automation environment could not connect during USGS May 26 maintenance.
  - Reviewed fresh Shoal Creek / Joplin gauge cluster:
    - `Shoal Creek - Grand Falls / Redings Mill day-trip family` -> `threshold_weak`.
    - MDC and JoplinKayak support the corridor and live gauge context, but this pass found current gauge values and high-water cautions rather than a defensible route-specific numeric low-water floor or range.
  - Reviewed fresh lower Current River / Powder Mill gauge cluster:
    - `Current River - Powder Mill to Log Yard / lower Current family` -> `threshold_weak`.
    - NPS lower-Current route/access context is strong and `USGS 07066510` is the obvious gauge candidate, but the evidence found today was float-time and high/closure-stage context rather than a scoring-ready low-water floor or route range.
  - Net result: 3 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 11:35 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the strongest deferred Missouri candidate:
    - `James River - Shelvin Rock Access to Hooten Town Access` -> remains `no_live_gauge`.
    - MDC still supports both public endpoints, and Rivers.MOHERP still has exact Shelvin-Rock-to-Hootentown evidence on `USGS 07052500`, but the route was not added because same-day product-fetchable USGS data still could not be verified. The automation shell could not reach USGS Water Services, and web-visible MoHERP/USGS evidence was stale or internally inconsistent rather than a May 26 current-data confirmation.
  - Reviewed fresh Courtois Creek / Huzzah tributary cluster:
    - `Courtois Creek - Huzzah Conservation Area / Scotia / Bass River Resort family` -> `no_live_gauge`.
    - MDC and outfitter/search evidence support real Courtois paddling interest, but this pass did not find a clean product-ready live gauge or a manager-published exact public endpoint pair with numeric threshold guidance.
  - Reviewed fresh Big Creek / Sam A. Baker cluster:
    - `Big Creek - Highway 143 / Sam A. Baker State Park family` -> `no_live_gauge`.
    - `USGS 07037300` and Rivers.MOHERP condition bands are promising, and guide sources support the Highway 143 / Sam A. Baker route family, but visible gauge observations were stale relative to May 26. This also needs careful whitewater/seasonal framing before any future add.
  - Net result: 3 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 11:45 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge`; all have matching `added` ledger records and were not duplicated.
  - Rechecked the strongest deferred Missouri candidate:
    - `James River - Shelvin Rock Access to Hooten Town Access` -> remains `no_live_gauge`.
    - MDC still supports both public endpoints, and Rivers.MOHERP still has exact Shelvin-Rock-to-Hootentown evidence on `USGS 07052500`, but the automation shell still could not reach USGS Water Services and web-visible USGS/MoHERP evidence did not prove same-day May 26 product-fetchable current data.
  - Reviewed fresh Little Niangua / Macks Creek cluster:
    - `Little Niangua River - Macks Creek gauge-supported day-trip family` -> `no_live_gauge`.
    - `USGS 06925250` and MoHERP condition context are promising, but search-visible recent observations topped out around May 22, 2026 rather than same-day May 26; the public endpoint pair also remains unselected.
  - Reviewed fresh Osage Fork / Hazelgreen-Gasconade cluster:
    - `Osage Fork of the Gasconade River - Rader / Dryknob / Hull Ford to Hazelgreen family` -> `gauge_proxy_weak`.
    - MDC and guide evidence support real access context, but MoHERP explicitly says there is no USGS gauge on the Osage Fork and that Hazelgreen/Gasconade readings might not indicate Osage Fork conditions.
  - Net result: 3 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 11:55 AM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Big Sugar Creek / Powell gauge cluster:
    - `Big Sugar Creek - Cyclone low-water bridge to Deep Ford Access` -> `no_live_gauge`.
    - USGS `07188653` and Rivers.MOHERP provide a real same-creek Powell gauge, MoHERP has exact Cyclone-to-Deep-Ford trip evidence, and MDC confirms Deep Ford Access as a public access. The blockers are same-day live-data freshness and access authority: visible USGS/MoHERP observations were May 24, 2026 rather than May 26, and Cyclone is supported by public float guides but not by a clean manager-published access page; the same Float Missouri page also has a parking/private-property warning in comments.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 12:05 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Beaver Creek / Bradleyville gauge cluster:
    - `Beaver Creek - Brownbranch to Bradleyville` -> `no_live_gauge`.
    - MDC confirms Beaver Creek as a floating destination and names Beaver Creek Campground at Brownbranch plus the Highway 76 bridge at Bradleyville as launch/access options. Rivers.MOHERP has multiple exact Brownbranch-to-Bradleyville trip rows and useful low/good evidence on `USGS 07054080`, but the USGS legacy current-conditions page showed latest visible discharge and gage height from May 25, 2026 at 12:15 CDT rather than same-day May 26 data.
  - Reviewed fresh upper Meramec / Steelville gauge cluster:
    - `Meramec River - Scott's Ford / Riverview / Indian Springs / MO 19 Steelville family` -> `threshold_weak`.
    - `USGS 07013000` showed same-day May 26 data, and MoHERP has Steelville-gauge bands plus upper-Meramec trip rows. The blocker is threshold/access fit: broad MoHERP bands and exact-trip rows conflict, and the route evidence mixes public accesses, private/outfitter landings, and commercial trip segments rather than one clean public endpoint pair.
  - Net result: 2 Missouri candidates reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.

- 2026-05-26: Missouri no-add pass at 12:15 PM America/Chicago.
  - Re-read and reconciled the live V2 inventory, trip details, Midwest memory, structured ledger, route-addition requirements, and automation memory. Live Missouri routes remain `eleven-point-river-whitten-riverton`, `north-fork-white-river-north-fork-blair`, `meramec-river-sappington-bridge-meramec-state-park`, and `bryant-creek-sycamore-warren-bridge`; all have matching `added` ledger records and were not duplicated.
  - Reviewed fresh Lamine River / Otterville gauge cluster:
    - `Lamine River - Roberts Bluff / Harriman Hill / De Bourgmont access family` -> `threshold_weak`.
    - MDC confirms Roberts Bluff as a public Lamine River boat-ramp access, and MDC watershed material lists lower Lamine public accesses including Roberts Bluff, Harriman Hill, and de Bourgmont. `USGS 06906800` is the obvious direct Lamine gauge, and RiverScout surfaces current gauge values plus a 225-700 cfs optimal range, but RiverScout also flags its CFS ranges as needing community verification. MDC's own material says parts of the Lamine are floatable and that dry-summer riffles above Roberts Bluff may require walking, but it does not provide a numeric route-specific threshold model or one clean day-trip endpoint pair.
  - Net result: 1 Missouri candidate reviewed, 0 promoted to `likely_addable`, 0 promoted to `needs_manual_coordinates`, 0 routes added, no app code changes, and no npm validation run.
