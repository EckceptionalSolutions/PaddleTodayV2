# Indiana Route Additions Automation Memory

Use this file to bootstrap Indiana route expansion with access-law and dam hazards kept explicit.

## Setup Notes

- Created 2026-05-30 as one of five next state automations.
- Start every run by reading this file, `src/data/rivers.ts`, `src/data/river-trip-details.ts`, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and `docs/river-image-source-audit.csv`.
- Existing PaddleTodayV2 coverage has no Indiana routes as of creation. Reconcile inventory before adding any candidate.

## State Quirks

- Indiana DNR describes water trails as streams with at least two public access points.
- Indiana DNR river-rights guidance says navigable rivers and beds are held in trust by the state and can be used by the public, with the ordinary high-water mark as the practical boundary.
- Non-navigable or privately bordered routes need stronger endpoint/access proof; do not assume bridge launches are legal or normal.
- Indiana DNR maintains low-head-dam safety resources and maps public access sites, low-head dams, stream miles, public lands, and bridges. Check dam context before shipping any route.
- Indiana law can prohibit boating/wading/access within 50 feet of signed low-head dams. Treat signed dams, portages, and dam-adjacent take-outs as route blockers unless the safe route is clear.

## Source Stack

- Live gauge: USGS Water Services.
- Access/route authority: Indiana DNR water trails, DNR Where-to-Fish/public-access map, county/city park pages, official blueway/water-trail managers, NPS/USFS where relevant.
- Threshold support: AW exact reaches, official manager guidance, strong route-specific local/outfitter guidance only when tied to the selected gauge.

## Early Targets

- Gauge-first review of Blue River, Tippecanoe River, White River, Wildcat Creek, Sugar Creek, Driftwood/Flatrock/Big Blue, Eel River, and East Fork Whitewater River.
- Prefer official water trails and established public-access pairs over informal bridge-to-bridge floats.
- Mark candidates `threshold_weak` when access is good but numeric gauge support is generic.
- Mark candidates `research_later` or `rejected` where low-head dams, private access, or endpoint ambiguity cannot be resolved.

## Run Log

- 2026-05-30 21:09 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Rechecked `Cedar Creek - Tonkel Road to State Road 1 / Leo-Cedarville` as the strongest fresh route-shape lead. Northeast Indiana Water Trails publishes exact endpoint coordinates, just-over-5-mile distance, about 3-hour paddle time, seasonal qualitative level notes, fallen-tree/portage warnings, and small rapids before the exit. ACRES repeats the route and says it ends at the DNR access site on State Road 1, and Indiana DNR confirms Cedar Creek is a designated scenic/recreational river-system stream.
  - No route was added because the level guidance remains qualitative only: NEIWT's water-level page recommends checking USGS and learning local effects, but publishes no numeric threshold bands or minimum-only floor tied to a selected gauge. USGS Water Services IV requests from the automation shell still failed unable to connect for NE Indiana / recurring Indiana gauges.
  - Kept public-access legitimacy at the Tonkel Road carry-down, OHWM/private-bank limits, current logjam status, and low-head-dam map context as explicit blockers before implementation.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex automation memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.

- 2026-05-30 20:39 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - USGS Water Services IV fetches from the automation shell still failed unable to connect for recurring Indiana gauges `03339500`, `03303000`, `03334000`, and `03335000`.
  - Fresh reviewed `East Fork Whitewater River - Hayes Arboretum Road to Test Road / Whitewater Gorge`. American Whitewater documents the exact 5.8-6 mile I(IV) reach, direct Abington gauge `03275600`, current-looking flow, and multiple likely riverwide low-head dam/weir hazards. City of Richmond / Whitewater Gorge sources confirm the public park corridor and a new Test Road trailhead / kayak-launch lead.
  - No route was added because the upstream Hayes Arboretum Road put-in was not confirmed as a manager-grade public launch, the route has dense dam/weir hazards requiring source-clean portage and low-head-dam review, product-fetchable USGS data was not verified from this runtime, and this is a whitewater/dam-risky route rather than a conservative first Indiana add.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex automation memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.

- 2026-05-30 20:09 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Rechecked `Blue River - White Cloud to Blue River Chapel`; AW's Indiana index still showed the exact 2.4-mile I(II) route at 430 cfs updated within the hour, and official USGS legacy current conditions for `03303000` now showed recent May 29, 2026 discharge/stage values.
  - No route was added because the Water Services endpoint still did not open cleanly in this run, PaddleTodayV2 has no AW live-gauge provider, and the public White Cloud put-in plus old-mill / low-head-dam context still need manager-grade confirmation.
  - Fresh reviewed `Big Blue River - Knightstown family`; Knightstown tourism promotes two Big Blue kayaking route options, Paddling.com labels the Knightstown launch as an Indiana DNR public access site, and official USGS `03361500` at Shelbyville showed recent May 29, 2026 values. Kept it `threshold_weak` because no official/manager route sheet, exact public endpoint pair, route-specific numeric threshold model, or low-head-dam/obstruction review cleared the V2 bar.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex automation memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.

- 2026-05-30 19:39 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Rechecked `Blue River - White Cloud to Blue River Chapel` because it remains the strongest short Indiana AW lead. AW's Indiana index showed the exact 2.4-mile I(II) reach at 430 cfs updated within the hour, and AW's gauge page identifies `USGS 03303000` as the direct White Cloud gauge.
  - No route was added because AW's gauge-detail page still opened with stale 7-month-old readings, official/search-visible USGS legacy evidence still says current discharge ended in April 2026, shell Water Services fetches for `03303000` still fail unable to connect, and PaddleTodayV2 has no AW live-gauge provider.
  - IndianaOutfitters / legacy DNR-derived access text supports Blue River Chapel as a DNR access below SR 462 and notes an old breached mill dam near White Cloud, but the guide text is old; the public White Cloud put-in, endpoint coordinates, navigability/OHWM assumptions, and low-head-dam / old-mill obstruction context still need manager-grade confirmation before implementation.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex automation memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.

- 2026-05-30 19:09 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `Christiana Creek - Willowdale Park to Beardsley Park` in Elkhart. Local/official context is useful: the Elkhart Waterways Guide search result names Trip #1 on Christiana Creek from Willowdale Park toward W Beardsley Ave, Elkhart County SWCD confirms the creek runs over 10 miles through public/recreational sites including Willowdale Park, the City of Elkhart confirms Willowdale Park is a public city park with Christiana Creek fishing access, and AW's Indiana index names a 1.8-mile I-II Willowdale-to-Beardsley reach.
  - No route was added because the obvious USGS Christiana Creek at Elkhart gauge appears discontinued, AW index/detail did not expose usable current flow or numeric bands, and city/local route sources do not provide gauge-calibrated paddling thresholds. The urban corridor also needs water-quality, private-bank/OHWM, bridge/strainer, and dam/portage review before any implementation.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex automation memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 18:39 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `Eel River - South Whitley / Laketon / Stockdale / Denver / Logansport family`; IndianaOutfitters preserves old Indiana DNR Canoe Guide text with multiple northern Eel day trips, access descriptions, and dam notes.
  - No route was added because the source warns the access text is at least 16 years old, several endpoints are legacy bridge/corner-style directions rather than modern manager-confirmed public launches, Collamer/Liberty Mills/Stockdale/Chili/Mexico dam context needs route-specific low-head-dam review, shell USGS Water Services fetches for `03328000` and `03328500` failed, third-party gauge inventory was stale by 8 days, and no numeric route-specific threshold model surfaced.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex automation memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 18:09 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `White Lick Creek - E.CR200N to E.Hendricks CR / Brownsburg-Avon family`; American Whitewater's Indiana index showed a current-looking I-II White Lick Creek item, and Avon/Brownsburg pages confirm a public greenway corridor along the creek.
  - No route was added because the AW reach detail opened behind the JavaScript app, no official/manager public paddling endpoint pair surfaced, third-party launch evidence is not enough for Indiana access legitimacy, and no defensible numeric threshold model tied to a product-fetchable gauge was captured.
  - Rechecked the recurring USGS gate for `03276500`, `03339500`, `03303000`, and `03334000`; shell Water Services calls still failed unable to connect, and opened WDFN pages exposed maintenance/monitoring-location context rather than same-day values.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex automation memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 17:39 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `Whitewater River - Metamora / Brookville / Green Acres family`; American Whitewater documents the broad Class I Metamora-to-Elizabethtown reach with a Brookville gauge tie and current-looking flow context, and local/livery pages confirm active Whitewater paddling plus USGS river-level links.
  - No route was added because USGS Water Services for `03276500` still cannot be reached from this runtime, search-visible official USGS legacy evidence was stale to 2026-05-21, and the useful shorter Willow/Riverfront/Green Acres notes are community/livery/trip-report level rather than a manager-grade public endpoint pair with numeric scoring guidance.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 17:10 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh refined `Sugar Creek - Deer's Mill Public Access to Cox Ford Public Access`; Indiana DNR confirms Sugar Creek water recreation, search-visible access evidence identifies Deer's Mill and Cox Ford as public access points, and official USGS legacy current conditions for `03339500` showed same-day 2026-05-30 discharge/stage.
  - No route was added because the numeric guidance is still not a clean V2 scoring model: the useful source trail mixes a cfs lower bound with a stage-based livery cutoff, and the same-day stage/cfs relationship does not support one defensible scoring metric.
  - Fresh reviewed `Flatrock River - St. Omer / Old 421 to Conns Creek / St. Paul family`; kept it deferred because the 250-750 cfs St. Paul guidance is useful but access depends on old bridge/roadside and viewer-supplied directions, private campground alternatives, and unresolved dam/barrier context.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 16:39 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `Pigeon River - Mongo / Pigeon River Fish and Wildlife Area / state-line family`; Indiana DNR / National Rivers Project / IndianaOutfitters context identifies the Pigeon as an Indiana water-trail / DNR canoe-guide corridor, and USGS `04099750` near Scott is the obvious same-river gauge lead.
  - No route was added because the official WDFN page opened with no continuous/daily/field graphable data, search-visible legacy USGS evidence only showed latest instantaneous values from 2026-05-25, no route-specific numeric paddling thresholds surfaced, and the access story leans partly on old DNR-canoe-guide / livery context rather than one modern public endpoint pair.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 16:10 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `West Fork White River - Potter's Bridge Park / Forest Park / Noblesville family`; Hamilton County and Noblesville official pages support public canoe/kayak launches at Potter's Bridge Park and the Forest Park White River Boat Ramp, White River Canoe Company documents a normal Potter's Bridge-to-River-Road livery/tubing route and current-condition posting, and IndianaOutfitters / Hoosier Canoe Club context ties a nearby Perkinsville-to-Noblesville trip to USGS `03349000` at 430 cfs.
  - No route was added because the automation shell still could not connect to USGS Water Services for `03349000`, search-visible legacy USGS evidence was stale to 2026-05-16 despite WDFN all-graphs suggesting last-7-day data, and the numeric threshold evidence is anecdotal/nearby rather than a route-specific manager/AW/public-water-trail threshold model for the public Noblesville reach. Low-head-dam/portage context around north Noblesville / Clare / Riverwood also needs a route-specific safety check.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 15:39 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `Big Pine Creek - Rainsville Bridge to Twin Bridges`; AW's Indiana index showed the exact II+(III) reach with a current-looking value updated within the hour, Indiana DNR natural/scenic-river material identifies the Rainsville-area Big Pine segment as Indiana's premier spring whitewater creek, and IndianaOutfitters/DNR-derived access material describes the route and Rocky Ford ledges.
  - No route was added because AW's opened gauge detail was stale/disabled, official/search-visible USGS `033356848` evidence showed current/historical observations ending in 2025 rather than product-ready current data, and the endpoint story rests on bridge/county-road access descriptions rather than a clean DNR public-access pair. Logged `in-big-pine-creek-rainsville-twin-bridges` as `no_live_gauge` with bridge-launch/access ambiguity.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 15:09 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `Deep River - below Lake George / Soccer and Rugby Field to Rock Riffle family`; NWIPA gives public access coordinates and route shape for the below-Lake-George corridor, but official USGS `04093000` visible current evidence ended 2026-01-01 and NWIPA only gives a one-time 93 cfs shore-scouting reference plus qualitative shallow/debris warnings. Logged `in-deep-river-lake-george-rock-riffle-family` as `no_live_gauge`.
  - Rechecked `Kankakee River National Water Trail family`; access/corridor context remains strong, but no selected reach with a route-specific numeric gauge model cleared.
  - Updated the structured ledger, Midwest memory, repo Indiana memory, and Codex memory. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only; no npm validation because no app data changed.
- 2026-05-30 13:39 America/Chicago: First Indiana no-add pass for automation `indiana-route-additions-2`.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`, and the structured ledger had no Indiana candidate records before this pass.
  - Reviewed `Blue River - White Cloud to Blue River Chapel`: AW has the exact 2.4-mile I(II) reach and USGS `03303000` gauge tie, and Indiana DNR water-trail/river-rights/low-head-dam context is useful. No add because shell USGS Water Services fetch failed, AW gauge detail was stale even though the AW Indiana index snippet looked current, and numeric thresholds found were forum/community level.
  - Reviewed `Sugar Creek - Shades / Turkey Run family`: DNR/state-park access and paddling context is strong, but threshold support surfaced as third-party/community `300-1500 cfs` style guidance and stale/mismatched AW Darlington context, not an implementation-ready route-specific model.
  - Reviewed `Kankakee River National Water Trail family`: DNR points to official Kankakee water-trail resources, but no short named public endpoint pair plus direct live gauge and numeric thresholds cleared the bar.
  - Ledger now tracks the three blockers as `in-blue-river-white-cloud-blue-river-chapel`, `in-sugar-creek-shades-turkey-run-family`, and `in-kankakee-national-water-trail-family`.
- 2026-05-30 14:17 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Rechecked `Blue River - White Cloud to Blue River Chapel`; AW's Indiana index showed 430 cfs updated within the hour, but official/search-visible USGS `03303000` evidence still reports discharge ending 2026-04-17, shell Water Services still cannot connect, and the app has no AW live-gauge adapter. Kept `no_live_gauge`.
  - Rechecked `Sugar Creek - Shades / Turkey Run family`; public/state-park context remains strong, but threshold evidence is still third-party/community `300-1500 cfs` style guidance and not a selected official/AW/manager route-specific package. Kept `threshold_weak`.
  - Fresh reviewed `Tippecanoe River State Park / Winamac family`; DNR supports canoe/kayak use and state-park launch context, but no exact public endpoint pair plus numeric gauge threshold surfaced. Logged `threshold_weak`.
  - Fresh reviewed `East Fork Whitewater River - Brookville Dam tailwater`; AW index/current context and 2-mile tailwater context exist, but the route is dam-adjacent and lacks safe public endpoint plus threshold documentation. Logged `research_later`.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.
- 2026-05-30 14:39 America/Chicago: No route added.
  - Reconciled live inventory first; no Indiana routes are implemented in `src/data/rivers.ts` / `src/data/river-trip-details.ts`.
  - Fresh reviewed `Wildcat Creek - Knop Lake to Mis-So-La / lower North Fork family`; DNR scenic-river context and Wildcat Creek Stream Guide access/route context are strong, but the Owasco `03334000` gauge evidence was stale and the recent downstream Lafayette `03335000` gauge lacked route-specific numeric thresholds. Logged `threshold_weak`.
  - Fresh reviewed `Cedar Creek - Tonkel Road to State Road 1 / Leo-Cedarville`; Northeast Indiana Water Trails provides coordinates, distance, scenic-river context, and low-head-dam/logjam warnings, but only qualitative seasonal level guidance and generic USGS-checking context surfaced. Logged `threshold_weak`.
  - No app route data changed. Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.

## Validation

- If app code changes, run `npm.cmd run typecheck`, `npm.cmd test` if viable, `npm.cmd run build` if available, and `git diff --check`.
- If only docs/ledger/memory changed, validate the ledger JSON and run `git diff --check`.
