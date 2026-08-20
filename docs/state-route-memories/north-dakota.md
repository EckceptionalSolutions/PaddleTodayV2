# North Dakota Route Memory

## 2026-08-20 Big Muddy / Heart / Missouri gauge batch

- Run `route-worker-202608200917-nd-bigmuddy-heart-missouri-no-add` screened the next five North Dakota provider-baseline gauges and added no route.
- `usgs:06347500` Big Muddy Creek near Almont and `usgs:06348500` Sweetbriar Creek near Judson were recorded `screened_out` / `not_paddle_relevant`: fresh USGS values were 2.59 cfs / 1.23 ft and 0.73 cfs / 1.86 ft, while official sources surfaced no supported point-to-point creek route package. Sweetbriar Lake and nearby fishing/camping context was not generalized to the creek.
- `usgs:06348300` Heart River at Stark Bridge and `usgs:06349000` Heart River near Mandan were recorded `blocked` / `route_capable`: fresh values were 61.9 cfs / 2.22 ft and 68.2 cfs / 9.29 ft. Fort Abraham Lincoln supplies lower Heart/Missouri recreation, a kayak/canoe launch, and camping context, but no station-specific endpoints, numeric threshold, access/safety, coordinates, image, or geometry package cleared.
- `usgs:06349070` Missouri River below Mandan was recorded `stale_or_unsupported` / `route_capable`: fresh USGS returned stage-only 20.21 ft with no discharge metric. Morton County provides a Missouri River boat ramp but explicitly no camping at the Natural Area; North Dakota warns of current, wind, and navigation/construction hazards, and no station-specific route package cleared.
- No camping was inferred from lake, fishing, shoreline, park, or reservoir context. No route data, trip details, image-audit rows, endpoint coordinates, camping package, safety package, canonical geometry, coordinate correction, or route order changed. Next bounded rotation continues with the next unreviewed North Dakota provider-baseline gauges after the task-board queue advances.

## 2026-08-20 Antelope / Apple / Bear / Beaver gauge batch

- Run `route-worker-202608200849-nd-antelope-apple-bear-beaver-no-add` screened the next five North Dakota provider-baseline gauges and added no route.
- `usgs:06347000` Antelope Creek near Carson, `usgs:06470800` Bear Creek near Oakes, and `usgs:06354580` Beaver Creek below Linton are durable `screened_out` / `not_paddle_relevant` dispositions. Official/public evidence did not establish supported point-to-point river routes; the Beaver Creek Recreation Area evidence is Lake Oahe reservoir camping and boating context, not a Beaver Creek gauge-reach route.
- `usgs:06349500` Apple Creek near Menoken remains `blocked` / `route_capable`: public kayaking context exists, but no station-specific endpoints, numeric threshold, route shape, access/camping/safety package, coordinates, rights-clean image decision, or geometry cleared.
- `usgs:06332515` Bear Den Creek near Mandaree is `stale_or_unsupported` / `route_capable`: the current 24-hour USGS query returned no valid discharge or stage, and the last official current-conditions value located was 3.07 cfs / 4.77 ft on 2026-04-27. No route package cleared.
- Fresh USGS values used in the disposition pass: Antelope 0.62 cfs / 4.49 ft, Apple 10.8 / 4.67, Bear near Oakes 0.32 / 5.42, Beaver below Linton 10.3 / 4.36, all at the latest valid 2026-08-19 09:00-09:15 CDT samples. No camping was inferred from wildlife, fishing, reservoir, historic-site, or campground context.
- No route data, trip details, image-audit rows, endpoint coordinates, camping package, safety package, canonical geometry, coordinate correction, or route order changed. Next bounded rotation begins with `usgs:06347500`, `usgs:06348300`, `usgs:06348500`, `usgs:06349000`, and `usgs:06349070`.

## 2026-07-15 Sheyenne National Grassland continuation pass

- Rebuilt the live route inventory at run start and confirmed North Dakota still had only four live slugs: `sheyenne-river-fish-hatchery-chautauqua`, `sheyenne-river-brome-field-mirror-pool`, `pembina-river-vang-riverside-park`, and `little-missouri-rough-rider-medora-bridge`.
- Added three new Sheyenne National Grassland slugs beyond that baseline: `sheyenne-river-ylvisaker-bridge-brome-field`, `sheyenne-river-mirror-pool-east-river`, and `sheyenne-river-brome-field-east-river`.
- Current source package rechecked live in this run:
  - The current USDA Forest Service Sheyenne River Water Trail page still says the trail is open, still points paddlers to direct USGS gauge `05058000` below Baldhill Dam, and still publishes the official Sheyenne bands of `<=100` very low, `100-300` navigable with exposed obstacles, `300-1000` optimal, `1000-2000` caution, and `>2000` avoid.
  - The current USFS water-activities page still names Ylvisaker Bridge, Brome Field, Mirror Pool, and East River as the four primary semi-primitive grassland access sites, and the current USFS fishing page still adds that Brome Field and East River have picnic tables and bike racks.
  - Direct same-day USGS Water Services for `05058000` returned `301 cfs / 24.81 ft` at `2026-07-15 15:00 CDT`, which lands at the lower edge of the official optimal band and clears the current live-gauge gate.
  - The official USFS / GovInfo 2019 Sheyenne National Grassland brochure map still labels Ylvisaker at river mile `0`, Brome Field at `3`, Mirror Pool at `8`, and East River at `16`, and the same geospatial access-anchor workflow already used for the live Brome-to-Mirror route was extended to the remaining Ylvisaker and East River hand-launch icons for practical endpoint anchors.
- Route packaging decisions in this run:
  - `sheyenne-river-ylvisaker-bridge-brome-field` ships as the shortest upstream day split with `campingClassification: 'none'`.
  - `sheyenne-river-mirror-pool-east-river` ships as the longer downstream day split with `campingClassification: 'none'`.
  - `sheyenne-river-brome-field-east-river` ships as the long continuation with `campingClassification: 'overnight_capable'` because the official brochure map marks overnight-camping icons along that corridor.
- Photo status: no route-gallery image was added. `docs/river-image-source-audit.csv` records bounded 2026-07-15 USFS / GovInfo / Commons / USGS review with no clearly rights-clean exact-route paddling image selected for the three new grassland slugs.

## 2026-06-12 Fort Ransom coordinate blocker refresh 13:03

- Rebuilt current inventory from route data: North Dakota has 3 live route objects and 3 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua`, `pembina-river-vang-riverside-park`, and `little-missouri-rough-rider-medora-bridge`, with 13 structured North Dakota ledger rows before this pass.
- No route was added. Refreshed `nd-sheyenne-river-fort-ransom-sportsman-landing`; it remains `needs_manual_coordinates`.
- Official route/range evidence still holds: Valley City Tourism and USFS support the Fort Ransom Sheyenne River Water Trail segment and the route-wide Sheyenne `<=100 / 100-300 / 300-1000 / 1000-2000 / >2000 cfs` bands. ND Parks and North Dakota Tourism still confirm Fort Ransom State Park canoeing/kayaking and rental context.
- Gauge check: USGS Water Services IV returned current product-style values for direct same-river gauge `05058650` Sheyenne River at Fort Ransom State Park (`633 cfs / 19.01 ft` at 2026-06-12 12:15 CDT), inside the official optimal band.
- Decisive blocker: fresh web searches and Nominatim named-feature checks still did not verify exact source-backed coordinate pairs for the Fort Ransom State Park kayak/canoe access or Sportsman Landing dock above the dam. Keep this route out of app data because the dam-adjacent take-out makes inferred endpoint placement unacceptable.
- Photo status: no route-gallery image was added; the image audit records the deferred Fort Ransom lead without a selected rights-clean local asset.

## 2026-06-12 Little South Pembina seed review 12:53

- Rebuilt current inventory from route data: North Dakota has 3 live route objects and 3 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua`, `pembina-river-vang-riverside-park`, and `little-missouri-rough-rider-medora-bridge`, with 12 structured North Dakota ledger rows before this pass.
- No route was added. Seeded `nd-little-south-pembina-99th-123rd` as `threshold_weak`.
- Promising evidence found: American Whitewater identifies the Little South Pembina 99th Street NE-to-bridge-just-shy-of-Pembina River confluence reach, exposes exact feature coordinates for the 99th Street NE put-in, optional 117th Avenue NE upper put-in, and 123rd Avenue take-out, and ties the reach to direct USGS `05099400` Little South Pembina River near Walhalla.
- Gauge check: USGS Water Services IV returned current product-style values for `05099400` (`29.2 cfs / 1.63 ft` at 2026-06-12 12:15 CDT), matching AW's below-recommended status.
- Decisive blocker: route-package and threshold confidence are still too weak for app data. AW presents a `5.6-19 mi` family rather than one clean public day route, bridge-use access is not corroborated by a clean official endpoint page, and the numeric model remains community/AW-only with a 100 cfs low-runnable floor and an overly broad high-runnable ceiling instead of defensible low/ideal/high bands.
- Photo status: no route-gallery image was added; the image audit records the deferred Little South Pembina lead without a selected rights-clean local asset.

## 2026-06-12 Fort Ransom coordinate blocker refresh 12:42

- Rebuilt current inventory from route data: North Dakota has 3 live route objects and 3 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua`, `pembina-river-vang-riverside-park`, and `little-missouri-rough-rider-medora-bridge`, with 12 structured North Dakota ledger rows before this pass.
- No route was added. Refreshed `nd-sheyenne-river-fort-ransom-sportsman-landing`; it remains `needs_manual_coordinates`.
- Official route/range evidence still holds: Valley City Tourism and USFS support the Fort Ransom Sheyenne River Water Trail segment and the route-wide Sheyenne `<=100 / 100-300 / 300-1000 / 1000-2000 / >2000 cfs` bands. ND Parks still confirms Fort Ransom State Park's Sheyenne River canoeing/kayaking context, kayak/canoe rentals, and park river context.
- Gauge check: USGS Water Services IV returned current product-style values for direct same-river gauge `05058650` Sheyenne River at Fort Ransom State Park (`633 cfs / 19.01 ft` at 2026-06-12 12:15 CDT), inside the official optimal band.
- Decisive blocker: exact source-backed coordinate pairs for both the Fort Ransom State Park kayak/canoe access and Sportsman Landing dock above the dam still did not surface. Keep this route out of app data because the dam-adjacent take-out makes inferred endpoint placement unacceptable.
- Photo status: no route-gallery image was added; the image audit records the deferred Fort Ransom lead without a selected rights-clean local asset.

## 2026-06-12 Souris / J. Clark Salyer threshold refresh 12:32

- Rebuilt current inventory from route data: North Dakota has 3 live route objects and 3 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua`, `pembina-river-vang-riverside-park`, and `little-missouri-rough-rider-medora-bridge`, with 12 structured North Dakota ledger rows before this pass.
- No route was added. Refreshed `nd-souris-river-j-clark-salyer-canoe-trail`; it remains `threshold_weak`.
- Official route/access evidence still holds: USFWS confirms the J. Clark Salyer Souris River Canoe Trail as a National Recreation Trail with a 5.5-mile Johnson Bridge-to-Thompson Well option, a 13-mile Johnson Bridge-to-Dam 1 option, mile markers, and 2-3 hour / 5-7 hour timing. Current USFWS/GovInfo fishing materials confirm boat/nonmotorized use from 100 yards upstream of Johnson Bridge to Dam 1.
- Gauge checks: USGS Water Services IV returned current same-river family values for `05117500` Souris River above Minot (`158 cfs / 4.76 ft` at 2026-06-12 12:15 CDT), `05122000` Souris River near Bantry (`59.8 cfs / 2.13 ft` at 12:00 CDT), and `05124000` Souris River near Westhope (`30.8 cfs / 5.86 ft` at 12:00 CDT).
- Decisive blocker: no official refuge/USGS source-backed numeric low/ideal/high paddling bands tied to one selected gauge surfaced. Keep the route out of app data because wetland/refuge water-control context makes threshold inference too weak for V2 scoring.
- Photo status: no route-gallery image was added; the image audit records the deferred J. Clark Salyer lead without a selected rights-clean local asset.

## 2026-06-12 Little Missouri implementation pass 12:22

- Rebuilt current inventory from route data: North Dakota had 2 live route objects and 2 trip-detail keys before this pass, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, with 12 structured North Dakota ledger rows.
- Added `little-missouri-rough-rider-medora-bridge` as the third North Dakota route.
- Route/gauge/threshold evidence: NPS Theodore Roosevelt names Sully Creek State Park-to-Medora Bridge as a three-mile Little Missouri reach and publishes official Medora gauge boating guidance of at least `2.5 ft / 699 cfs` for fair boating and `2.5-3.5 ft / 699-1500 cfs` for good boating. USGS Water Services IV for direct gauge `06336000` returned `66.3 cfs / 1.80 ft` at 2026-06-12 12:00 CDT during implementation.
- Endpoint/access evidence: ND Parks confirms Rough Rider / former Sully Creek State Park has Little Missouri canoe/kayak access, and its park map marks kayak/canoe access. The take-out uses the official USGS Medora bridge/gauge coordinate `46.91684167, -103.53228333` for the NPS-named Medora Bridge endpoint; the put-in retains the prior ND Parks Rough Rider practical access anchor `46.89263398, -103.54044775`.
- Product model: implemented as guarded `minimum-only` with `tooLow: 699` because NPS gives a fair floor and good band, but only qualitative high-water warnings. Route copy emphasizes shallow dragging below the floor, fast storm rises, debris, fences, mud, private banks, limited services, and bridge-area take-out verification.
- Photo status: no route-gallery image was added; the image audit now records the implemented route without a selected rights-clean local asset.

## 2026-06-12 Missouri River Washburn/Sanger blocker refresh 12:12

- Rebuilt current inventory from route data: North Dakota still has 2 live route objects and 2 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, with 12 structured North Dakota ledger rows before this pass.
- No route was added. Refreshed `nd-missouri-river-washburn-sanger-landing`; it remains `threshold_weak`.
- Official route/access evidence still holds: North Dakota Parks and Recreation / Cross Ranch identify the Washburn-to-Sanger boat landing Missouri River run as a nine-mile kayak/canoe route with park shuttle/rental context, and note timing depends on paddler speed and river speed.
- Gauge: direct same-corridor USGS `06341000` Missouri River at Washburn returned product-style stage-only data of `9.36 ft` at `2026-06-12 11:15 CDT`; the `00060/00065` Water Services request did not return discharge.
- Decisive blocker: no official or credible source-backed numeric private-paddlecraft low/ideal/high bands tied to `06341000` or another accepted gauge surfaced. Keep this big-river route out of app data because regulated current, wind, motor traffic, stage-only scoring, and unsupported thresholds remain unresolved.
- Photo status: no route-gallery image was added; the image audit records the deferred Washburn/Sanger lead without a selected rights-clean local asset.

## 2026-06-12 Sheyenne National Grassland coordinate blocker refresh 12:03

- Rebuilt current inventory from route data: North Dakota still has 2 live route objects and 2 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, with 12 structured North Dakota ledger rows before this pass.
- No route was added. Refreshed `nd-sheyenne-river-national-grassland-ylvisaker-brome`; it remains `needs_manual_coordinates`.
- Official route/range evidence still holds: USFS confirms the Sheyenne River Water Trail in the Sheyenne National Grassland, names Ylvisaker Bridge, Brome Field, Mirror Pool, and East River as designated hand-launch/pull-out access sites, and publishes the Sheyenne `<=100 / 100-300 / 300-1000 / 1000-2000 / >2000 cfs` bands.
- Product-live checks succeeded for same-river USGS gauges: `05058700` Lisbon returned `690 cfs / 5.17 ft` at 2026-06-12 11:45 CDT, `05058650` Fort Ransom State Park returned `641 cfs / 19.04 ft` at 2026-06-12 11:15 CDT, and `05059000` Kindred returned `637 cfs / 5.70 ft` at 2026-06-12 11:00 CDT.
- Decisive blocker: the USFS Visitor Maps and Guides page, readable Forest Service/GovInfo water-trail PDFs, and downloaded state Outdoor Heritage Fund grant PDF lead still did not provide exact source-backed coordinate pairs for a selected public day segment among the Grassland access sites. Do not infer coordinates from map artwork, river miles, road intersections, or public-land boundary context.
- Photo status: no route-gallery image was added; the image audit records the deferred Grassland lead and no selected rights-clean local asset.

## 2026-06-12 Sheyenne National Grassland blocker refresh 11:53

- Rebuilt current inventory from route data: North Dakota still has 2 live route objects and 2 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, with 12 structured North Dakota ledger rows before this pass.
- No route was added. Refreshed `nd-sheyenne-river-national-grassland-ylvisaker-brome` from `threshold_weak` to `needs_manual_coordinates`.
- Official access/range evidence still holds: USFS confirms the Sheyenne River Water Trail in the Sheyenne National Grassland, names Ylvisaker Bridge, Brome Field, Mirror Pool, and East River as designated hand-launch or pull-out access sites, and repeats the Sheyenne `<=100 / 100-300 / 300-1000 / 1000-2000 / >2000 cfs` bands.
- Product-live checks succeeded for same-river USGS gauges: `05058700` Lisbon returned `682 cfs / 5.14 ft` at 2026-06-12 10:45 CDT, `05058650` Fort Ransom State Park returned `641 cfs / 19.04 ft` at 2026-06-12 11:15 CDT, and `05059000` Kindred returned `637 cfs / 5.70 ft` at 2026-06-12 11:00 CDT.
- Decisive blocker: exact source-backed coordinate pairs for a selected public day segment among Ylvisaker Bridge, Brome Field, Mirror Pool, and East River still were not verified. Keep this family out of route data until accepted public-access or named-map sources pin the endpoints.
- Photo status: no route-gallery image was added; the image audit records the deferred Grassland lead and no selected rights-clean local asset.

## 2026-06-12 Sheyenne Bjornson/Riparian seed review 11:43

- Rebuilt current inventory from route data: North Dakota still has 2 live route objects and 2 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, with 11 structured North Dakota ledger rows before this pass.
- No route was added. Seeded `nd-sheyenne-river-bjornson-riparian-site` as `needs_manual_coordinates`.
- Promising evidence found: Valley City Tourism identifies the Bjornson Golf Course-to-Riparian Restoration Site segment, with Bjornson as a primitive launch at L-240, the Riparian Site as an accessible pull-out / canoe landing at L-234, 3-5 hour float time, and dangerous unmarked dams downstream. Valley City Tourism scenic-byway context confirms the Riparian Restoration Interpretive Site is a river education site, picnic area, and canoe landing.
- Gauge: direct same-city USGS `05058500` Sheyenne River at Valley City. Local USGS Water Services IV returned `556 cfs / 4.58 ft` at 2026-06-12 10:45 CDT.
- Thresholds: USFS and Valley City Tourism official Sheyenne water-trail bands remain strong: `<=100 cfs` very low, `100-300 cfs` navigable with exposed obstacles, `300-1000 cfs` optimal, `1000-2000 cfs` caution, and `>2000 cfs` avoid.
- Decisive blocker: exact source-backed coordinates for the Bjornson primitive launch and Riparian Restoration Interpretive Site accessible canoe landing were not verified. Named-feature searches returned no usable coordinate records, and the downstream dam hazard makes inferred endpoint placement unacceptable.
- Photo status: no route-gallery image was added; the image audit records the deferred lead and a public-domain scenic-byway/Riparian-area image lead without a selected local asset.

## 2026-06-12 Red River Grand Forks seed review 11:33

- Rebuilt current inventory from route data: North Dakota still has 2 live route objects and 2 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, with 10 structured North Dakota ledger rows before this pass.
- No route was added. Seeded `nd-red-river-lincoln-drive-lafave-park` as `threshold_weak`.
- Promising evidence found: Minnesota DNR Red River State Water Trail map text identifies Lincoln Drive Park trailer access to LaFave Park trailer access as a 2-mile quick trip, with Downtown Landing and Riverside Dam/Rapids downstream context. Grand Forks Park District confirms Lincoln Drive Park has a boat ramp to the Red River, and Visit Grand Forks/Greenway pages confirm downtown non-motorized paddling and rental context.
- Gauge: direct USGS `05082500` Red River of the North at Grand Forks, ND. Local USGS Water Services IV returned `2930 cfs / 16.94 ft` at 2026-06-12 10:45 CDT.
- Decisive blocker: no official or credible source-backed numeric low/ideal/high paddling bands tied to `05082500` surfaced. Minnesota DNR guidance remains generic: check water levels, low water may not be suitable, and hazards include a dam, widely fluctuating water levels, flooding, snags, muddy banks, and dramatic flow changes.
- Photo status: no route-gallery image was added; the image audit records the deferred Red River lead without a selected rights-clean reusable route image.

## 2026-06-12 Sheyenne National Grassland seed review 11:23

- Rebuilt current inventory from route data: North Dakota still has 2 live route objects and 2 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, with 9 structured North Dakota ledger rows before this pass.
- No route was added. Refreshed `nd-sheyenne-river-fort-ransom-sportsman-landing` and seeded `nd-sheyenne-river-national-grassland-ylvisaker-brome`.
- Fort Ransom remains `needs_manual_coordinates`: Valley City Tourism and ND Parks still support the named segment, official Sheyenne bands, and the direct Fort Ransom gauge story, but a fresh named-map coordinate search for Sportsman Landing / Fort Ransom kayak-canoe access did not surface accepted feature coordinates. Do not infer the take-out near the dam.
- New National Grassland family is `threshold_weak`: USFS/GovInfo confirm Ylvisaker Bridge, Brome Field, Mirror Pool, and East River hand-launch/pull-out access context plus the same Sheyenne `100/300/1000/2000 cfs` bands, but this pass did not verify a selected short public day segment with exact endpoint coordinate pairs.
- Gauge status: Fort Ransom retains direct USGS `05058650` evidence from the prior same-day pass; the National Grassland family has broad USFS guidance tied to USGS `05058000` below Baldhill Dam, but no selected endpoint package.
- Photo status: no route-gallery image was added; the image audit records the deferred National Grassland lead without a selected rights-clean reusable route image.

## 2026-06-12 Fort Ransom seed review 11:12

- Rebuilt current inventory from route data: North Dakota now has 2 live route objects and 2 trip-detail keys, `sheyenne-river-fish-hatchery-chautauqua` and `pembina-river-vang-riverside-park`, plus 8 structured North Dakota ledger rows before this pass.
- No route was added. Seeded `nd-sheyenne-river-fort-ransom-sportsman-landing` as `needs_manual_coordinates`.
- Strong evidence found: Valley City Tourism names the Fort Ransom State Park-to-Fort Ransom town segment, river miles L-185 to L-181, approximate 2-hour timing, Fort Ransom State Park accessible launch, and Sportsman Landing dock above the dam.
- Gauge: direct USGS `05058650` Sheyenne River at Fort Ransom State Park. Local USGS Water Services IV returned `641 cfs / 19.04 ft` at 2026-06-12 10:15 CDT.
- Thresholds: USFS and Valley City Tourism publish the same Sheyenne water-trail bands used by the existing Sheyenne route: `<=100 cfs` very low, `100-300 cfs` navigable with exposed obstacles, `300-1000 cfs` optimal, `1000-2000 cfs` caution, and `>2000 cfs` avoid.
- Decisive blocker: exact source-backed coordinates for the Fort Ransom accessible launch and Sportsman Landing were not verified. Do not infer these points from the river line or park map symbol, especially because the take-out is documented as above a dam and local incident reports reinforce the hazard.
- Photo status: no route-gallery image was added; the image audit records official route/context media leads but no selected rights-clean reusable route image.

## 2026-06-12 Pembina implementation pass 11:04

- Rebuilt current inventory from route data before editing: North Dakota had 1 live route object and 1 trip-detail key, both for `sheyenne-river-fish-hatchery-chautauqua`, plus 7 structured North Dakota ledger rows.
- Added `pembina-river-vang-riverside-park` as the second North Dakota route.
- The route cleared because Pembina County and Walhalla/Rendezvous Region materials identify canoe/kayak access at Vang Bridge, Brickmine Bridge, White Bridge, and Riverside Park; ND Parks says Pembina Gorge visitors can kayak or canoe the Pembina River when water levels allow and identifies 3.5-mile and 10.75-mile paddle options; American Whitewater identifies the County 55-to-County 32 / Walhalla reach with endpoint coordinates, direct USGS `05099600`, and numeric 300/800/1400/3000 cfs bands.
- Product-live check succeeded locally: USGS Water Services IV returned `05099600` values of `558 cfs / 3.02 ft` at 2026-06-12 10:00 CDT.
- Endpoint coordinates use American Whitewater feature coordinates corroborated by county/city access context: Vang Bridge / County 55 access `48.9169, -98.056`; Walhalla Riverside Park / White Bridge access `48.91360599, -97.91712315`.
- The route ships as `routeType: 'whitewater'` because American Whitewater is the threshold source and the reach has Class I-II boulder gardens, strainers, muddy/unstable banks, fast rain response, and bridge/roadside access caveats.
- Photo status: no route-gallery image was added. The image audit records county/city/ND Parks/AW media leads, but no rights-clean reusable local gallery image was selected.

## 2026-06-12 Little Missouri Rough Rider seed review 10:53

- Rebuilt current inventory from route data: North Dakota still has 1 live route object and 1 trip-detail key, both for `sheyenne-river-fish-hatchery-chautauqua`, with 6 structured North Dakota ledger rows before this pass and 7 after seeding the new Little Missouri lead.
- No additional route was added. The implemented Sheyenne route remains the only North Dakota route.
- Seeded `nd-little-missouri-rough-rider-medora-bridge` as `needs_manual_coordinates`: NPS confirms Sully Creek State Park-to-Medora Bridge as a 3-mile Little Missouri reach, and ND Parks confirms Rough Rider State Park has canoe/kayak access on the Little Missouri.
- Product-live check succeeded locally again: USGS Water Services IV for direct Medora gauge `06336000` returned `68.0 cfs / 1.81 ft` at 2026-06-12 10:00 CDT.
- Thresholds are no longer the blocker for this short Little Missouri family: NPS publishes at least `2.5 ft / 699 cfs` for fair boating and `2.5-3.5 ft / 699-1500 cfs` for good boating at Medora.
- The candidate remains blocked because exact public Medora Bridge take-out coordinates and normal private-paddler access were not verified strongly enough. Do not infer the take-out from a bridge name, a mileage point, or river-line geometry.
- Photo status: no route-gallery image was added; the image audit records the deferred Rough Rider / Medora Bridge lead without a selected rights-clean route image.

## 2026-06-12 Little Missouri endpoint blocker refresh 10:42

- Rebuilt current inventory from route data: North Dakota still has 1 live route object and 1 trip-detail key, both for `sheyenne-river-fish-hatchery-chautauqua`, with 6 structured North Dakota ledger rows.
- No additional route was added. The implemented Sheyenne route remains the only North Dakota route.
- Rechecked `nd-little-missouri-medora-cottonwood-campground`: NPS still names Medora Bridge-to-Cottonwood Campground as a 3.5-mile reach and publishes official Medora gauge thresholds of at least `2.5 ft / 699 cfs` for fair boating and `2.5-3.5 ft / 699-1500 cfs` for good boating.
- Product-live check succeeded locally again: USGS Water Services IV for `06336000` returned `68.0 cfs / 1.81 ft` at 2026-06-12 10:00 CDT.
- The candidate remains `needs_manual_coordinates`: this pass did not verify exact public launch/take-out coordinates and normal private-paddler access for both Medora Bridge and Cottonwood Campground. Do not infer endpoints from NPS mileage points, campground proximity, third-party campground coordinates, or river-line geometry.
- Photo status: no route-gallery image was added; the image audit row records the deferred Little Missouri lead without a selected rights-clean route image.

## 2026-06-12 Little Missouri endpoint blocker refresh

- Rebuilt current inventory from route data: North Dakota still has 1 live route object and 1 trip-detail key, both for `sheyenne-river-fish-hatchery-chautauqua`, with 6 structured North Dakota ledger rows.
- No additional route was added. The implemented Sheyenne route remains the only North Dakota route.
- Rechecked `nd-little-missouri-medora-cottonwood-campground`: NPS still names Medora Bridge-to-Cottonwood Campground as a 3.5-mile reach and still publishes Medora gauge thresholds of at least `2.5 ft / 699 cfs` for fair boating and `2.5-3.5 ft / 699-1500 cfs` for good boating.
- Product-live check succeeded locally again: USGS Water Services IV for `06336000` returned `68 cfs / 1.81 ft` at 2026-06-12 10:00 CDT.
- The candidate remains `needs_manual_coordinates`: NPS maps and campground context confirm Cottonwood Campground, but this pass still did not verify exact public launch/take-out coordinates and normal private-paddler access for both Medora Bridge and Cottonwood Campground. Do not infer endpoints from mileage points, river-line geometry, or campground proximity.
- Photo status: no route-gallery image was added; the image audit row now records that the Little Missouri lead remains deferred without a selected rights-clean route image.

## 2026-06-12 Little Missouri promotion audit

- Rebuilt current inventory from route data: North Dakota still has 1 live route object and 1 trip-detail key, both for `sheyenne-river-fish-hatchery-chautauqua`.
- No additional route was added. The implemented Sheyenne route remains the only North Dakota route.
- Promoted the Little Missouri blocker: the NPS Theodore Roosevelt canoeing/kayaking page now provides official Medora gauge boating guidance, saying at least `2.5 ft / 699 cfs` at Medora is required for fair boating and `2.5-3.5 ft / 699-1500 cfs` is good boating. Local USGS Water Services IV for `06336000` returned product-style same-day values of `68 cfs / 1.81 ft` at 2026-06-12 10:00 CDT.
- The broad `nd-little-missouri-medora-long-x-bridge` family remains `research_later`: NPS frames Medora-to-Long-X / Hwy 85 as about 107.5 miles and roughly five days through remote terrain, with fences, flood/debris, limited drinking water, camping-permit, private-land, and emergency-response caveats.
- Seeded `nd-little-missouri-medora-cottonwood-campground` as `needs_manual_coordinates`: NPS lists Medora Bridge-to-Cottonwood Campground as a 3.5-mile short segment and the gauge/threshold story is strong, but this run did not verify public launch/take-out coordinates and normal private-paddler access at both endpoints. Do not infer coordinates from the river line.
- Photo status: no route-gallery image was added. The image audit records the deferred Little Missouri lead with no rights-clean selected route image.

## 2026-06-12 seed-and-implementation pass

- Rebuilt current inventory from route data before editing: North Dakota had 0 live route objects, 0 North Dakota trip-detail objects, and 0 structured North Dakota ledger rows.
- Added `sheyenne-river-fish-hatchery-chautauqua` as the first North Dakota route.
- The Sheyenne route cleared because USFS names direct USGS gauge `05058000` below Baldhill Dam for the Sheyenne River Water Trail, publishes official route-wide flow bands, and Valley City Tourism identifies the National Fish Hatchery-to-Chautauqua Park segment with accessible launches and about 1-2 hours of paddle time.
- Product-live check succeeded locally: USGS Water Services IV returned `05058000` values of 511 cfs and 25.24 ft at 2026-06-12 09:00 CDT.
- Endpoint coordinates were recorded as practical access anchors: Valley City National Fish Hatchery `46.9662, -98.0302` from Recreation.gov/Outdooractive and Chautauqua Park `46.939, -97.992` from a National Scenic Byways / Commons record. Current signs and launch placement should control on arrival.
- No gallery image was added. A rights-clean Commons Sheyenne River Valley City image was found, but the local download returned Wikimedia HTTP 429. The image audit records the candidate and blocker.
- Seeded deferred North Dakota rows:
  - `nd-missouri-river-washburn-sanger-landing` remains `threshold_weak`: ND Parks/Cross Ranch confirms the nine-mile Washburn-to-Sanger Missouri River run, but no route-specific numeric private-paddlecraft range tied to a selected product-supported big-river gauge surfaced.
  - `nd-little-missouri-medora-long-x-bridge` remains `research_later`: direct USGS Medora gauge lead exists, but no selected short public day route with endpoint coordinates, numeric thresholds, and remote Badlands hazard model cleared.
  - `nd-souris-river-upper-souris-nwr-canoe-trails` remains `threshold_weak`: USFWS supports Upper Souris NWR canoe trails and season/length context, but no selected live gauge and numeric route-specific water-level range surfaced.

Next North Dakota pass should not rework Sheyenne unless auditing the new route. Focus only on deferred seed blockers if a source publishes gauge-tied numeric range guidance or if a reliable image download path clears for the Sheyenne gallery.

## 2026-06-12 blocker-refresh pass

- Rebuilt current inventory from route data: North Dakota now has 1 live route object and 1 North Dakota trip-detail object, both for `sheyenne-river-fish-hatchery-chautauqua`.
- No additional route was added. The implemented Sheyenne route remains the only North Dakota route in this pass.
- Refreshed `nd-missouri-river-washburn-sanger-landing`: ND Parks/Cross Ranch still confirms the nine-mile Washburn-to-Sanger run, and USGS `06341000` at Washburn returned current stage-only data, but no manager-supported numeric private-paddlecraft range tied to the gauge surfaced. It remains `threshold_weak`.
- Refreshed `nd-little-missouri-medora-long-x-bridge`: NPS confirms the 107.5-mile Medora-to-Long X Bridge Little Missouri float and USGS `06336000` at Medora returned current discharge/stage, but this remains a broad multi-day remote route without a selected short day reach, endpoint-coordinate package, or numeric official thresholds. It remains `research_later`.
- Refreshed `nd-souris-river-upper-souris-nwr-canoe-trails`: USFWS supports the Upper Souris NWR canoe trails and seasonal access, but no official live-gauge-to-threshold model surfaced. It remains `threshold_weak`.
- Seeded `nd-souris-river-j-clark-salyer-canoe-trail` as `threshold_weak`: USFWS confirms the Johnson Bridge, Thompson Well, and Dam 1 Souris River Canoe Trail options, but no numeric water-level bands tied to a selected live gauge surfaced.

## 2026-08-14 Red River / Wild Rice gauge batch 22:35

- Read required route-worker operations files and preserved North Dakota as the active Upper Midwest frontier; did not claim independent-verifier overlap work.
- No route was added. Screened five first-queue North Dakota gauges: `usgs:05051500`, `usgs:0505152130`, `usgs:05051522`, `usgs:05051600`, and `usgs:05052000`.
- Red River Wahpeton / `05051500` is route-capable but blocked: same-run USGS was product-live at 241 cfs / 3.85 ft, and the official Kidder-to-Brushvale scored route already exists with direct MN DNR 318 bands, but provider:siteId coverage identity does not count that cross-provider route as covering the USGS key. No accepted USGS 05051500 threshold package justifies a duplicate or gauge swap.
- Red River Enloe / `0505152130` and Hickson / `05051522` are route-capable but blocked: same-run USGS values were 261 cfs / 14.19 ft and 277 cfs / 10.15 ft, but no Enloe- or Hickson-specific public endpoint pair, station threshold model, camping terms, safety package, image decision, coordinates, or geometry cleared.
- Wild Rice River Rutland / `05051600` and Mantador / `05052000` were screened_out/not_paddle_relevant for this product model: same-run values were 0.00 cfs / 1.15 ft and 3.36 cfs / 46.87 ft, NDGF lists Wild Rice River as a fishing water with no ramp, and no official/public Wild Rice paddling corridor or endpoint package surfaced.
- No gallery, camping, safety, coordinate, geometry, route data, trip detail, route order, or image-audit artifacts were changed. Next North Dakota rotation should start with `usgs:05052500`, `usgs:05053000`, `usgs:05053500`, `usgs:05054000`, and `usgs:05054500` unless the task board is repaired first.

## 2026-08-14 Antelope / Wild Rice / Fargo / Harvey gauge batch 22:58

- Read required route-worker operations files and preserved North Dakota as the active Upper Midwest frontier; `operations:plan -- --record` surfaced independent-verifier overlap work, so this run stayed scoped to `nd-gauge-review-batch`.
- No route was added. Screened five next-queue North Dakota gauges: `usgs:05052500`, `usgs:05053000`, `usgs:05053500`, `usgs:05054000`, and `usgs:05054500`.
- Antelope Creek at Dwight / `05052500` was screened_out/not_paddle_relevant: same-run USGS was product-live at 0.00 cfs / 21.43 ft, and no official/public Antelope Creek point-to-point paddling route, endpoints, thresholds, camping, safety, image, coordinate, or geometry package surfaced.
- Wild Rice River Abercrombie / `05053000` and St. Benedict / `05053500` were screened_out/not_paddle_relevant under the current official-source route model: same-run values were 3.01 cfs / 9.85 ft and 3.95 cfs / 23.82 ft, and reviewed North Dakota paddling/access sources did not identify a supported Wild Rice paddling corridor or route package.
- Red River Fargo / `05054000` is route-capable but blocked: same-run USGS was product-live at 294 cfs / 14.05 ft, and existing Fargo-Moorhead scored routes already cover the same corridor with MN DNR site 184 official interpreted bands. Provider identity remains `provider:siteId`, so the USGS key is not covered; no accepted USGS 05054000 thresholds justify a duplicate route or gauge migration.
- Sheyenne River above Harvey / `05054500` is stale_or_unsupported/route_capable: same-run USGS discharge returned `-999999` with the backwater qualifier while stage was 5.32 ft. Harvey sources confirm local Sheyenne Recreation Area boating facilities, but no point-to-point route with usable gauge thresholds, public endpoints, camping, safety, image, coordinates, or geometry cleared.
- No gallery, camping, safety, coordinate, geometry, route data, trip detail, route order, or image-audit artifacts were changed. Next North Dakota rotation should start with `usgs:05056000`, `usgs:05056239`, and the following unreviewed provider-baseline gauges unless the task board is repaired first.

## 2026-08-14 Sheyenne outlet / Mauvais Coulee gauge batch 23:24

- Read required route-worker operations files and preserved North Dakota as the active Upper Midwest frontier; did not claim independent-verifier overlap work.
- No route was added. Screened five next-queue North Dakota gauges: `usgs:05055300`, `usgs:05055400`, `usgs:05056000`, `usgs:05056060`, and `usgs:05056100`.
- Sheyenne River above/below the Devils Lake State Outlet and near Warwick were blocked/route_capable: same-run USGS values were 6.01 cfs / 10.89 ft, 180 cfs / 19.60 ft, and 190 cfs / 3.65 ft, but official Sheyenne paddling sources support the Lake Ashtabula-to-Sheyenne National Grassland water trail and Fort Ransom/Valley City contexts rather than a station-specific upper outlet/Warwick route package. No selected public endpoint pair, gauge-specific thresholds, camping/no-camping terms, safety package, image decision, coordinates, or geometry cleared.
- Mauvais Coulee Tributary No. 3 and Mauvais Coulee near Cando were screened_out/not_paddle_relevant: same-run values were 0.41 cfs / 2.17 ft and 2.42 cfs / 35.43 ft, and no official/public paddling corridor or endpoint package surfaced for these Cando coulee/flood-monitoring streams.
- No gallery, camping, safety, coordinate, geometry, route data, trip detail, route order, or image-audit artifacts were changed. Next North Dakota rotation should start with `usgs:05056200`, `usgs:05056215`, `usgs:05056239`, `usgs:05056265`, and `usgs:05056340` unless the task board is repaired first. Validation passed via gatekeeper-20260815042851.

## 2026-08-14 Devils Lake basin coulee gauge batch 23:53

- Read required route-worker operations files and preserved North Dakota as the active Upper Midwest frontier; did not claim independent-verifier overlap work.
- No route was added. Screened five next-queue North Dakota gauges: `usgs:05056200`, `usgs:05056215`, `usgs:05056239`, `usgs:05056265`, and `usgs:05056340`.
- Edmore Coulee near Edmore, Edmore Coulee Tributary near Webster, Starkweather Coulee near Webster, Big Coulee at Highway 2 near Churchs Ferry, and Little Coulee near Leeds were all screened_out/not_paddle_relevant. Same-run USGS values were 15.2 cfs / 80.52 ft, 48.5 cfs / 68.36 ft, 9.33 cfs / 2.30 ft, stage-only 50.37 ft, and 17.4 cfs / 63.92 ft, respectively, but official North Dakota paddling/access sources did not identify public point-to-point route packages for these Devils Lake basin coulee/flood-monitoring streams.
- No gallery, camping, safety, coordinate, geometry, route data, trip detail, route order, or image-audit artifacts were changed. No legal camping or access was inferred from banks, road crossings, coulee channels, lakes, public land proximity, or telemetry alone.
- Next North Dakota rotation should start with `usgs:05056678`, `usgs:05056770`, `usgs:05057000`, `usgs:05057200`, and `usgs:05058500` unless the task board is repaired first.

## 2026-08-15 Sheyenne / Tolna / Baldhill gauge batch 00:24

- Read required route-worker operations files and preserved North Dakota as the active Upper Midwest frontier; no independent-verifier overlap work was claimed.
- No route was added. Screened five next-queue North Dakota gauges: `usgs:05056678`, `usgs:05056770`, `usgs:05057000`, `usgs:05057200`, and `usgs:05058500`.
- Tolna Coulee near Tolna and Baldhill Creek near Dazey were screened_out/not_paddle_relevant. Same-run USGS values were 69.2 cfs / 16.93 ft and 2.21 cfs / 6.05 ft, respectively, but official North Dakota paddling/access sources did not identify public point-to-point route packages for either creek/coulee gauge.
- Sheyenne River at County Road 20 near Kloten and Sheyenne River near Cooperstown were blocked/route_capable. Same-run USGS values were 219 cfs / 32.05 ft and 216 cfs / 10.55 ft, respectively, and broader Sheyenne River Water Trail evidence exists, but no station-specific endpoint pair, threshold model, camping/access terms, safety package, image decision, coordinates, or geometry cleared for either reach.
- Sheyenne River at Valley City was blocked/route_capable. Same-run USGS was 169 cfs / 3.05 ft, and the known Bjornson Golf Course-to-Riparian Restoration lead remains promising, but it still lacks a manager-published numeric primitive-launch coordinate for the Bjornson L-240 put-in; do not infer the launch from golf-course, kiosk, concept-plan, road, or river-line anchors.
- No gallery, camping, safety, coordinate, geometry, route data, trip detail, route order, or image-audit artifacts were changed. No legal camping or access was inferred from banks, road crossings, lake/creek proximity, public-land proximity, or telemetry alone.
- Next North Dakota rotation should start with `usgs:05058650`, `usgs:05058700`, `usgs:05058980`, `usgs:05059000`, and `usgs:05059300` unless the task board is repaired first.

## 2026-08-15 Fort Ransom / Lisbon / Kindred / Horace Sheyenne gauge batch 00:54

- Read required route-worker operations files and preserved North Dakota as the active Upper Midwest frontier; no independent-verifier overlap work was claimed.
- No route was added. Screened five next-queue North Dakota gauges: `usgs:05058650`, `usgs:05058700`, `usgs:05058980`, `usgs:05059000`, and `usgs:05059300`.
- Fort Ransom State Park / `05058650` was blocked/route_capable. Same-run USGS was 159 cfs / 17.42 ft, and official Sheyenne/Fort Ransom sources identify the state-park-to-Sportsman-Landing segment, but Sportsman Landing is a dock above a dam and exact endpoint coordinates plus dam-adjacent access/safety handling remain unresolved.
- Lisbon / `05058700` and Kindred / `05059000` were blocked/route_capable. Same-run values were 184 cfs / 3.15 ft and 177 cfs / 3.27 ft, respectively, but existing route-quality evidence uses the broader Baldhill Dam/Sheyenne Water Trail package and no station-specific endpoint, threshold, camping/access, safety, image, coordinate, or geometry package cleared for these provider keys.
- GOL Road near Kindred / `05058980` was stale_or_unsupported/route_capable because the product inventory and same-run Water Services exposed stage only (35.09 ft) with no discharge or station-specific stage threshold package.
- Horace / `05059300` was blocked/route_capable. Same-run USGS was 180 cfs / 13.33 ft, but West Fargo documents the Horace/West Fargo Sheyenne Diversion as flood-control infrastructure with channels, levees, diversion structures, pumping stations, and 4,600 cfs design discharge; no public paddling route package cleared around that infrastructure.
- No gallery, camping, safety, coordinate, geometry, route data, trip detail, route order, or image-audit artifacts were changed. No legal camping or access was inferred from banks, road crossings, flood-control corridors, public-land proximity, or telemetry alone.
- Next North Dakota rotation should start with `usgs:05059480`, `usgs:05059500`, `usgs:05059600`, `usgs:05059700`, and `usgs:05060000` unless the task board is repaired first.

## 2026-08-20 Harwood / Mapleton / Amenia / Goose gauge batch

- No route added. Screened `usgs:05060100` Maple River below Mapleton, `usgs:05060400` Sheyenne River at Harwood, `usgs:05060500` Rush River at Amenia, `usgs:05065500` Goose River near Portland, and `usgs:05066500` Goose River at Hillsboro.
- Maple below Mapleton, Rush at Amenia, and the Goose River Portland/Hillsboro family are `screened_out/not_paddle_relevant` because current official North Dakota paddling/access sources did not surface public point-to-point route packages; same-run values were 2.76 cfs / 7.95 ft, 0.00 cfs / 10.54 ft, 0.00 cfs / 9.15 ft, and 2.92 cfs / 1.64 ft respectively.
- Sheyenne at Harwood is `blocked/route_capable`: USGS returned 182 cfs / 67.60 ft and broader Sheyenne paddling relevance is established, but no station-specific public endpoint pair, 05060400-tied threshold model, lower-reach diversion/access/safety package, camping terms, coordinates, image, or geometry cleared.
- No route, trip detail, image, camping, safety, coordinate, geometry, or route-order artifacts changed. Validation passed via `gatekeeper-20260820112521`; the coordinate audit retained only the existing 38-failure corpus backlog. Next rotation: `usgs:05070000`, `usgs:05082500`, `usgs:05082625`, `usgs:05084000`, and `usgs:05085000`.

## 2026-08-20 Red River / Turtle River / Forest River gauge batch 06:49

- No route added. Screened `usgs:05070000` Red River near Thompson, `usgs:05082500` Red River at Grand Forks, `usgs:05082625` Turtle River at Turtle River State Park, `usgs:05084000` Forest River near Fordville, and `usgs:05085000` Forest River at Minto.
- Thompson and Grand Forks Red River gauges were recorded `blocked/route_capable/direct`: official Red River paddling relevance and Grand Forks public access exist, but no station-specific endpoint pair, gauge-tied numeric threshold model, camping terms, safety package, rights-clean image decision, defensible coordinates, or canonical geometry cleared for a new scored route. Same-run USGS values were 383 cfs / 15.82 ft at 05070000 and 838 cfs / 15.41 ft at 05082500.
- Turtle River State Park was `screened_out/not_paddle_relevant/direct`: the official park page documents trails, river crossings, a CCC dam, and camping, but no public point-to-point paddling corridor or named launch/take-out package. Same-run USGS was 5.22 cfs / 0.90 ft.
- Fordville and Minto Forest River gauges were `screened_out/not_paddle_relevant/direct` as one unsupported river family: official sources show wildlife, fishing, nature-trail, and recreational-trail contexts but no public point-to-point paddling route package. Same-run USGS was 37.0 cfs / 1.56 ft at Fordville and 37.0 cfs / 1.47 ft at Minto. Fishing, wildlife, trail, bank, or public-land context was not treated as water-entry permission.
- No route data, trip details, gallery row, image audit row, camping package, safety package, endpoint coordinates, canonical geometry, coordinate correction, or route order changed. Next ND rotation is `usgs:05089995`, `usgs:05090000`, `usgs:05092000`, `usgs:05099400`, and `usgs:05100000`.

## 2026-08-20 Park / Red / Pembina gauge batch 07:48

- No route added. Screened the next five ND provider-baseline gauges: `usgs:05089995`, `usgs:05090000`, `usgs:05092000`, `usgs:05099400`, and `usgs:05100000`.
- Park River diversion `05089995` was `screened_out/not_paddle_relevant` because current telemetry was 0.00 cfs / 23.99 ft and official sources describe flood-control diversion infrastructure rather than a natural public paddling corridor.
- Park River Grafton `05090000` was `blocked/route_capable` because Grafton documents canoe/kayak rentals but no station-specific public point-to-point route, threshold, safety, camping, coordinate, image, or geometry package.
- Red River Drayton `05092000` was `blocked/route_capable`: current USGS was 893 cfs / 11.56 ft and City/DNR sources provide Hastings Landing, Schumacher Park, camping, dam-portage, and Drayton stage context, but the nearest upstream named access is Oslo about 65 river miles away and no practical day-route endpoint pair cleared. Existing Minnesota Drayton-proxy coverage does not count as direct USGS coverage.
- Little South Pembina `05099400` was `blocked/route_capable`: current USGS was 1.87 cfs / 0.78 ft, below the 100 cfs AW low-runnable floor; AW bridge coordinates and route family remain insufficiently manager-backed and threshold-strong.
- Pembina at Neche `05100000` was `blocked/route_capable`: current USGS was 300 cfs / 3.62 ft, but only the upstream Walhalla/Pembina Gorge route family is documented and directly covered by `05099600`; no Neche endpoint, threshold, camping, safety, image, coordinate, or geometry package cleared.
- No legal camping or access was inferred from parks, flood-control land, bridges, road rights-of-way, banks, wildlife/fishing context, or gauge telemetry. No route data, trip details, gallery row, image-audit row, camping package, safety package, endpoint coordinates, canonical geometry, coordinate correction, or route order changed.
- Validation passed via `gatekeeper-20260820125454`: gauge coverage check 4299/4299; route audit 785 routes; geometry audit 951/952 matched with one pre-existing unmatched route; gallery audit 325 images; safety audit 0 issues; overlap audit completed; coordinate audit retained the pre-existing 38-failure corpus backlog; operations gates, typecheck, mobile typecheck, and production build passed; `git diff --check` emitted only existing LF-to-CRLF warnings.
- Current run time: 2026-08-20 07:59 America/Chicago. Next ND rotation is `usgs:06347000`, `usgs:06349500`, `usgs:06470800`, `usgs:06332515`, and `usgs:06354580`; do not retry these five unless a public manager publishes fresh route, threshold, access, camping, safety, image, coordinate, or geometry evidence that clears the recorded blocker.

## 2026-08-20 Hay Creek / Missouri Schmidt / Cannonball / Cedar gauge batch

- No route added. Screened `usgs:06349600` Hay Creek at Main Avenue in Bismarck, `usgs:06349700` Missouri River near Schmidt, `usgs:06350000` Cannonball River at Regent, `usgs:06351200` Cannonball River near Raleigh, and `usgs:06352000` Cedar Creek near Haynes.
- Hay Creek, both Cannonball River gauges, and Cedar Creek were recorded `screened_out/not_paddle_relevant`: official North Dakota paddling/access sources did not identify public point-to-point corridors or named endpoint packages. Bismarck ramp evidence is for the Missouri River and McDowell Dam, while ND Game and Fish identifies Cannonball River as a fishing water with no ramp; fishing, watershed, bank, road, and park context was not treated as water-entry permission.
- Missouri near Schmidt was recorded `stale_or_unsupported/route_capable`: USGS returned stage-only telemetry of 13.24 ft at 2026-08-20 09:15 CDT, with no product-supported discharge metric or accepted stage threshold. Broad Missouri recreation evidence does not establish a Schmidt-specific route package.
- Fresh USGS Water Services readings at 2026-08-20 09:00-09:15 CDT were 0.83 cfs / 5.22 ft, stage-only 13.24 ft, 6.20 cfs / 4.86 ft, 1.34 cfs / 1.67 ft, and 1.01 cfs / 3.99 ft, respectively. No camping or access was inferred from Missouri recreation, Bismarck ramps, fishing-water listings, watershed sources, public land, banks, or telemetry.
- Updated the gauge-review ledger, route-candidate ledger, tasks, runs, and this memory. No route data, trip details, gallery/image-audit row, camping package, safety package, endpoint coordinates, canonical geometry, coordinate correction, or route order changed. Next ND rotation: `usgs:06353000`, `usgs:06354000`, `usgs:06354050`, `usgs:06354480`, and `usgs:06354490`.
- Run `route-worker-202608200948-nd-hay-cannonball-cedar-no-add` closed with passed `gatekeeper-20260820145327`: JSON parse, gauge coverage 4299/4299, route/safety/geometry/gallery/overlap/coordinate audits, route/full/mobile typechecks, production build, operations gates, `operations:verify`, and scoped `git diff --check` passed. Coordinate audit retained only the existing repository findings; current run summary time: 2026-08-20 09:53 America/Chicago.

## 2026-08-20 Cedar / Cannonball / Beaver gauge batch 10:17

- No route added. Screened the next five ND provider-baseline gauges: `usgs:06353000`, `usgs:06354000`, `usgs:06354050`, `usgs:06354480`, and `usgs:06354490`.
- Cedar Creek near Raleigh `06353000` and South Branch Beaver Creek near Zeeland `06354480` were recorded `screened_out/not_paddle_relevant`: fresh USGS values were 0.33 cfs / -0.06 ft and 0.12 cfs / 15.95 ft, and official North Dakota paddling/access and watershed sources did not identify public point-to-point route packages.
- Cannonball River at Breien `06354000` and at Solen `06354050` were recorded `blocked/route_capable`: fresh values were 9.49 cfs / 1.74 ft and 16.9 cfs / 34.05 ft. North Dakota lists the Cannonball as navigable, but no station-specific public endpoints, thresholds, camping/access, safety, image, coordinate, or geometry package cleared.
- Beaver Creek near Strasburg `06354490` was recorded `stale_or_unsupported/route_capable`: current USGS returned stage-only 10.22 ft, and the official Beaver Creek hydrology report confirms the station provides only stage data; no public route package cleared.
- No camping or access was inferred from navigability, watershed, fishing, park, reservoir, public-land, bridge, or telemetry context. No route data, trip details, image-audit row, camping package, safety package, endpoint coordinates, canonical geometry, coordinate correction, or route order changed. Final validation passed via `gatekeeper-20260820152641`; the coordinate audit retained only the existing repository corpus. Next rotation: `usgs:05101000`, `usgs:05102490`, `usgs:05113600`, `usgs:05114000`, and `usgs:05116000`.

## 2026-08-20 Des Lacs / Souris / Bonnes Coulee gauge batch 11:18

- No route added. Screened `usgs:05116150` Des Lacs near Kenmare, `usgs:05116500` Des Lacs at Foxholm, `usgs:05117500` Souris above Minot, `usgs:05117600` Souris at Broadway Bridge, and `usgs:05119410` Bonnes Coulee near Velva.
- Kenmare and Bonnes Coulee were recorded `screened_out/not_paddle_relevant`: fresh USGS values were 0.11 cfs / 0.91 ft and 0.03 cfs / 7.94 ft, and official sources did not identify supported public point-to-point paddling corridors or named endpoint packages. Kenmare's Boat Dock evidence is daylight-only lake day use, not a river route.
- Foxholm was recorded `stale_or_unsupported/route_capable`: current USGS returned stage-only 2.48 ft with no valid discharge. Upper Souris refuge canoe trails establish broad basin relevance but no station-specific route package.
- Souris above Minot was recorded `blocked/route_capable`: USGS was live at 2.41 cfs / 3.79 ft, but no above-Minot endpoint pair, station-tied threshold, camping, safety, coordinates, image, or geometry package cleared. Broadway Bridge was `stale_or_unsupported/route_capable`: seasonal stage-only support at 40.91 ft with no accepted stage threshold or complete route package.
- No camping or access was inferred from refuge, lake, city, bridge, public-land, boating, or telemetry context. No route data, trip details, image-audit row, camping/safety package, endpoint coordinates, canonical geometry, coordinate correction, or route order changed. Next ND rotation should continue after this batch with the next unreviewed provider-baseline gauges.

## 2026-08-20 Tongue / Red / Long Creek / Souris gauge batch 10:49

- No route added. Screened the next five ND provider-baseline gauges: `usgs:05101000`, `usgs:05102490`, `usgs:05113600`, `usgs:05114000`, and `usgs:05116000`.
- Tongue River at Akra `05101000` and Long Creek near Noonan `05113600` were recorded `screened_out/not_paddle_relevant`: fresh USGS values were 1.60 cfs / 6.62 ft and 16.4 cfs / 3.22 ft, and official/public North Dakota sources did not identify supported point-to-point paddling corridors or named endpoint packages.
- Red River at Pembina `05102490` was recorded `stale_or_unsupported/route_capable`: current USGS support is stage-only at 10.80 ft with no discharge metric. The Minnesota DNR Red River water trail supplies broad access, camping limits, and safety context, but no accepted stage-only threshold or station-specific route package cleared.
- Souris River near Sherwood `05114000` and near Foxholm `05116000` were recorded `blocked/route_capable`: fresh values were 155 cfs / 4.10 ft and 0.00 cfs / 4.57 ft. U.S. Fish and Wildlife and regional sources establish broad Souris/Mouse River canoe-trail relevance, but no station-specific endpoints, numeric threshold, access/camping/safety, coordinates, image, or geometry package cleared. The Foxholm zero-flow observation was not treated as a threshold.
- No camping or access was inferred from telemetry, refuge/park context, fishing/boat docks, broad water trails, or public-land proximity. No route data, trip details, image-audit rows, endpoint coordinates, camping package, safety package, canonical geometry, coordinate correction, or route order changed. Next rotation is `usgs:05116150`, `usgs:05116500`, `usgs:05117500`, `usgs:05117600`, and `usgs:05119410`.
