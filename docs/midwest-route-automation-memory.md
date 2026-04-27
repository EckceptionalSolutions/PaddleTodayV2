# Midwest Route Automation Memory

Use this file to avoid retrying the same blocked routes unless new evidence directly fixes the prior blocker.

## Added

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
  - Set aside as `no_live_gauge`:
    - `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` — MN DNR explicitly recommends this 15.7-mile day trip and gives a usable qualitative floor (`some rapids will be too rocky to run if the gauge at the Highway 38 bridge in Bigfork is below four feet`), but the live level support surfaced on this pass is the MN DNR CSG site at Bigfork rather than a defensible live USGS gauge pairing, so it does not clear the product bar.
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
  - `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` remains correctly parked at `no_live_gauge` because the current live level story is DNR-only rather than a defensible USGS pairing.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Conservative no-add pass at 15:40 America/Chicago.
  - Re-read the live V2 inventory in `src/data/rivers.ts`, `src/data/river-trip-details.ts`, this memory file, and the normalized candidate ledger, then sanity-checked the current codebase for live-gauge support.
  - No fresh Minnesota-first evidence path surfaced after the 15:28 pass, so this run stayed bounded instead of re-litigating stale `research_later` or `rejected` holdovers.
  - The current implementation blocker remains unchanged: `Long Prairie River - Long Prairie to Browerville` and `Pomme de Terre River - Larson to Appleton` are still the best queued `likely_addable` routes in content terms, but the app still only ingests `provider: 'usgs'` gauges through `src/lib/usgs.ts` and route typing still expects `provider: 'usgs'`, so adding either DNR-CSG-dependent route now would still ship a dead gauge.
  - The clean preserve-for-later set also remains unchanged: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, and `Cottonwood River - Juenemann carry-in access to Springfield carry-in access` still look good enough to keep at `needs_manual_coordinates` rather than downgrading.
  - `Chippewa River - Lentz Access to Watson Lion's Park` and `Des Moines River - Mayflower Park to Christianna Bridge` were deliberately not re-reviewed because both remain correctly parked at `threshold_weak`, and `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access` remains correctly parked at `no_live_gauge`.
  - No code changes were made, so `npm test` and `npm run build` were not run on this pass.

- 2026-04-26: Fresh Minnesota-first gauge sweep at 16:58 America/Chicago.
  - Reviewed 2 fresh Otter Tail candidates from 2 fresh gauge-adjacent route clusters, plus 1 additional non-yield Zumbro follow-on cluster, instead of rehashing the stale bounded queue.
  - Set aside as `no_live_gauge`:
    - `Otter Tail River - Wannigan Road carry-in access to Riverside Park carry-in access` — MN DNR explicitly recommends this 8.4-mile upstream Otter Tail day trip and names both endpoints cleanly, but this pass still did not surface a defensible route-level live gauge pairing or numeric ladder. The official page says to check gauge levels before paddling, which is directionally useful but not strong enough for PaddleTodayV2.
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
  - No genuinely fresh Minnesota-first gauge-first evidence path surfaced beyond the queue already built earlier today, so this run stopped conservatively instead of pretending the same Zumbro, Otter Tail, Des Moines, Big Fork, or stale old-repo holdovers were new work.
  - The best near-term queue remains unchanged:
    - `likely_addable`: `Long Prairie River - Long Prairie to Browerville`, `Pomme de Terre River - Larson to Appleton`
    - `needs_manual_coordinates`: `Sauk River - Spring Hill County Park to St. Martin carry-in access`, `North Fork Crow River - City of Rockford trailer access to Riverside County Park`, `Cottonwood River - Juenemann carry-in access to Springfield carry-in access`
    - `threshold_weak`: `Chippewa River - Lentz Access to Watson Lion's Park`, `Des Moines River - Mayflower Park to Christianna Bridge`, `Zumbro River - Village Park to Theilman Access`
    - `no_live_gauge`: `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`, `Otter Tail River - Wannigan Road carry-in access to Riverside Park carry-in access`, `Otter Tail River - Phelps Mill County Park carry-in access to West Red River Lake trailer access`
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
    - `no_live_gauge`: `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`, `Otter Tail River - Wannigan Road carry-in access to Riverside Park carry-in access`, `Otter Tail River - Phelps Mill County Park carry-in access to West Red River Lake trailer access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, `Little Fork River - Veterans Park to Highway 73 bridge`
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
    - `Big Fork River - Highway 6 (S) carry-in access to Highway 6 (N) carry-in access`, `Otter Tail River - Wannigan Road carry-in access to Riverside Park carry-in access`, `Otter Tail River - Phelps Mill County Park carry-in access to West Red River Lake trailer access`, `Red Lake River - Smiley Bridge to Centennial Park`, `Pine River - Rock Dam to Harvey Drake access`, and `Little Fork River - Veterans Park to Highway 73 bridge` remain correctly parked at `no_live_gauge` because their current live-data path is still DNR-only rather than a separately validated fresh add path for this run.
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
