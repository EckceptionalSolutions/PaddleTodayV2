# Lower 48 starter route coverage plan

Prepared: 2026-09-09. Status: execution started with user approval. The campaign record and generated progress report distinguish checkout implementation from deployment. Florida and Oregon each have three locally validated planning routes; the campaign remains in its first pass. South Carolina now has one scored starter route, Indigo to Wicklow, locally validated with direct telemetry. None of these starter additions is recorded as deployed.

## Objective and baseline

Give paddlers in every lower 48 state a useful starting selection, then use engagement and route requests to direct deeper coverage. Target approximately 10 high-quality, distinct public routes in each of the 17 uncovered states, for roughly 170 additions if the evidence supports them. Ten is a target, not a publication quota.

Baseline verified with `npm.cmd run routes:report:universe` at repository commit `44fad0bf`:

- 31 states have public routes; the 17 states in the queue below have zero inventory routes and zero public routes.
- The checkout contains 2,166 inventory routes, 2,105 public routes, and 1,120 scored routes. These are repository counts, not a verified production deployment snapshot.
- The state registry lists only 28 states; Idaho, West Virginia, and Wyoming are already in the catalog but absent from that registry. Older state memory summaries also contain stale counts. Compute coverage from `publicRivers`, not registry membership or file existence.

This effort focuses on the 17 uncovered states. Existing states with fewer than ten routes remain a later expansion queue, except for necessary correctness fixes.

## Scored-first priority — revised 2026-09-09

Prioritize routes that can deliver a defensible live score. Screen for a supported direct gauge and published paddling thresholds tied to that gauge before investing in full route authoring. A qualified scored route outranks a planning-only candidate even when the latter is easier to research. Aim for scored coverage in every target state and a majority of scored routes in each completed starter set where evidence permits; report exceptions instead of manufacturing thresholds.

Keep the 3 / 6 / approximately 10 public-route rotation and batches of one to three. Start each state's batch with scored candidates. Planning-only routes are a fallback after a documented bounded scoring search and must add distinct practical value. They count toward public presence but never satisfy a scored-coverage milestone. Do not fill all three slots merely because planning cards are ready; rotate with a smaller qualified batch when needed.

The six existing Florida and Oregon planning routes remain honestly labeled. Queue them for promotion review using exact-gauge evidence; promotion does not create another route or consume a new-route slot. Their states currently have public checkout coverage but zero scored starter routes. Next implementation research continues in South Carolina, with promotion opportunities retained alongside the breadth rotation.

## Rollout: breadth before depth

1. **Prepare all 17 states.** Reconcile the coverage baseline with production, create a compact research shortlist and state memory for each, and register the campaign queue. Screen about 15–20 candidate reaches per state where the source material supports that many; do not build exhaustive statewide inventories.
2. **Pass A: first presence.** Research and implement up to three strong routes per state, ideally across at least two rivers. Rotate through all 17 before taking any state beyond three. This would yield about 51 additions if every state qualifies.
3. **Pass B: useful choice.** Bring each qualifying state to about six routes, filling geographic and trip-style gaps. Rotate through all states again. Cumulative target: about 102 additions.
4. **Pass C: complete the starter sets.** Bring each qualifying state to about ten routes. Stop below ten when the remaining evidence or route quality does not justify more. Cumulative target: approximately 170 additions, with documented exceptions.
5. **Observe and hand off.** Review state engagement after 30 and 60 days from each state's first release. Use requests, repeat use, and discovery gaps to choose the next expansion work.

Implement in batches of one to three routes and release batches through the normal repository workflow once validated. A blocked state gets a recorded exception and a revisit condition; it must not stall the rest of the pass. Schedule a bounded initial review for every state, including the harder ones, before undertaking deep work in any one state.

The order below is a proposed mix of documented source availability, potential audience, geographic variety, and early examination of difficult states. It is not a measured popularity ranking. Reorder within a pass when actual route requests or readiness provide stronger evidence; preserve the pass limits.

## State research queue

Every state starts at zero public routes and has milestones of approximately 3 / 6 / 10. The corridors below are **research leads**, not approved routes or promises of current access. The linked sources are starting points located during this planning pass; they do not verify every suggested corridor, endpoint, threshold, or closure. Exact access-to-access selections come from qualification.

| Order | State | Initial corridor shortlist | Source entry point | Main qualification question |
| --- | --- | --- | --- | --- |
| 1 | Florida | Suwannee; Santa Fe; Ichetucknee; Wekiva; Peace; Blackwater | [Florida DEP designated trails and guides](https://floridadep.gov/parks/ogt/content/floridas-designated-paddling-trails) | Which managed river trips have current access guidance and a defensible scoring or planning treatment? Check spring-run operating restrictions and flood conditions. |
| 2 | Oregon | Willamette; Tualatin; upper Deschutes flatwater; lower Clackamas; John Day | [Oregon State Parks Willamette water trail](https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=194) | Can public access pairs provide diverse day trips without crossing whitewater or dam boundaries? |
| 3 | South Carolina | Lynches; Little Pee Dee; Black; Edisto; Congaree; Catawba | [SCDNR river guide directory](https://www.dnr.sc.gov/water/river/pdf/GuidesandMapsforSCRivers.pdf) | Which guide segments have verified launches, manageable logistics, and current water-level evidence? |
| 4 | Massachusetts | Charles; Concord; Sudbury; Connecticut; Ipswich; selected Deerfield reaches | [Massachusetts canoeing and kayaking directory](https://www.mass.gov/canoeing-and-kayaking-in-massachusetts) | Which metropolitan and inland options avoid unresolved dams, tidal effects, and seasonal access limits? |
| 5 | Arizona | Lower Salt; Verde Valley; lower Verde; Arizona-access Colorado reaches | [USFS-hosted Verde River paddle trail guide](https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3818299.pdf) | How many distinct trips remain after checking releases, diversion hazards, access permissions, and overlap? Assess a possible shortfall early. |
| 6 | Alabama | Autauga Creek; Cahaba; Flint near Huntsville; Sipsey Fork; selected Coosa and Bartram trail reaches | [Outdoor Alabama canoe trails](https://www.outdooralabama.com/node/30), [Autauga Creek](https://www.outdooralabama.com/rivers-and-mobile-delta/autauga-creek) | Which officially documented trips offer straightforward access and broad recreational appeal? Separate delta navigation from river scoring. |
| 7 | California | Lower American; Russian; Sacramento; selected lower Feather and Kern reaches | [California American River boating facilities](https://www.parks.ca.gov/BoatingFacilities/Body-of-Water/American%20River) | Can the set represent more than one population center while excluding technical reaches and unsupported release assumptions? |
| 8 | Connecticut | Farmington; Connecticut; Housatonic; Quinnipiac; Quinebaug; Shetucket | [CT DEEP boat launches](https://portal.ct.gov/DEEP/Boating/Boat-Launches) | Which access chains have clear dam boundaries and non-tidal options appropriate for initial discovery? |
| 9 | Montana | Bitterroot; Clark Fork; Blackfoot; Yellowstone; Missouri | [Montana FWP fishing access](https://fwp.mt.gov/fish/fishing-access), [Blackfoot recreation](https://fwp.mt.gov/activities/boating/blackfoot-river) | Which day floats have current access and use rules, manageable remoteness, and suitable reach-specific conditions? |
| 10 | Louisiana | Bogue Chitto; Tangipahoa; Tickfaw; Bayou Teche; managed Atchafalaya trails | [Bogue Chitto State Park](https://www.lastateparks.com/parks-preserves/bogue-chitto-state-park), [Louisiana park directory](https://www.lastateparks.com/state-parks-and-preservation-areas) | Can managed river and bayou trips be represented accurately without treating discharge as a complete swamp or tidal conditions model? |
| 11 | Washington | Yakima Canyon; Snoqualmie Valley; selected Skagit, Stillaguamish, Spokane, and lower Columbia reaches | [BLM Yakima River Canyon](https://www.blm.gov/visit/yakima-river-canyon) | Which bounded reaches avoid dam take-out risk and have clear cold-water, wood, and flow guidance? |
| 12 | New Hampshire | Saco; Pemigewasset; Merrimack; Contoocook; Androscoggin; Connecticut | [Visit NH paddling leads](https://www.visitnh.gov/blog/kayak-with-a-view), [public-access directory entry](https://www.visitnh.gov/things-to-do/boating-cruises) | Can official access managers substantiate these discovery leads and keep recreational segments separate from rapids and dams? |
| 13 | Mississippi | Black Creek; Red Creek; Bogue Chitto; selected Leaf, Bouie, and Pascagoula reaches | [USFS Mississippi recreation directory](https://www.fs.usda.gov/recarea/mississippi/recarea/?recid=82488), [Black Creek river designation](https://www.fws.gov/rivers/river/black-creek) | Which reaches have source-backed public landings, useful shuttle distances, and reliable flood/access information? |
| 14 | Vermont | Missisquoi; Lamoille; Winooski; Connecticut; Otter Creek; selected White River reaches | [Northern Forest Canoe Trail](https://www.northernforestcanoetrail.org/) | Which trail and municipal sources establish usable day-trip segments, current launches, and verified dam boundaries? |
| 15 | Nevada | Truckee; Carson; Nevada-access Black Canyon/Colorado reaches | [NPS Black Canyon National Water Trail](https://www.nps.gov/thingstodo/black-canyon-national-water-trail.htm) | Are ten distinct river trips supportable without redundant cards, difficult access, or unsupported conditions models? Accept fewer if necessary. |
| 16 | Rhode Island | Wood; Pawcatuck; Pawtuxet; selected Blackstone and Branch reaches | [ExploreRI water trails and access maps](https://exploreri.org/) | How many distinct inland trips survive dam, access, and overlap review? ExploreRI also includes neighboring-state waters; verify attribution. |
| 17 | New Mexico | Rio Grande Pilar/Orilla Verde; Albuquerque bosque reaches; lower Rio Chama; selected San Juan reaches | [BLM Rio Chama](https://www.blm.gov/visit/rio-chama-wild-and-scenic-river), [state Rio Grande/Rio Chama leads](https://www.newmexico.org/things-to-do/outdoor-adventures/rafting-kayaking/rio-grande-rio-chama/) | Which reaches have suitable access, permit/release evidence, and seasonal viability? Avoid forcing ten through technical or remote additions. |

Arizona, Nevada, and New Mexico receive early feasibility attention during preparation even though some appear late in the implementation rotation. Rhode Island also needs careful duplicate and state-boundary review. These are research-risk hypotheses, not findings that those states lack ten good routes.

## Selecting the starter routes

First screen scoring evidence and apply access, safety, evidence, and publication gates. Rank scored candidates ahead of planning fallbacks; use this 100-point rubric within each group:

| Factor | Weight | Evidence to use |
| --- | ---: | --- |
| Likely user value | 25 | Existing route requests; documented use; recognized managed trail; useful proximity to a population center or established paddling destination. Record the evidence; do not equate search-result rank with popularity. |
| Research readiness | 15 | Named official access chain, launch coordinates, current manager guide, clear route length, and retrievable supporting material. |
| Conditions support | 30 | Supported direct telemetry, explicit same-gauge numeric paddling guidance, and a defensible model. Planning suitability is a separate fallback, not equivalent scoring evidence. |
| Practical trip | 20 | Useful day-trip length, straightforward parking/shuttle, manageable restrictions, clear difficulty and hazards. |
| Diversity added | 10 | Adds a new river, population catchment, region, or materially different trip to the state's existing starter selection. |

Aim for at least three river systems and two geographic catchments per completed set where geography permits. Prefer a majority of routes suitable for normal recreational discovery, ideally six or more of ten; do not fill the quota with expert whitewater that is hidden by default. Include a short or simple outing and a longer day trip where supported. Camping is a benefit only when verified, not a quota.

Select distinct useful trips. Never create every pair of accesses or concatenate shorter cards to inflate coverage. A border route counts once toward campaign additions; assign its canonical state from verified access and the existing product convention. Sharing a river with a neighboring state does not alone give both states coverage.

## Qualification and publication contract

Use [route addition requirements](route-addition-requirements.md), [route safety policy](route-safety-policy.md), current publication code, and the candidate ledger together.

The route requirements now distinguish scored routes from reviewed planning routes. Both can count toward public coverage, but only scored routes count toward live-scoring coverage. Planning publication remains a fallback under the scored-first policy above. Do not weaken access or safety requirements, invent gauges or thresholds, or change scoring rules to hit ten.

Every published starter route must have:

- A specific reach, distance, correct state, understandable difficulty, and appropriate route type.
- Both named endpoints verified at actual usable launches/landings, with documented public or explicitly available access, parking, fees, and applicable restrictions.
- Coordinate-backed `accessPoints` for the put-in and take-out; verified intermediate points only.
- Source-backed route geometry reviewed against the launch/landing and waterway, including direction and hazard boundaries.
- Current access/closure review, route-specific hazard notes, and a completed safety review. Unresolved high-consequence take-out or access problems remain blocked.
- Honest conditions treatment. Scored routes must meet the current direct-gauge publication gate with current supported telemetry and defensible same-gauge numeric guidance. Use minimum-only thresholds only where supported. Planning routes must meet the reconciled planning policy and must not imply a live safety assessment.
- Useful logistics and an explicit camping classification or an honest unknown/prohibited note.
- Source URLs, retrieval/review dates, provenance for coordinates and thresholds, and a concise evidence summary. Images must be accurate and licensed if supplied; use the established fallback when suitable imagery is unavailable.

Recheck manager notices and live telemetry at implementation/release time; this planning document does not establish present-day launch suitability. Prefer river trips compatible with the current product. Lake, reservoir, coastal, or complex tidal additions that require a different conditions model are a separate product decision, not quota fillers.

## Bounded research and stop rules

For each state, start with published numeric paddling guidance and its exact official gauge/provider series, then verify manager maps, access directories and route-specific guides. Record the gauge ID, metric, datum where relevant, threshold quotation or concise paraphrase, applicable reach, source date and current telemetry check. Historic flow extremes and flood stage alone do not establish paddling thresholds. Reuse source facts only where reach and gauge relationships actually match.

Retain the control-plane research discipline: at least three source families and six bounded discovery touches for a research run, no more than two stale-candidate rechecks, and two retrieval methods before declaring a source inaccessible. These are research-effort rules, not substitutes for reliable evidence.

After an initial shortlist screen and a separate fallback-source pass, pause unresolved candidates with the exact missing fact, sources/methods attempted, and a concrete retry condition. A failed website retrieval is not evidence that a route does not exist. Continue with the next state when a session produces no newly qualified routes; do not repeatedly pursue the same dead end.

Close a state's starter work at approximately ten qualified public routes, or record a smaller completed set with a documented bounded-research shortfall and remaining blockers. A three-route set with seven unexplored leads is still in progress. A zero-route state remains an explicit coverage gap even if research is paused. Reopen a shortfall when requests or new evidence warrant it.

## Execution records and checks

At campaign activation:

1. Reconcile the state registry and campaign coverage report, including the three already-covered states missing from the registry. Verify state pages and filters recognize newly published states. State pages now expose reviewed planning routes with explicit labels and separate live picks. Continue verifying both treatments as scored routes enter the campaign.
2. Add campaign priority and pass limits to the work queue so mature-state opportunities cannot consume this expansion allocation. Preserve existing research history and active claims; inspect the controller before changing its behavior. This document does not itself change automation configuration.
3. Create state memories and candidate entries using the existing ledger schema. Keep unverified corridor leads distinct from `likely_addable` reaches; populate candidate readiness only after evidence review.
4. Track per state: current pass; candidates screened; qualified; implemented; deployed/public; scored; reviewed planning; default-visible; river systems; next candidate; blockers; retry condition; and first-release date. Store route IDs and release references so counts can be reproduced.

For each implementation batch, run route type checking and the applicable route-data, safety, coordinate, geometry, and overlap audits. Use `npm.cmd run typecheck:routes`, `routes:audit`, `routes:safety:audit`, `routes:audit:coordinates`, `routes:geometries:audit`, and `routes:audit:overlap`, checking each script's scope and output before running it. Generate required access, withholding, geometry, and overview artifacts through the existing workflow. Run targeted publication/API tests and the build/release checks required by the actual changes.

Review changed routes on web and mobile discovery/detail surfaces: state listing, default filters, map geometry, endpoint directions, planning labels or live readings, source links, and request-route entry points. Count a route as released only after the deployed public catalog exposes it and it is not withheld. Report pre-existing audit failures separately from regressions; fix any failures affecting the new cohort before release.

## Engagement and completion

The growth benefit is a hypothesis to test. Capture a baseline before the first release, then compare each state's first 30 and 60 days using state-page and route-detail visits, engaged route use (saves, planner actions, or directions where measured), repeat visitors, and route requests. Track request conversion against visitors and absolute counts. Account for seasonality, differing release dates, and small samples; increased route count alone does not demonstrate engagement growth.

Reuse the request flow and existing weekly/adoption reports. Verify state attribution and metric availability first; record missing metrics as unavailable rather than zero. Ensure each starter state has an obvious route-request path with state context. Verify indexable state/route pages and sitemap inclusion during release review; filling the catalog alone does not guarantee acquisition.

The campaign is complete when every target state has a released starter set near ten or an explicitly documented smaller set after bounded research, with no unresolved quality failures in published additions. Report all 17 state totals and any remaining zero-coverage gaps. Subsequent expansion follows demonstrated requests and usage rather than returning automatically to exhaustive one-state inventories.
