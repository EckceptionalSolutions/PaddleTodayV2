# Kansas Route Memory

Last summarized: 2026-06-26.

## 2026-07-02 lower-Kaw implementation pass

- Rebuilt the current Kansas inventory from the live repo state before editing. Kansas had 17 live routes in `src/data/rivers.ts`, all on the Kansas River, so this pass needed three genuinely new slugs beyond that baseline.
- Added `kansas-river-eudora-edwardsville`, `kansas-river-de-soto-turner-bridge`, and `kansas-river-de-soto-kaw-point`.
- Route, gauge, and threshold evidence:
  - Current Friends of the Kaw access pages still document the uninterrupted public lower-Kaw chain at Eudora `RM 42`, De Soto `RM 31.3`, Edwardsville `RM 16.6`, Turner Bridge `RM 9.2`, and Kaw Point `RM 0`, which supports the three new combined routes of about `25.4`, `22.1`, and `31.3` miles without crossing the Lawrence or Topeka dam breaks.
  - The current WaterOne low-head-dam page still documents the river-left-only mandatory portage at `RM 14.8`, which keeps the two downstream combinations implementation-grade instead of inferred.
  - Same-day direct USGS Water Services returned `17,600 cfs / 10.55 ft` at De Soto (`06892350`) at `2026-07-02 05:30 CDT`.
  - Current Friends of the Kaw FAQ, camping, and river-safety guidance still supports Kansas public-river status, novice guidance below `5,000 cfs`, all-paddler guidance below `8,000 cfs`, and sandbar camping only between the high-water marks with private banks off-limits.
- Camping, safety, and image posture:
  - `kansas-river-eudora-edwardsville` uses `sandbar_or_gravel_bar` because the distance is overnight-capable and Friends of the Kaw still allows public sandbar camping below the high-water marks.
  - `kansas-river-de-soto-turner-bridge` and `kansas-river-de-soto-kaw-point` stay `none` because the WaterOne-controlled lower reach has almost no sandbars and the portage / urban-finish sequence is better treated as a committed day push.
  - The two WaterOne routes carry `advanced` safety posture with explicit `low_head_dam` and `mandatory_takeout` hazards; the Eudora-to-Edwardsville continuation stays `caution` but still ends before the same downstream dam hazard.
  - Reused the approved lower-Kaw Commons corridor image for all three new slugs and recorded the same-river reuse in `docs/river-image-source-audit.csv`.

## Current Inventory

- Live routes: 17.
- Rivers represented: Kansas River 17.
- Ledger candidates: 22 total; 17 added, 1 `no_live_gauge`, 3 `threshold_weak`, 1 `research_later`.

## Status

Kansas reopened on 2026-06-26 once same-day USGS Water Services for Wamego (`06887500`) was verified directly in the runtime. The successful expansion wave now includes five upper-Kaw combination routes built from the existing Friends of the Kaw public-ramp sequence: `kansas-river-junction-city-manhattan`, `kansas-river-ogden-st-george`, `kansas-river-manhattan-wamego`, `kansas-river-junction-city-st-george`, and `kansas-river-ogden-wamego`.

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
- Treat long Kansas River combinations as `sandbar_or_gravel_bar` or similarly conservative overnight-capable content only when the note explicitly says public sandbar camping is below the high-water mark and private banks are off-limits.
- Keep avoiding duplication across the Topeka Weir and Lawrence dam breaks unless a route manager publishes a stronger portage/access package.
- Revisit Arkansas/Missouri River candidates only if they gain manager-grade endpoint and threshold evidence.

