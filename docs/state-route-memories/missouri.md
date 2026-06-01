# Missouri Route Memory

Last summarized: 2026-06-01 10:52 America/Chicago.

## Current Inventory

- Live routes: 34.
- Top represented rivers: Big Piney River 6, Current River 5, Meramec River 5, James River 3, Eleven Point River 3, Jacks Fork River 3.
- Ledger candidates: 88 Missouri records in the structured ledger; many remain blocked by stale live-gauge evidence, weak threshold support, or endpoint-coordinate/access uncertainty.

## Status

Missouri is actively expanding. The current working tree now includes a broad Ozarks set plus the new lower Big Piney Slabtown-to-Ross route. There are still many candidates, but the ledger shows a large no-live-gauge backlog.

Latest run: no route added. Reconciled current coverage at 34 V2 routes. Big Sugar Creek `Deep Ford Access to City of Pineville Elk River Access` remains `needs_manual_coordinates` because the Pineville take-out still lacks source-strong or manually verified coordinates. James River Water Trail `Joe Crighton Access to Lake Springfield Boathouse` remains `needs_manual_coordinates` because endpoint landing coordinates are unresolved and official search-visible USGS `07050700` evidence was stale in the 10:52 recheck. Marmaton River `Cephas Ford Access to Four Rivers / Horton Bottoms` remains `threshold_weak`: MDC and Missouri DNR support access, route shape, and USGS `06917560`, but no numeric paddling threshold tied to the gauge surfaced. Shell USGS Water Services still failed from the workspace.

Latest run: no route added. Big Sugar Creek `Deep Ford Access to City of Pineville Elk River Access` remains `needs_manual_coordinates`: the public access and threshold story is still strong, but the only new coordinate result for Pineville was a thin Edan/Google-derived listing for Elk River Public Access - Pineville at `36.5891, -94.3869`. It was logged as a clue, not accepted as source-strong or manually verified enough for implementation. No app data changed.

Latest run: added `Big River - Mammoth Access to Merrill Horse Access` as `big-river-mammoth-merrill-horse`, bringing Missouri coverage to 34 V2 routes. The prior blocker cleared when official USGS `07018100` exposed same-day product-ready values of `1,490 cfs / 5.76 ft` at `2026-06-01 07:00 CDT`. MDC confirms Mammoth and Merrill Horse as public Big River accesses and gives the 5.40-mile spacing; OzarkAnglers ties this section to the Richwoods gauge and gives route-specific community bands; V2 uses a two-sided `100-800 cfs` ordinary window with `tooLow: 100` and `tooHigh: 1200`. Caveats retained: community threshold source, current reading was above the too-high cutoff during review, endpoint coordinates are practical access/gauge-corridor anchors rather than survey-grade ramp points, and high/rising water, wood, anglers, motorboats, gravel riffles, and private banks require same-day judgment.

Latest run: no route added. `James River Water Trail - Joe Crighton Access to Lake Springfield Boathouse` stays `needs_manual_coordinates` and now also carries a product-live caution. Springfield and Ozark Greenways sources identify the exact 6-mile water-trail route, MDC confirms Joe Crighton Access as public James River access and the water-trail start, Springfield-Greene County Park Board confirms Lake Springfield Park, Boathouse, and Marina with canoe/kayak rentals, USGS `07050700` still exposed only `783 cfs / 6.48 ft` at `2026-05-31 12:00 CDT` during the 08:12 recheck, and Rivers.MOHERP supports a conservative future `40 cfs` minimum-only low-water floor. The blockers are endpoint geometry and live-data freshness: source-backed or manually verified coordinates for both landings are still needed, and the official USGS page needs to expose current product-live data.

Fresh cluster note: Big Sugar Creek `Deep Ford Access to City of Pineville Elk River Access` remains `needs_manual_coordinates`. MDC confirms Deep Ford as a public canoe/kayak gravel launch, Pineville and MDC confirm City of Pineville Elk River Access as a public/free boat-launch access at `100 Conservation Lane`, Float Missouri places Deep Ford at mile 20.4 and the Elk confluence/Pineville corridor near mile 24.3, and MoHERP has exact Deep-Ford-to-Elk-River evidence plus Powell gauge bands. Official USGS `07188653` still exposes June 1 product-live values (`103 cfs / 4.96 ft` at `2026-06-01 07:15 CDT`), so the remaining blocker is the Pineville take-out latitude/longitude. Do not add until that coordinate pair is source-backed or manually verified.

Latest run: no route added. The 09:32 recheck preserved the same Big Sugar decision: official USGS `07188653` remains product-live, MDC/Pineville access evidence is strong, the MDC area map confirms the Pineville ramp/parking/privy layout, and Paddling.com gives Deep Ford coordinates, but targeted searches still did not surface a source-backed or manually verified latitude/longitude pair for City of Pineville Elk River Access. James River Water Trail and Huzzah Creek were also rechecked for coordinate/model improvement and remain unresolved holds.

Latest run: no route added. The 09:52 recheck again kept Big Sugar Creek `Deep Ford Access to City of Pineville Elk River Access` at `needs_manual_coordinates`: MDC and Pineville continue to confirm the public/free Pineville take-out and ramp context, Float Missouri/MoHERP support the Deep-Ford-to-Elk-River route and Powell-gauge low-water context, but no source-backed or manually verified latitude/longitude pair surfaced for City of Pineville Elk River Access. A fresh Bourbeuse River `Reiker Ford Access to Mayers Landing Access` cluster was reviewed and kept at `research_later`: MDC names the 11-mile route and confirms both access areas, but MDC currently warns that access to the main Bourbeuse channel from Mayers Landing is limited because the river shifted away from the ramp, Mayers coordinates were not captured, and the accessible official USGS `07016500` page did not expose current discharge/stage in this run.

Fresh cluster note: James River Water Trail `Joe Crighton Access to Lake Springfield Boathouse` now has product-live official USGS `07050700` values (`471 cfs / 5.94 ft` at `2026-06-01 08:00 CDT`) but remains `needs_manual_coordinates`; both endpoint landings still need source-backed or manually verified coordinates before implementation. Huzzah Creek `Huzzah Conservation Area to Meramec / Onondaga` now has product-live official USGS `07014000` values (`140 cfs / 3.61 ft` at `2026-06-01 08:30 CDT`) but remains unresolved because the Huzzah-only MoHERP row ends at an unnamed Meramec confluence and the practical Onondaga/Hwy H finish needs an explicit one-gauge model plus endpoint coordinates.

Fresh cluster note: Shoal Creek `Allen Bridge Access to Tipton Ford Access` was reviewed and logged as `threshold_weak`. MDC supports the public access chain and spacing, USGS `07187000` remains the downstream direct Joplin gauge, and MoHERP supports general Shoal Creek/Joplin bands, but V2 already covers the stronger practical Joplin day reach as `shoal-creek-tipton-ford-wildcat`. Do not add another Shoal subreach unless exact-route threshold evidence improves or product policy intentionally expands adjacent Shoal Creek coverage.

Fresh adjacent-corridor note: Big River `Washington State Park Access to Mammoth Access` remains `threshold_weak` even though the adjacent Mammoth-to-Merrill Horse route is now live. Do not inherit the downstream Mammoth/Merrill Richwoods-gauge threshold model for Washington-to-Mammoth unless a credible source ties that exact short route to a numeric gauge floor/range.

## Main Blockers

- No live/product-fresh gauge on many otherwise plausible Ozark candidates.
- Community threshold sources often support conservative minimum-only models but not ideal ranges or high cutoffs.
- Coordinate authority can be weak for remote accesses unless MDC, NPS, USFS, or another manager source confirms the endpoint.

## Current Guidance

- Continue targeted Missouri work where USGS, NPS, MDC, USFS, or MoHERP evidence is strong.
- Prefer conservative `minimum-only` scoring when threshold evidence supports only a low-water floor.
- Keep public access authority explicit; do not ship inferred gravel-bar or private-bank endpoints.
