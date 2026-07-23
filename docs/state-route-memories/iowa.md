# Iowa Route Memory

Last summarized: 2026-07-23.

## Current Inventory

- 2026-07-23 12:53 CDT update: live exported Iowa routes were 89 at the start of the Waverly Cedar gap pass and 92 after adding the three new slugs listed below.
- 2026-07-23 11:00 CDT update: live exported Iowa routes were 86 at the start of the Lower Des Moines pass and 89 after adding the three new slugs listed below.
- Live routes: 60 at the start of the 2026-07-22 late Cedar / South Skunk / North Raccoon pass, based on `src/data/rivers.ts` imported with `tsx`.
- This checkout also has pre-existing dirty consolidation code that retires three Upper Iowa split cards and emits one family card, so the post-edit imported Iowa count is 61 even though this run added three new Iowa slugs beyond the 60-route baseline.
- Top represented rivers: Upper Iowa River 8, Turkey River 6, North Fork Maquoketa River 6, Cedar River 6, Maquoketa River 5, South Skunk River 4, Des Moines River 2, Iowa River 2, Volga River 3.
- Ledger candidates: updated by the 2026-07-22 Brookwood / Little Sioux / Winnebago pass; latest additions are marked `added`.

## Status

Iowa remains mature overall. The latest 2026-07-23 12:53 run added three routes beyond the current 89-route baseline: `cedar-river-cedar-bend-three-rivers`, `cedar-river-three-rivers-kohlmann`, and `cedar-river-kohlmann-brookwood`.

## 2026-07-23 12:53 Cedar River Waverly dam-portage gap pass

- Baseline at run start: 89 Iowa live routes, verified from `src/data/rivers.ts` with `tsx` after duplicate reconciliation.
- Added `cedar-river-cedar-bend-three-rivers`, `cedar-river-three-rivers-kohlmann`, and `cedar-river-kohlmann-brookwood`, bringing the imported Iowa count to 92 live routes.
- Qualification path: the Cedar River Paddling Trips guide documents the Cedar Bend / Three Rivers / Kohlmann / Brookwood chain, exact segment mileages, endpoint coordinates, Three Rivers double ramp and dock, Kohlmann as the commonly used dam-portage take-out, Brookwood as the downstream Waverly park access, and the Cedar River gauge floor for the broader trip family. Bremer County corroborates Cedar Bend campground/seasonal access context, and City of Waverly corroborates Brookwood's non-motorized boat ramp and parking.
- Gauge posture: USGS Water Services returned Cedar River at Waverly `05458300` at `2,400 cfs / 5.08 ft` at 2026-07-23 12:15 CDT. The returned stage series also included a second method value of `5.14 ft`; the app records discharge as the scoring metric.
- Threshold posture: all three routes are conservative `minimum-only` at `200 cfs`, using the Cedar River Paddling Trips guide's adequate-water floor and documenting the `400-600 cfs` better range without inferring a high cutoff.
- Caveat posture: Cedar-Bend-to-Three-Rivers foregrounds stopping before the Waverly dam sequence and Cedar Bend seasonal gate checks. Three-Rivers-to-Kohlmann foregrounds a mandatory river-right portage take-out above the dam and the guide's warning that Kohlmann is commonly used but not an official access. Kohlmann-to-Brookwood foregrounds below-dam relaunch discipline, explicitly excludes running the dam, and uses Brookwood as the first normal downstream take-out.
- Reviewed but not added: Wapsipinicon Anamosa-to-Oxford Junction remains blocked by stale `05421760` data; Cedar Bend-to-Brookwood as one through-card was avoided because the Waverly dam/portage boundary is better represented as split cards; lower Des Moines Austin-to-Keosauqua and Bonaparte/Farmington continuations were lower value than closing the official Waverly access-chain gap in this run.
- No route-gallery assets were added after bounded Cedar guide / City of Waverly / Bremer County / Iowa DNR / Commons / same-route image review.

## 2026-07-23 11:00 Lower Des Moines River Eldon / Douds gap pass

- Baseline at run start: 86 Iowa live routes, verified from `src/data/rivers.ts` with `tsx` after duplicate reconciliation.
- Added `des-moines-river-eldon-shidepoke`, `des-moines-river-shidepoke-douds`, and `des-moines-river-douds-austin-park`, bringing the imported Iowa count to 89 live routes.
- Qualification path: Iowa DNR's Lower Des Moines River guide documents the Eldon / Shidepoke / Douds / Austin Park access chain, official segment mileages, public ramp names, Red Rock release caveat, meandered-stream sandbar camping rule, bridge-piling and gas-pipeline hazards, silver-carp warning, and beginner/long-mileage suitability notes. Fish Iowa corroborates the Ottumwa-to-Farmington ramp corridor, Villages of Van Buren corroborates Douds and Austin Park access/camping context, and USGS `05490500` returned current Keosauqua data.
- Gauge posture: USGS Water Services returned Des Moines River at Keosauqua `05490500` at `5,060 cfs / 11.84 ft` at 2026-07-23 10:00 CDT. Keosauqua is downstream on the same Lower Des Moines River corridor and is treated as a same-corridor proxy, not as a direct segment gauge.
- Threshold posture: all three routes reuse the accepted lower Des Moines Keosauqua-gauge community model from the adjacent V2 route family: too low `800 cfs`, ideal `3,000-4,500 cfs`, and too high `6,000 cfs`. The model is explicitly caveated as community/proxy evidence; no new segment-specific ideal range or upper cutoff was invented.
- Caveat posture: Eldon-to-Shidepoke foregrounds short beginner mileage only at normal release-controlled levels, steep banks, private uplands, legal sandbar limits, and silver carp. Shidepoke-to-Douds foregrounds bridge pilings, log/debris piles, gas-pipeline no-docking signs, endpoint camping support, and proxy-gauge limits. Douds-to-Austin foregrounds the DNR 9.75-mile beginner-length caveat, wooded bends, fewer exits, endpoint campground assumptions, private banks, and longer rescue exposure.
- Reviewed but not added: Wapsipinicon Anamosa-to-Oxford Junction remains blocked because USGS `05421760` Water Services still returns stale 2017 data; Iowa River Hills-to-River-Junction has strong Johnson County access/camping support but only weaker upstream cleanup/minimum threshold evidence; Yellow River Volney-to-Ion / Ion-to-Highway-76 stayed duplicate-prone over the existing Volney-to-Sixteen and Sixteen-to-Highway-76 cards; Cedar Bend-to-Waverly / Three Rivers still needs a dam-portage-specific pass.
- No route-gallery assets were added after bounded Iowa DNR / Villages of Van Buren / Meet Ottumwa / Fish Iowa / Commons / same-route image review.

## 2026-07-23 08:52 Cedar River Nashua / Bremer County gap pass

- Baseline at run start: 80 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `cedar-river-nashua-pearl-rock`, `cedar-river-pearl-rock-north-cedar`, and `cedar-river-north-cedar-cedar-bend`, bringing the imported Iowa count to 83 live routes.
- Qualification path: the Cedar River Paddling Trips guide documents the missing Nashua / Pearl Rock / North Cedar Park / Cedar Bend Park access chain, exact segment mileages, endpoint coordinates, Nashua dam portage context, Pearl Rock small-lot caveat, North Cedar campground/boat-ramp context, Cedar Bend park amenities, and the Cedar River gauge floor for the broader Charles City-to-Janesville route family. City of Nashua confirms the Veterans Memorial Park dam-portage corridor and public access customization to North Cedar, Iowa DNR Fish Iowa confirms the Nashua-to-La Porte City Cedar corridor, and Bremer County / MyCountyParks confirms North Cedar and Cedar Bend park access/camping context.
- Gauge posture: USGS Water Services returned Cedar River at Waverly `05458300` at `2,450 cfs / 5.10 ft` at 2026-07-23 08:15 CDT. Charles City `05457700` also returned `1,430 cfs / 4.06 ft` and Janesville `05458500` returned `2,660 cfs / 3.33 ft` during this run.
- Threshold posture: all three new routes are conservative `minimum-only` at `200 cfs`, using the Cedar River Paddling Trips guide's broad-family adequate-water floor and documenting its `400-600 cfs` better range without inferring a high cutoff.
- Caveat posture: Nashua-to-Pearl foregrounds below-dam launch discipline, Pearl Rock small parking, private banks, and no camping. Pearl-to-North-Cedar foregrounds small put-in capacity, endpoint campground support, private banks, and downstream-gauge limits. North-Cedar-to-Cedar-Bend foregrounds the longer rural reach, endpoint campgrounds, Cedar Bend seasonal gate checks, private banks, and stopping before the Waverly dam sequence.
- Reviewed but not added: Cedar Bend-to-Three-Rivers / Waverly continuation was held for a future Waverly-dam-specific pass because Three Rivers / Kohlmann / Brookwood portage logistics need a focused dam-boundary card. Wapsipinicon Anamosa-to-Oxford Junction remains blocked by stale `05421760` data from prior checks.
- No route-gallery assets were added after bounded Cedar guide / City of Nashua / Iowa DNR / Bremer County / Travel Iowa / Commons / same-route image review.

## 2026-07-23 05:55 Middle Raccoon protected-water-area pass

- Baseline at run start: 79 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `middle-raccoon-river-lenon-mill-p28`, `middle-raccoon-river-p28-cowles`, and `middle-raccoon-river-cowles-redfield-dam`, bringing the imported Iowa count to 82 live routes.
- Qualification path: Iowa DNR documents Lenon Mill Park Access to P-28 Access to Middle Raccoon River Access to Cowles Access as a 9-mile protected-water-area water-trail section, then Cowles to Shearer to Redfield Dam Upper Access as a 7.8-mile continuation. Guthrie County confirms the Route A access order and distances for Lenon, P-28, Middle Raccoon River Access, and Cowles; MyCountyParks confirms Lenon Mill camping and canoe access; Dallas County confirms Redfield Dam Access and low-head-dam context; Paddling Hub / BoatRampMap provide practical coordinate support for P-28, Cowles, and Redfield; and USGS `05483600` is direct and current at Panora.
- Gauge posture: USGS Water Services returned Middle Raccoon River at Panora `76.1 cfs / 4.24 ft` at 2026-07-23 05:15 CDT, well below the selected route floor.
- Threshold posture: all three routes are conservative `minimum-only` at `400 cfs`, using Iowa Parklands' quotation of Nate Hoogeveen's *Paddling Iowa* note that 400 cfs is a pleasant Middle Raccoon ride. `middle-raccoon-river-p28-cowles` also documents Iowa Parklands' exact P-28-to-Cowles trip at `600 cfs` with minimal scraping. No high cutoff or ideal range was inferred.
- Caveat posture: Lenon-to-P-28 foregrounds below-dam launch discipline and Lenon endpoint camping. P-28-to-Cowles foregrounds riffle sweepers, rock wing dams, boulders, and private-bank limits. Cowles-to-Redfield foregrounds Redfield Dam Upper Access as a mandatory above-dam take-out, numerous riffles, sharp-bend logs, and no camping. Intermediate 248th / Shearer coordinates are explicitly marked as practical corridor anchors requiring land verification.
- Reviewed but not added: Wapsipinicon Anamosa-to-Oxford Junction remains blocked because USGS `05421760` still returns stale 2017 data; Yellow River Volney-to-Ion was not added as a long duplicate over existing Volney-to-Sixteen and Sixteen-to-Highway-76 cards; Black Hawk Creek had only one plausible downstream gap and stayed lower value than the official Middle Raccoon protected-water-area package.
- No route-gallery assets were added after bounded Iowa DNR / Guthrie County / Dallas County / Iowa Parklands / Paddling Hub / Commons / same-route image review.

## 2026-07-23 04:58 North Raccoon / Iowa River / Shell Rock pass

- Baseline at run start: 76 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `north-raccoon-river-rainbow-bend-richey`, `iowa-river-tailwater-east-sturgis-ferry`, and `shell-rock-river-strand-wilkinson`, bringing the imported Iowa count to 79 live routes.
- Qualification path: North Raccoon uses the Iowa DNR Calhoun/Carroll/Sac guide exact Rainbow-Bend-to-Richey segment, official Lanesboro/Jefferson gauge guidance, public access/camping notes, and current USGS data. Iowa River uses CanWePaddle's Coralville-Dam-to-Iowa-City range, USACE Tailwater East ramp/status/camping sources, Sturgis Ferry take-out context, and direct USGS `05454500`. Shell Rock uses Cerro Gordo/Visit Mason City access support, Iowa DNR county recreation context, prior Paddling.com route-specific Shell Rock flow note, and restored-current USGS `05462000`.
- Gauge posture: USGS Water Services returned North Raccoon Lanesboro `7.69 ft` and Jefferson `238 cfs / 5.16 ft` at 2026-07-23 04:15 CDT, Iowa River at Iowa City `2,260 cfs / 11.83 ft` at 04:00 CDT, and Shell Rock River at Shell Rock `2,090 cfs / 9.19 ft` at 03:45 CDT.
- Threshold posture: North Raccoon uses DNR's official Lanesboro `11 ft` ceiling with Jefferson `around 1,000 cfs` target documented separately because the app does not support a pure maximum-only model. Iowa River uses CanWePaddle's exact `300-6,000 cfs` estimated Coralville-Dam-to-Iowa-City range. Shell Rock is minimum-only at `1,000 cfs`, with the prior Paddling.com `1,000-1,500 cfs` optimum note documented but no upper cutoff inferred.
- Caveat posture: North Raccoon foregrounds unsigned/difficult accesses, Hobbs/Merritt riprap, Richey's hard-to-see take-out, non-meandered private banks, endpoint camping, and high-water wood exposure. Iowa River is scoped below Coralville Dam only, with USACE ramp status, no-courtesy-dock, dam-release, cold-water, and firm Sturgis take-out caveats. Shell Rock foregrounds the downstream proxy gauge, low-water scraping/wading, strainers, private banks, and Wilkinson campground support.
- Reviewed but not added: Wapsipinicon Anamosa-to-Oxford Junction remains blocked by stale `05421760` Water Services data; Cedar Palo-to-Cedar-Rapids, Cedar Waverly-to-Janesville, Turkey Clermont/Elgin/Elkader, and Upper Iowa Bluffton-to-Decorah are already represented by current V2 route splits; Des Moines Webster/Boone continuations lacked route-level numeric threshold support beyond already-live cards.
- No route-gallery assets were added after bounded Iowa DNR / USACE / CanWePaddle / county / Commons / same-route image review.

## 2026-07-23 03:50 Lower / upper Maquoketa pass

- Baseline at run start: 73 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `maquoketa-river-ebys-mill-supples-bridge`, `maquoketa-river-backbone-dundee`, and `maquoketa-river-quaker-mill-baileys-ford`, bringing the imported Iowa count to 76 live routes.
- Qualification path: Eby's-Mill-to-Supples uses Miles Paddled's exact route report, endpoint coordinates, Manchester-gauge minimum recommendation, Iowa DNR/Jones County lower-Maquoketa water-trail access context, and direct USGS `05416900`. Backbone-to-Dundee uses Delaware County Tourism's just-below-Backbone-dam water-trail start, Iowa DNR Delaware County Maquoketa guide caveats, Wisconsin River Trips' Backbone gauge ladder and below-dam hazards, and direct USGS `05416900`. Quaker-Mill-to-Bailey's-Ford uses Miles Paddled's exact route report, Delaware County/Iowa DNR water-trail access and Delhi Dam boundary context, and direct USGS `05416900`.
- Gauge posture: USGS Water Services returned Maquoketa River at Manchester `05416900` at `399 cfs / 5.10 ft` at 2026-07-23 03:15 CDT.
- Threshold posture: Eby's-Mill-to-Supples is minimum-only at `150 cfs / 4.2 ft`, using Miles Paddled's exact-route `78 cfs / 3.9 ft` low trip and minimum recommendation. Backbone-to-Dundee uses WRT's Backbone ladder as a guarded two-sided model: floor `51 cfs`, broad target `51-250 cfs`, and `451+ cfs` too high for broad use. Quaker-Mill-to-Bailey's-Ford is minimum-only at `195 cfs`, with `250 cfs` documented as closer to ideal but no upper cutoff inferred.
- Caveat posture: Quaker-Mill-to-Bailey's-Ford is `routeType: whitewater`. Eby's-Mill-to-Supples foregrounds the weaker sandy Supples Bridge exit, rural exposure, wind, wood, low-water scraping, and no on-route camping assumption. Backbone is scoped below the dam only, excluding private-permission upstream water and dam running. Quaker-Mill-to-Bailey's-Ford foregrounds Class I-II/Class II features, portage/bypass decisions, private banks, and the Bailey's Ford stop before Lake Delhi / Delhi Dam logistics.
- Reviewed but not added: Wapsipinicon Anamosa-to-Oxford Junction remains blocked by stale `05421760` Water Services data; Cedar Valley Paddlers Trail remains max-only threshold evidence without a supported low-water model; Volga Littleport-to-Garber stayed weaker than the selected routes on exact route-level threshold support.
- No route-gallery assets were added after bounded WRT / Miles Paddled / Iowa DNR / Delaware County / Commons / same-route image review.

## 2026-07-23 02:47 Lizard Creek pass

- Baseline at run start: 70 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `lizard-creek-lentsch-cunningham`, `lizard-creek-cunningham-rasch`, and `lizard-creek-rasch-phinney`, bringing the imported Iowa count to 73 live routes.
- Qualification path: Iowa DNR / Webster County's Lizard Creek Water Trail brochure documents the North Fork Lizard Creek designated water-trail corridor, public access sequence, segment distances, non-meandered private-bank/no-camping limits, fast-water/boulder/rapid hazards, electric fences, railroad debris, and intermediate/advanced classifications. American Whitewater documents the same Lentsch-to-Phinney reach, access-point coordinates, Class I-II rating, and 5-8 ft optimum range tied to the Lizard Creek near Fort Dodge gauge.
- Gauge posture: USGS Water Services returned Lizard Creek near Fort Dodge `05480080` at `4.56 ft` at 2026-07-23 02:15 CDT. The latest request returned stage but not current discharge, so all three cards score `gage_height_ft` only.
- Threshold posture: all three routes use American Whitewater's direct same-reach 5-8 ft optimum stage window as a guarded two-sided model; no cfs thresholds were invented.
- Caveat posture: all three are `routeType: whitewater`. Lentsch-to-Cunningham is DNR intermediate/not-for-beginners; Cunningham-to-Rasch carries the strongest electric-fence, pasture, railroad-log, and private-bank warnings; Rasch-to-Phinney is DNR advanced with at least 25 rocky riffles/rapids and a Phinney finish just above the Des Moines River confluence.
- Reviewed but not added in this run: Wapsipinicon Anamosa-to-Oxford Junction remains blocked by stale USGS `05421760` instantaneous values from prior checks; Boone Webster-City-to-Stratford was skipped as a long card overlapping the existing Boone split chain; Iowa River Coralville-Dam-to-Iowa-City remains dam-adjacent and weaker than the selected official/AW Lizard package.
- No route-gallery assets were added after bounded American Whitewater / DNR-Webster / Travel Iowa / Webster County / Commons / same-route image review.

## 2026-07-23 01:52 East Nishnabotna / Maquoketa / Upper Iowa pass

- Baseline at run start: 67 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `east-nishnabotna-river-red-oak-essex`, `maquoketa-river-pictured-rocks-ebys-mill`, and `upper-iowa-river-lower-dam-iverson-bridge`, bringing the imported Iowa count to 70 live routes.
- Qualification path: East Nishnabotna uses CanWePaddle's exact Red-Oak-to-Essex range, direct USGS `06809500`, Iowa DNR East Nishnabotna map context, Montgomery County access context, and public access-directory corroboration. Maquoketa uses the Jones County / Iowa DNR water-trail guide, Jones County's rebuilt Eby's Mill ramp page, Miles Paddled Manchester-gauge guidance, and USGS `05416900`. Upper Iowa uses Miles Paddled Lower-Dam-to-Iverson route evidence, the Upper Iowa Paddler's Guide access chain, Iowa DNR dam context, and direct USGS `05387500`.
- Gauge posture: USGS Water Services returned East Nishnabotna at Red Oak `06809500` at `200 cfs / 5.86 ft` at 2026-07-23 01:00 CDT, Maquoketa at Manchester `05416900` at `414 cfs / 5.16 ft` at 2026-07-23 01:15 CDT, and Upper Iowa at Decorah `05387500` at `981 cfs / 2.80 ft` at 2026-07-23 00:45 CDT.
- Threshold posture: East Nishnabotna uses the CanWePaddle community estimated range `100-1,500 cfs`. Maquoketa is minimum-only from Miles Paddled's `155 cfs` minimal / `200-250 cfs` better Manchester-gauge note and does not infer a high cutoff. Upper Iowa is minimum-only from Miles Paddled's `245 cfs` observed-with-scraping / `300-400 cfs` smoother Decorah-gauge note and does not infer a high cutoff.
- Caveat posture: East Nishnabotna has practical access-anchor coordinates and strong muddy-bank/fast-rise/private-bank caveats. Maquoketa intentionally stops at Eby's Mill rather than Supples Bridge because the Iowa DNR/Jones County guide calls Supples less desirable and harder to see. Upper Iowa is a prompted downstream continuation, not another Bluffton split; it ships with below-dam launch discipline, long-day exposure, and no upper threshold.
- Reviewed but not added: Wapsipinicon Anamosa-to-Oxford Junction remains blocked because USGS Water Services for `05421760` still returned `268 cfs / 2.87 ft` from 2017-10-02 despite current-looking CanWePaddle display. North Raccoon Jefferson-to-Cooper was skipped as a long card that would overlap the existing Eureka/Henderson and Squirrel/Adkins split-card pattern. Iowa River Coralville-Dam-to-Iowa-City remained dam-adjacent and weaker on official access-start support than the selected set.
- No route-gallery assets were added after bounded official / local / USGS / Commons / same-route image review.

## 2026-07-23 00:48 Turkey / Maquoketa / West Nishnabotna pass

- Baseline at run start: 64 Iowa live routes, reconciled from the current route source with the existing Upper Iowa split retirement / family-card consolidation.
- Added `turkey-river-clermont-gilbertson`, `maquoketa-river-monmouth-maquoketa`, and `west-nishnabotna-river-oakland-macedonia`, bringing the intended imported Iowa count to 67 live routes.
- Qualification path: Turkey uses the official Turkey River Water Trail guide for Clermont #64B to Elgin/Gilbertson #59 access, dam-portage boundaries, Valley intermediate access, route character, and direct Eldorado-gauge CanWePaddle range; Maquoketa uses Jackson County's lower Maquoketa water-trail access chain plus CanWePaddle's exact Monmouth-to-Maquoketa route and direct Maquoketa gauge; West Nishnabotna uses the state-designated Pottawattamie water-trail access chain from Chautauqua/Oakland to Olde Town/Macedonia, with CanWePaddle's broader Oakland-to-Randolph range and direct Randolph gauge.
- Gauge posture: USGS Water Services returned Turkey River near Eldorado `05411850` at `763 cfs / 6.52 ft` at 2026-07-22 23:45 CDT, Maquoketa River near Maquoketa `05418500` at `1,890 cfs / 12.63 ft` at 2026-07-23 00:15 CDT, and West Nishnabotna River at Randolph `06808500` at `536 cfs / 8.41 ft` at 2026-07-23 00:00 CDT.
- Threshold posture: all three use guarded CanWePaddle community estimated ranges tied to direct USGS gauges: Turkey `120-1,500 cfs`, Maquoketa `200-2,500 cfs`, and West Nishnabotna `120-1,800 cfs`. West Nishnabotna intentionally stops at Olde Town / Macedonia instead of an unverified Randolph take-out, so the range is treated as broader-corridor support.
- Caveat posture: Turkey requires below-dam Clermont launch discipline and explicit Gilbertson finish planning; Maquoketa keeps practical-coordinate and Bridgeport take-out caveats; West Nishnabotna emphasizes fast rises, flood-stage no-go guidance, muddy banks, water-quality uncertainty, sandbars, and private-bank limits.
- Reviewed but not added: Wapsipinicon Anamosa-to-Oxford Junction remains blocked because USGS Water Services for `05421760` still returned stale `2017-10-02` instantaneous values during this run despite current-looking third-party display. East Nishnabotna Red-Oak-to-Essex remains weaker on official take-out certainty than the selected set. Cedar Palo-to-Cedar-Rapids was skipped as too close to the existing Chain Lakes / Palo-to-Ellis Harbor corridor.
- No route-gallery assets were added after bounded official / local / USGS / Commons / same-route image review.

## 2026-07-22 23:46 Lower Des Moines / Shell Rock / North Skunk pass

- Baseline at run start: 61 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `des-moines-river-keosauqua-bentonsport`, `shell-rock-river-heery-woods-renning`, and `north-skunk-river-delta-sigourney`, bringing the imported Iowa count to 64 live routes in this checkout.
- Qualification path: Iowa DNR's Lower Des Moines guide supports the exact Keosauqua-to-Bentonsport reach, sandbar-camping/private-upland rules, release variability, old dam remains, and direct Keosauqua gauge context; Butler County / MyCountyParks plus CanWePaddle support the Shell Rock Heery-to-Renning connector with direct Shell Rock gauge range and explicit below-dam launch discipline; CanWePaddle plus Iowa DNR Skunk River map support North Skunk Delta-to-Sigourney with direct Sigourney gauge range and access-corridor caveats.
- Gauge posture: USGS Water Services returned Des Moines at Keosauqua `05490500` at `7,230 cfs / 12.62 ft` at 2026-07-22 23:15 CDT, Shell Rock at Shell Rock `05462000` at `2,180 cfs / 9.25 ft` at 2026-07-22 22:45 CDT, and North Skunk near Sigourney `05472500` at `272 cfs / 5.07 ft` at 2026-07-22 23:30 CDT.
- Threshold posture: Des Moines uses the existing lower-river Keosauqua-gauge community model of `800 / 3,000-4,500 / 6,000 cfs`, applied conservatively to the official upstream reach; Shell Rock uses CanWePaddle's broader Clarksville-to-Shell-Rock `150-2,000 cfs` direct-gauge range for the shorter Heery-to-Renning connector; North Skunk uses CanWePaddle's exact Delta-to-Sigourney `100-1,500 cfs` range.
- Caveat posture: Des Moines currently scores above the conservative high-water ceiling and emphasizes Red Rock release speed, old dam/rock obstructions, silver carp, legal sandbar camping, and private uplands. Shell Rock currently scores just above the broad ceiling and requires a confirmed below-dam Heery Woods start. North Skunk has guarded access-coordinate confidence and requires signed-access verification at Delta/Sigourney.
- Reviewed but not added: Iowa River Coralville-Dam-to-Iowa-City was deferred because official Iowa River Water Trail sources start the lower trail at Sturgis Ferry rather than the dam; West Nishnabotna Oakland-to-Randolph and East Nishnabotna Red-Oak-to-Essex stayed weaker on public endpoint certainty than the selected set.
- No route-gallery assets were added after bounded official / local / USGS / Commons / same-route image review.

## 2026-07-22 Cedar / South Skunk / North Raccoon pass

- Baseline at run start: 60 Iowa live routes, verified from `src/data/rivers.ts` with `tsx`.
- Added `cedar-river-charles-city-nashua`, `south-skunk-river-river-valley-cj-shreck`, and `north-raccoon-river-squirrel-hollow-adkins` beyond that baseline.
- Count caveat: the checkout already had unrelated dirty consolidation code in `src/data/rivers.ts` / `src/data/river-trip-details.ts` that retires `upper-iowa-river-cattle-creek-chimney-rock`, `upper-iowa-river-chimney-rock-bluffton`, and `upper-iowa-river-bluffton-malanaphy` and emits `upper-iowa-river-cattle-creek-malanaphy`; current imported Iowa count after this run is therefore 61, not 63.
- Qualification path: CanWePaddle and USGS support all three direct-gauge threshold models. Cedar is reinforced by Cedar River Paddling Trips guide mileage/coordinates, City of Nashua float context, and a Nashua above-dam mandatory take-out. South Skunk is reinforced by Story County's state water-trail access chain and MyCountyParks C.J. Shreck public access. North Raccoon is reinforced by Greene County / MyCountyParks Squirrel Hollow access/camping and Iowa DNR Greene County North Raccoon guide context for Squirrel Hollow-to-Adkins.
- Gauge posture: USGS Water Services returned Cedar River at Charles City `05457700` at `1,680 cfs / 4.37 ft` at 2026-07-22 22:15 CDT, South Skunk River near Ames `05470000` at `223 cfs / 3.85 ft` at 2026-07-22 22:00 CDT, and North Raccoon River near Jefferson `05482500` at `243 cfs / 5.17 ft` at 2026-07-22 22:15 CDT.
- Threshold posture: all three use conservative route/corridor CanWePaddle bands tied to direct same-river USGS gauges: Cedar `200-2,500 cfs`, South Skunk `100-1,500 cfs`, and North Raccoon `150-2,000 cfs`.
- Caveat posture: Cedar requires above-dam Nashua take-out discipline and keeps the whitewater course separate; South Skunk emphasizes Ames dam/rock-riffle decisions, private non-meandered banks, and C.J. Shreck same-day access checks; North Raccoon emphasizes Adkins take-out verification, non-meandered private-bank restrictions, wood/log piles, and rock-dam/fishing-riffle caution.
- No route-gallery assets were added after bounded CanWePaddle / official-local / USGS / Commons / same-route image review.

## 2026-07-22 Brookwood / Little Sioux / Winnebago pass

- Baseline at run start: 57 Iowa live routes.
- Added `cedar-river-brookwood-janesville`, `little-sioux-river-linn-grove-peterson`, and `winnebago-river-fertile-mason-city`, bringing Iowa to 60 live routes in this checkout.
- Qualification path: CanWePaddle and USGS support all three direct-gauge threshold models. Cedar is reinforced by the Cedar Valley Brookwood-to-Janesville paddling map and City of Waverly Brookwood Park access notes. Little Sioux is reinforced by Iowa DNR Fish Iowa/map context plus Buena Vista County Linn Grove Dam Area and Clay County Riverside Little Sioux Access pages. Winnebago is reinforced by City of Fertile park documentation and Winnebago River water-trail context, but ships with stronger same-day endpoint verification caveats.
- Gauge posture: USGS Water Services returned Cedar River at Janesville `2,540 cfs / 3.23 ft` at 2026-07-22 20:45 CDT, Little Sioux River at Linn Grove `264 cfs / 5.65 ft` at 2026-07-22 21:00 CDT, and Winnebago River at Mason City `168 cfs / 5.12 ft` at 2026-07-22 21:15 CDT.
- Threshold posture: all three use conservative CanWePaddle route-specific estimated bands tied to direct same-river USGS gauges: Cedar `250-3,000 cfs`, Little Sioux `100-1,500 cfs`, and Winnebago `100-1,500 cfs`.
- Caveat posture: Cedar and Little Sioux have stronger public endpoint evidence; Little Sioux requires below-dam launch discipline at Linn Grove. Winnebago is useful but more guarded because the Mason City endpoint is a practical corridor anchor requiring same-day access confirmation. No route-gallery assets were added after bounded official / local / USGS / Commons / same-route image review.

## 2026-07-22 Fort Dodge / Marengo / Cedar Rapids pass

- Baseline at run start: 54 Iowa live routes.
- Added `des-moines-river-fort-dodge-lehigh`, `iowa-river-marengo-amana`, and `cedar-river-chain-lakes-ellis-harbor`, bringing Iowa to 57 live routes in this checkout.
- Qualification path: Iowa DNR Des Moines River guide, Visit Fort Dodge, CanWePaddle, and USGS support Fort Dodge-to-Lehigh with South River District / Dolliver / Lehigh water-trail context, intermediate classification, boulders, riffles, old bridge remains, Dolliver camping context, and direct gauge `05480500`. CanWePaddle, Iowa County access pages, the Iowa River guide, and USGS support Marengo-to-Amana with direct gauge `05453100`, Gateway/Big Bend river access context, long-rural-day caveats, and Amana dam/canal discipline. CanWePaddle, Linn County, Iowa DOT, Cedar Rapids, and USGS support Chain Lakes / Palo to Ellis Harbor with direct gauge `05464500`, Chain Lakes boat-landing context, Ellis Harbor public launch/restrooms, and a hard stop before the Cedar Rapids downtown dam corridor.
- Gauge posture: USGS Water Services returned Des Moines at Fort Dodge `966 cfs / 4.25 ft`, Iowa River at Marengo `2,120 cfs / 8.88 ft`, and Cedar River at Cedar Rapids `8,400 cfs / 5.87 ft` at 2026-07-22 20:00 CDT.
- Threshold posture: all three use conservative CanWePaddle route-specific estimated bands tied to direct same-river USGS gauges: Des Moines `400-8,000 cfs`, Iowa River `300-5,000 cfs`, and Cedar `500-8,000 cfs`. Cedar currently scores above the selected high-water ceiling.
- Caveat posture: endpoint coordinates are practical access-corridor anchors, not surveyed ramp points. The route copy requires same-day access confirmation, especially for the Amana take-out and high-water Cedar Rapids ramp closures.
- No route-gallery assets were added after bounded official / local / USGS / Commons / same-route image review.

## 2026-07-22 Maquoketa/South Raccoon/Shell Rock pass

- Baseline at run start: 51 Iowa live routes.
- Added `maquoketa-river-dundee-manchester`, `south-raccoon-river-redfield-van-meter`, and `shell-rock-river-renning-shell-rock`, bringing Iowa to 54 live routes in this checkout.
- Qualification path: Iowa DNR's Maquoketa Delaware County guide, Delaware County Tourism, Manchester, CanWePaddle, and USGS support Dundee-to-Manchester with public endpoints, 11.8 miles, riffles/wood, Quaker Mill dam-remnant handling, and Manchester whitewater-park finish caveats. Dallas County, Iowa DNR, Travel Iowa, CanWePaddle, and USGS support South Raccoon Redfield-to-Van-Meter with a public carry-down access corridor, Van Meter take-out boundary, sweepers/fast-rise hazards, and no on-route camping. Butler County / MyCountyParks, CanWePaddle, Iowa Whitewater, and USGS support Renning's Landing to Shell Rock Recreation Area as a five-mile public float with endpoint campground support and a strict Shell Rock dam take-out caveat.
- Gauge posture: USGS Water Services returned Maquoketa at Manchester `05416900` at `463 cfs / 5.35 ft` at 2026-07-22 19:15 CDT, South Raccoon at Redfield `05484000` at `150 cfs / 2.57 ft` at 2026-07-22 18:45 CDT, and Shell Rock at Shell Rock `05462000` at `2,250 cfs / 9.29 ft` at 2026-07-22 18:45 CDT.
- Threshold posture: all three use conservative CanWePaddle route/corridor bands tied to direct same-river USGS gauges: Maquoketa `120-1,500 cfs`, South Raccoon `150-2,500 cfs`, and Shell Rock `150-2,000 cfs`. Shell Rock currently scores above the selected high-water ceiling.
- Reviewed but blocked `wapsipinicon-river-anamosa-oxford-junction`: CanWePaddle has a promising exact-route `200-2,800 cfs` range, but the associated Oxford Mills gauge `05421760` returned stale 2017 instantaneous values; the current Anamosa gauge was not substituted without stronger source linkage.
- No route-gallery assets were added after bounded official / local / USGS / Commons / same-route image review.

## 2026-07-22 lower Boone pass

- Baseline at run start: 48 Iowa live routes.
- Added `boone-river-albright-tunnel-mill`, `boone-river-tunnel-mill-bells-mill`, and `boone-river-bells-mill-boone-forks`, bringing Iowa to 51 live routes in this checkout.
- Qualification path: Hamilton County Boone River touring information and Iowa DNR Boone River guide support the lower water-trail access chain, segment mileages, cfs guidance, Bevers Bridge private-access caveat, Class I-II/Tunnel Mill Dam-remains hazards, Bell's Mill campground/ramp context, and Boone Forks hidden/no-downstream-take-out warning. MyCountyParks supports Albright, Tunnel Mill, and Bell's Mill public access context; Iowa DNR Boone Forks ramp project plans publish exact Boone Forks ramp coordinates.
- Gauge posture: USGS Water Services returned Boone River near Webster City `05481000` at `147 cfs / 2.12 ft` at 2026-07-22 18:00 CDT. CanWePaddle publishes the broader Webster-City-to-Stratford `120-1,500 cfs` estimated range, while Hamilton County says `1,100 cfs` or below is good for inexperienced canoeists and `1,500 cfs` and above is advanced-only.
- Overlap posture: these are not Riverside-to-Briggs duplicates. They extend downstream of the existing Riverside-to-Albright card and model materially different lower access pairs, including the remote Albright/Tunnel gradient section and the final Boone Forks mandatory take-out boundary.
- Reused the existing approved CC BY-SA 2.5 Boone River near Albright image for same-river context; no new image file was added.

## 2026-07-22 Wapsipinicon/Raccoon pass

- Baseline at run start: 45 Iowa live routes.
- Added `wapsipinicon-river-independence-quasqueton`, `raccoon-river-van-meter-walnut-woods`, and `north-raccoon-river-eureka-henderson`, bringing Iowa to 48 live routes in this checkout.
- Qualification path: Buchanan County / Iowa DNR Wapsipinicon material supports the Independence-to-Quasqueton access chain, Iron Bridge split, camping context, and dam/rising-water/log safety; Iowa DNR Raccoon guide plus ICON/Walnut Woods support the Van Meter-to-Walnut Woods access chain, Commerce Ledges caution, endpoint campground, and downstream dam boundary; Iowa DNR Greene County guide plus Greene County MyCountyParks support Eureka Bridge to Henderson as the short 4.5-mile split inside McMahon-to-Henderson with wood and rock-dam hazards.
- Gauge posture: USGS Water Services returned Wapsipinicon Independence `05421000` at `1,160 cfs / 5.90 ft` at 2026-07-22 17:30 CDT, Raccoon Van Meter `05484500` at `745 cfs / 3.28 ft` at 17:00 CDT, and North Raccoon Jefferson `05482500` at `248 cfs / 5.18 ft` at 17:15 CDT.
- Scoring posture is guarded community evidence: CanWePaddle publishes route-specific estimated ranges for Independence-to-Quasqueton (`150-2,000 cfs`) and Van-Meter-to-Walnut-Woods (`300-5,000 cfs`); North Raccoon uses the broader Jefferson-to-Cooper `150-2,000 cfs` range against a source-strong Eureka-to-Henderson access pair, so its copy explicitly requires a visual check at Eureka.
- No route-gallery assets were added after bounded official / local / USGS / Commons / same-route review.

## 2026-07-22 Cedar River flatwater pass

- Baseline at run start: 42 Iowa live routes.
- Added `cedar-river-road-t38-idlewild`, `cedar-river-idlewild-rotary`, and `cedar-river-rotary-charles-city-dock`, bringing Iowa to 45 live routes in this checkout.
- Qualification path: Cedar River Paddling Trips documents the Road T38, Idlewild Park, Rotary Park, and Charles City Dock access chain with mileages and GPS coordinates, directs paddlers to USGS `05457700`, and gives `200 cfs` as the adequate-water floor with `400-600 cfs` as a better range. Mitchell County Conservation and Iowa DNR corroborate water-trail/public-access context, and City of Nashua corroborates the downstream public access chain. USGS Water Services returned `1,820 cfs / 4.56 ft` at `2026-07-22 16:15 CDT`.
- Scoring stays minimum-only because no source publishes a flatwater high cutoff; current conditions are therefore treated with high/pushy caveats instead of an invented upper band. No route-gallery assets were added after bounded guide / local-agency / USGS / Commons review.

## 2026-07-22 Upper Iowa split pass

- Baseline at run start: 39 Iowa live routes.
- Added `upper-iowa-river-cattle-creek-chimney-rock`, `upper-iowa-river-chimney-rock-bluffton`, and `upper-iowa-river-bluffton-malanaphy`, bringing Iowa to 42 live routes in this checkout.
- Qualification path: Upper Iowa River Paddler's Guide mileposts support Cattle Creek Road, Chimney Rock Park Access, Bluffton Fir Stand Access, and Malanaphy Springs Access; Wisconsin River Trips supports the Cattle-to-Chimney and Chimney-to-Bluffton scenic splits plus the accepted `150 / 200-500 / 700 cfs` Bluffton-gauge ladder for the upper two cards; Miles Paddled Upper Iowa IV supports the 150 cfs minimum and 375 cfs adequate observed level for the Bluffton-to-Malanaphy card; USGS Water Services returned `871 cfs / 4.69 ft` at `2026-07-22 14:45 CDT` for direct gauge `05387440`.
- Overlap posture: these are intentional contained access-pair splits in the high-use Bluffton corridor. Do not continue adding more Upper Iowa split cards unless product policy explicitly wants more planner-card granularity or a materially stronger official threshold/source package appears.
- Camping remains `nearby_basecamp` for all three because nearby private campgrounds/liveries exist, but no public on-route watercraft campsite was confirmed for these short day splits. Bounded image review stayed negative, so no gallery asset was added.

## 2026-07-06 North Fork Maquoketa continuation pass

- Added `north-fork-maquoketa-river-d61-ozark`, `north-fork-maquoketa-river-d61-caven`, and `north-fork-maquoketa-river-cascade-caven`.
- The implementation package stayed on the same live direct USGS Fulton gauge `05418400`, which returned `939 cfs / 5.03 ft` at `2026-07-06 12:00 CDT` in the current run.
- Route shape and access support stayed internet-sourced and implementation-grade: Dubuque County still lists D61 Access as true public canoe/kayak access on Whitewater Creek, Jackson County still lists Ozark Bridge and Caven Bridge Access on the North Fork water trail, Jones County still describes the lower North Fork below Cascade as the remote Ozark/Caven wilderness corridor, and Wisconsin River Trips still documents the Whitewater Creek Mouth to 21st Ave continuation plus the Ozark Wildlife Area route with the same Fulton-gauge ladder.
- All three routes reuse the same conservative two-sided Fulton-gauge model already accepted on the live North Fork routes: below `150 cfs` too shallow, `231-400 cfs` broad target, and `701+ cfs` beyond the normal recreational recommendation.
- Camping stayed conservative at `none` because no verified legal on-route campsite cleared for these exact long corridor records. Bounded image review stayed negative, so no gallery asset was added.

## 2026-07-06 Turkey River and North Fork Maquoketa pass

- Added `turkey-river-gilbertson-elkader`, `north-fork-maquoketa-river-cascade-d61`, and `north-fork-maquoketa-river-cascade-ozark`.
- The Turkey River implementation package relied on the 2025 Turkey River Water Trail guide PDF for the official Gilbertson-to-Big-Spring-to-Elkader access chain, Miles Paddled for the exact Elgin-to-Elkader route narrative and conservative `250+ cfs / 5.5 ft` Elkader-gauge floor, Fayette County / MyCountyParks for named public endpoints and camping context, and same-day USGS Water Services showing `1550 cfs / 7.07 ft` at Elkader gauge `05412020` on 2026-07-06.
- The North Fork Maquoketa package relied on the City of Cascade, Dubuque County, Jones County, Jackson County / MyCountyParks, Wisconsin River Trips, and Miles Paddled to confirm the Riverview Park, D61, and Ozark public corridor plus the exact route geometry and conservative Fulton-gauge ladder. Same-day USGS Water Services showed `943 cfs / 5.04 ft` at Fulton gauge `05418400` on 2026-07-06.
- `north-fork-maquoketa-river-cascade-d61` and `north-fork-maquoketa-river-cascade-ozark` both use the direct same-river Fulton gauge with minimum-oriented threshold support from community route reports rather than a polished official ladder, which is still acceptable under the current Iowa bar because the gauge is live, same-river, and tied to the exact corridor.
- Bounded image search stayed negative for all three new slugs, so no gallery asset was added.

## Main Blockers

- Remaining candidates tend to have no live gauge, weak thresholds, or proxy gauges that are not strong enough for product scoring.
- Avoid duplicate corridor adds unless the new reach has distinct user value and a stronger evidence package than the mature Iowa baseline.

## Current Guidance

- Pause broad Iowa cadence again after this mixed Turkey / North Fork Maquoketa pass.
- Reopen Iowa only for focused runs where an official access chain, live same-river gauge support, and route-specific threshold evidence all improve materially.
- Prefer genuinely new river coverage over more Turkey / Maquoketa / Upper Iowa continuations unless a missing public segment is unusually strong.

