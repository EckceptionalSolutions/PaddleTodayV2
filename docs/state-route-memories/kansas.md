# Kansas Route Memory

Last summarized: 2026-07-03 14:15 America/Chicago.

## 2026-07-03 Blue River implementation pass

- Mixed-state follow-up at 2026-07-03 14:15 America/Chicago added `kansas-river-st-george-belvue`.
- The route reused the same current Friends of the Kaw upper-Kaw access chain already validated earlier today: St. George `RM 137` to Wamego `RM 128.5` `8.5` miles plus Wamego to Belvue `RM 119` `9.5` miles, for a defensible public continuation of about `18.0` miles.
- Same-day direct USGS Water Services returned `14,500 cfs / 9.43 ft` at `2026-07-03 13:30 CDT` for Wamego (`06887500`), above the conservative `1,500-5,000` cfs recreational band and above the `8,000` cfs high-side limit.
- `kansas-river-st-george-belvue` uses `sandbar_or_gravel_bar` because the mileage is long enough for conservative public-sandbar overnight framing when bars are exposed and private banks remain off-limits, while safety keeps the Belvue partial low-head-dam river-left finish line explicit.
- Reused the approved Kansas River Commons corridor image for the new slug and recorded that same-river reuse in `docs/river-image-source-audit.csv`.

- Rebuilt the current Kansas inventory from the live repo state before editing. Kansas had seventeen live routes in `src/data/rivers.ts`, all on the Kansas River, so this pass needed three genuinely new slugs beyond that baseline.
- Added `kansas-river-blue-river-st-george`, `kansas-river-blue-river-wamego`, and `kansas-river-blue-river-belvue`.
- Route, gauge, and threshold evidence:
  - Current Friends of the Kaw access pages still document the uninterrupted upper-Kaw chain at Linear Park / Blue River `RM 147.5`, St. George `RM 137`, Wamego `RM 128.5`, and Belvue `RM 119`, which supports the three Blue River combinations of about `11.5`, `20.0`, and `29.5` miles.
  - The current Blue River page still confirms the launch is on the Blue River about one-third mile upstream from the Kansas River confluence, and current Manhattan-area Friends of the Kaw guidance still keeps the Tuttle Creek / Big Blue release caveat explicit near this launch family.
  - Same-day direct USGS Water Services returned `14,800 cfs / 9.52 ft` at Wamego (`06887500`) at `2026-07-03 08:30 CDT`.
  - Current Friends of the Kaw FAQ, camping, and river-safety guidance still supports Kansas public-river status, novice guidance below `5,000 cfs`, all-paddler guidance below `8,000 cfs`, and sandbar camping only between the high-water marks with private banks off-limits. The USACE Kansas River recreation appendix still supports the low-side `1,000 / 1,500-5,000 / 8,000` calibration used for broad Kaw scoring.
- Camping, safety, and image posture:
  - `kansas-river-blue-river-st-george` stays a guarded day trip with `caution` posture because it avoids the Belvue dam finish and is short enough that overnight framing would overstate the route.
  - `kansas-river-blue-river-wamego` and `kansas-river-blue-river-belvue` use `sandbar_or_gravel_bar` because the mileage is long enough that conservative public sandbar overnight framing is defensible when sandbars are exposed and private banks remain off-limits.
  - `kansas-river-blue-river-belvue` carries `advanced` safety posture with the Belvue partial low-head-dam left-side finish line; the Blue-River-to-St.-George and Blue-River-to-Wamego routes stay `caution` but still foreground Blue River release context, wind, private banks, and long exposed mileage.
  - Reused the approved Kansas River Commons corridor image for all three slugs and recorded the same-river reuse in `docs/river-image-source-audit.csv`.

## 2026-07-02 lower-Kaw implementation pass

- Rebuilt the current Kansas inventory from the live repo state before editing. Kansas had 17 live routes in `src/data/rivers.ts`, all on the Kansas River, so this pass needed three genuinely new slugs beyond that baseline.
- Added `kansas-river-eudora-de-soto`, `kansas-river-de-soto-kaw-point`, and `kansas-river-de-soto-kaw-point`.
- Route, gauge, and threshold evidence:
  - Current Friends of the Kaw access pages still document the uninterrupted public lower-Kaw chain at Eudora `RM 42`, De Soto `RM 31.3`, Edwardsville `RM 16.6`, Turner Bridge `RM 9.2`, and Kaw Point `RM 0`, which supports the three new combined routes of about `25.4`, `22.1`, and `31.3` miles without crossing the Lawrence or Topeka dam breaks.
  - The current WaterOne low-head-dam page still documents the river-left-only mandatory portage at `RM 14.8`, which keeps the two downstream combinations implementation-grade instead of inferred.
  - Same-day direct USGS Water Services returned `17,600 cfs / 10.55 ft` at De Soto (`06892350`) at `2026-07-02 05:30 CDT`.
  - Current Friends of the Kaw FAQ, camping, and river-safety guidance still supports Kansas public-river status, novice guidance below `5,000 cfs`, all-paddler guidance below `8,000 cfs`, and sandbar camping only between the high-water marks with private banks off-limits.
- Camping, safety, and image posture:
  - `kansas-river-eudora-de-soto` uses `sandbar_or_gravel_bar` because the distance is overnight-capable and Friends of the Kaw still allows public sandbar camping below the high-water marks.
  - `kansas-river-de-soto-kaw-point` and `kansas-river-de-soto-kaw-point` stay `none` because the WaterOne-controlled lower reach has almost no sandbars and the portage / urban-finish sequence is better treated as a committed day push.
  - The two WaterOne routes carry `advanced` safety posture with explicit `low_head_dam` and `mandatory_takeout` hazards; the Eudora-to-Edwardsville continuation stays `caution` but still ends before the same downstream dam hazard.
  - Reused the approved lower-Kaw Commons corridor image for all three new slugs and recorded the same-river reuse in `docs/river-image-source-audit.csv`.

## Current Inventory

- Live routes: 21.
- Rivers represented: Kansas River 21.
- Ledger candidates: 22 total; 17 added, 1 `no_live_gauge`, 3 `threshold_weak`, 1 `research_later`.

## Status

Kansas reopened on 2026-06-26 once same-day USGS Water Services for Wamego (`06887500`) was verified directly in the runtime. The successful expansion wave now includes the Blue River launch family on top of the earlier Junction City, Ogden, Manhattan, St. George, Wamego, and Belvue combinations, so the strongest remaining Kansas work is no longer more upper-Kaw recombinations but genuinely new route families or a manager-backed break in the current dam-separated gaps.

## Main Blockers

- `ks-kansas-river-kaw-river-state-park-topeka-water-plant` is still blocked as a normal route because it crosses the Topeka Weir low-head-dam complex; keep the upstream Kaw River State Park content and downstream Topeka Water Plant content separate unless a manager-backed portage product story changes.
- Arkansas River Wichita/Hutchinson families have public-river interest but weak exact-route endpoint and threshold packages.
- Missouri River Kansas-side candidates lack a conservative private-paddlecraft threshold model and have big-river hazards: wind, wing dams, commercial traffic, fast current, and long access spacing.

## Current Guidance

- 2026-06-26 upper-Kaw follow-up
  - Added `kansas-river-junction-city-st-george` and `kansas-river-ogden-wamego` using the same Friends of the Kaw access chain plus same-day direct USGS Water Services at Wamego (`06887500`) returning `18900 cfs / 10.63 ft` at `2026-06-26 12:30 CDT`.
  - Both routes keep the conservative Friends of the Kaw safety/camping package: beginners stay under `5000 cfs`, everyone stays under `8000 cfs`, public sandbar camping is below the high-water mark only, and private banks remain off-limits.
  - A longer `kansas-river-junction-city-wamego` combination was researched but not kept because the current route audit rejects day routes above the repo's `35` mile ceiling.
- Wamego-backed upper-Kaw combinations are still viable when they stay on the uninterrupted Junction City -> Ogden -> Manhattan -> St. George -> Wamego chain and do not cross a dam-separated break.
- The current upper-Kaw chain now also includes Linear Park / Blue River -> St. George -> Wamego -> Belvue. Do not duplicate those three Blue River combinations unless Friends of the Kaw changes access status, the Wamego gauge story changes materially, or a better rights-clean image becomes available.
- Treat long Kansas River combinations as `sandbar_or_gravel_bar` or similarly conservative overnight-capable content only when the note explicitly says public sandbar camping is below the high-water mark and private banks are off-limits.
- Keep avoiding duplication across the Topeka Weir and Lawrence dam breaks unless a route manager publishes a stronger portage/access package.
- Revisit Arkansas/Missouri River candidates only if they gain manager-grade endpoint and threshold evidence.



## 2026-07-02 consolidation note

- Redundant unpushed route permutations from the July 2 route-add wave were consolidated into canonical multi-access route records. If an earlier note in this file now repeats a canonical slug, treat that as evidence that the former point-to-point variant was folded into the live access-planner route rather than kept as a separate route.

## 2026-07-03 upper-Kaw consolidation pass

- Collapsed the densest upper- and lower-Kaw same-gauge subsets into the existing planner corridors and left Kansas at `15` live Kansas River slugs instead of the pre-pass `25`.
- The main canonical survivors for these clustered families are now `kansas-river-manhattan-belvue`, `kansas-river-blue-river-belvue`, and `kansas-river-de-soto-kaw-point`, each of which preserves the intermediate public access ladder in trip details instead of keeping separate St. George, Wamego, Edwardsville, Turner Bridge, and Kaw Point subset cards.
- Treat deleted slugs such as `kansas-river-st-george-belvue`, `kansas-river-st-george-wamego`, `kansas-river-wamego-belvue`, `kansas-river-manhattan-st-george`, `kansas-river-manhattan-wamego`, `kansas-river-de-soto-edwardsville`, `kansas-river-edwardsville-turner-bridge`, and `kansas-river-turner-bridge-kaw-point` as intentionally folded into those planner routes.

## 2026-07-02 Kansas continuation implementation pass

- Rebuilt the current Kansas inventory from the live repo state before editing and treated the generated route inbox count of `458` live routes as the run baseline. This pass needed three genuinely new slugs beyond that live-tree baseline, not credit for earlier July 2 automation commits.
- Added `kansas-river-eudora-turner-bridge`, `kansas-river-manhattan-belvue`, and `kansas-river-manhattan-belvue`.
- Route, gauge, and threshold evidence:
  - Current Friends of the Kaw access pages still document the uninterrupted public lower-Kaw chain at Eudora `RM 42`, De Soto `RM 31.3`, Edwardsville `RM 16.6`, Turner Bridge `RM 9.2`, and the WaterOne low-head dam at `RM 14.8`, which supports `kansas-river-eudora-turner-bridge` as a defensible 32.8-mile continuation with a mandatory river-left portage.
  - Current Friends of the Kaw access pages still document Manhattan `RM 150.7`, St. George `RM 137`, Wamego `RM 128.5`, Belvue `RM 119`, and the Belvue partial low-head dam at `RM 120`, which supports `kansas-river-manhattan-belvue` and `kansas-river-manhattan-belvue` as implementation-grade upper-Kaw continuations that stay river left near the dam hazard.
  - Same-day direct USGS Water Services returned `17,300 cfs / 10.50 ft` at De Soto (`06892350`) and `15,500 cfs / 9.70 ft` at Wamego (`06887500`) at `2026-07-02 10:30 CDT`.
  - Current Friends of the Kaw FAQ, camping, and river-safety guidance still supports Kansas public-river status, novice guidance below `5,000 cfs`, all-paddler guidance below `8,000 cfs`, and sandbar camping only between the high-water marks with private banks off-limits. The USACE Kansas River recreation appendix still supports the low-side `1,000 / 1,500-5,000` calibration used for broad Kaw scoring.
- Camping, safety, and image posture:
  - `kansas-river-manhattan-belvue` and `kansas-river-manhattan-belvue` use `sandbar_or_gravel_bar` because they are long enough that conservative public sandbar overnight framing is defensible when sandbars are exposed and private banks remain off-limits.
  - `kansas-river-eudora-turner-bridge` stays `none` because the lower controlled reach plus the WaterOne mandatory portage make it a committed through-route rather than a practical camping corridor.
  - All three routes foreground the controlling hazard: WaterOne river-left-only portage for the lower route, and the Belvue partial low-head-dam left-side finish line for the two upper routes.
  - Reused already approved Kansas River Commons assets for all three slugs and recorded the same-river reuse in `docs/river-image-source-audit.csv`.
