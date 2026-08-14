# Utah Route Memory

Last summarized: 2026-08-14.

## 2026-08-14 Implementation

- Added `south-fork-ogden-river-willows-magpie` as a guarded South Fork Ogden River campground-complex route from Willows Campground to Magpie Campground.
- This was treated as a materially new official route/access/gauge package outside the shipped Ogden River town section: Uinta-Wasatch-Cache National Forest publishes Willows and Magpie coordinates, states the South Fork Ogden River flows through or adjacent to the campgrounds, identifies the South Fork campground complex order, and requires life jackets for South Fork floating/tubing.
- Current USGS Water Services check returned South Fork Ogden River near Huntsville 10137500 at 50.4 cfs / 1.42 ft on 2026-08-14 00:15 MDT.
- Thresholds are conservative minimum-only at 175 cfs. American Whitewater documents the broader Causey Reservoir-to-Huntsville Class II-III(IV) reach on the direct South Fork Ogden gauge and AW trip-report evidence says 175 cfs was plenty for packrafts; the app does not infer ideal or high-water bands.
- Camping is classified `endpoint_campground`: Willows and Magpie are seasonal Forest Service developed campgrounds with reservations/fees/current availability, gate and quiet-hour rules, and stay-limit constraints. No private-bank or unsignposted pullout camping is inferred.
- Safety package records whitewater/swiftwater filtering, cold mountain water, strainers, low bridges, log-jam/bridge-portage history, low-water scraping, campground users/anglers, and private-sensitive lower-takeout cautions. The route intentionally ends inside the public Forest Service complex instead of continuing to Huntsville Hollow.
- Image result: bounded no-image. Forest Service / American Whitewater / Commons / same-route web review found route context but no clearly rights-clean exact Willows-to-Magpie paddling asset selected for local reuse.
- Geometry and coordinate results: canonical geometry generated and audited; route-scoped coordinate audit produced review offsets for Forest Service campground access anchors, not accepted water-entry failures, with arrival-point caveats recorded.

## 2026-08-13 Implementation

- Added `green-river-little-hole-indian-crossing` as a guarded Green River Section B route from Little Hole to Indian Crossing / Browns Park.
- This was treated as a materially new official package under the Utah saturation caveat, not a broad Utah reopening: Ashley National Forest publishes Little Hole as the Section B boat launch with coordinates, BLM publishes Indian Crossing Campground coordinates and river-use rules, Recreation.gov documents Section B float-in camps, and USGS 09234500 returned live Green River near Greendale data at 2,150 cfs / 9.63 ft on 2026-08-13 07:30 MDT.
- Thresholds are conservative minimum-only at 1,000 cfs. American Whitewater ties the broader Flaming Gorge-to-Lodore reach to the Greendale gauge and exposes a runnable range, but the app does not infer an ideal or high-water band for this exact remote 9-mile Section B card.
- Camping is classified `on_route_campsite`: Recreation.gov lists 17 Section B river camps accessed only by hiking or floating in; route copy requires assigned/reservable camps, portable toilet system, trash pack-out, and no inferred private-bank/dispersed camping.
- Safety package records cold dam-release water, hourly 2026 Flaming Gorge release fluctuations, remote Browns Park shuttle exposure, Red Creek rapid/boulder difficulty, PFD requirements, and take-out logistics.
- Image result: bounded no-image. Forest Service / BLM / Recreation.gov / Commons / same-route web review found agency context imagery but no exact Section B paddling asset selected for local reuse.
- Geometry and coordinate results: canonical geometry generated; route-scoped coordinate audit returned review offsets, not failures, with Little Hole 184 ft from the matched Green River flowline and within 46 ft of mapped waterbody, and Indian Crossing 180 ft from a topology-connected Green River trace.

## 2026-08-09 Saturation Audit

- Completed `utah-coverage-complete-saturation-audit` without adding a route or screening speculative expansion candidates.
- Utah inventory is coverage-complete under the current task-board policy: 3 inventory routes, 3 scored direct-USGS routes, and 0 planning routes.
- Confirmed route packages for Green River Section A, Colorado River Moab Daily, and Ogden River Lorin Farr-to-Crystal-Wave retain source-backed access, safety, camping, coordinate/geometry, and bounded no-image evidence.
- USGS current check returned Colorado 09180500 at 1,290 cfs / 1.59 ft at 2026-08-09 03:00 MDT and Ogden 10140700 at 326 cfs / 7.26 ft at 2026-08-09 03:45 MDT. Green 09234500 returned official daily discharge through 2026-08-08 at 1,910 cfs; the instantaneous endpoint retry closed the transport connection during this audit, so no route-data change was made.
- Known excluded blockers remain unchanged: Weber Henefer-to-Taggarts still needs endpoint/access legitimacy and exact coordinates, Provo Deer Creek-to-Vivian still needs product-supported live-source support, and San Juan Sand Island-to-Mexican Hat still needs a permitted multi-day product model.

## Current Inventory

- Live routes: 4.
- Rivers represented: Colorado River, Green River, Ogden River.
- Ledger candidates: 6 total; 3 added/implemented, 1 blocked Weber manual-coordinate/access lead, 1 Provo no-live-gauge lead, 1 San Juan research-later multi-day/permit-model lead.

## Status

Utah now has four implemented seed routes: Green River below Flaming Gorge Dam to Little Hole, Green River Little Hole to Indian Crossing, Colorado River Hittle Bottom to Takeout Beach / Moab Daily, and Ogden River Lorin Farr Park to Crystal Wave.

## Main Blockers

- Weber River Henefer-to-Taggarts has promising AW and threshold context but still needs authoritative endpoint coordinates/access legitimacy, especially around the Taggarts take-out below Taggarts Falls.
- Other candidates need live gauge and access confirmation before implementation.
- San Juan River Sand Island-to-Mexican Hat remains research-later for the current product because it is a permit-managed 26.9-mile desert trip rather than a normal same-day card.

## 2026-08-09 Implementation

- Added `ogden-river-lorin-farr-crystal-wave` as a whitewater route using American Whitewater's 1.3-mile Class II+ town-section page, AW access coordinates, USGS 10140700 current data, Ogden City Lorin Farr Park / Crystal Wave Kayak Park context, Weber State corridor corroboration, and Ogden public-property camping rules.
- Current USGS Water Services check returned Ogden River near Gibson Avenue 10140700 at 326 cfs / 7.26 ft on 2026-08-09 01:45 MDT.
- Thresholds are two-sided but conservative: AW embeds a 150-650 cfs runnable band, while route scoring treats 150-520 cfs as preferred and 650 cfs as too high because AW calls out Lincoln Avenue bridge/portage concerns above about 520 cfs and limited clearance around 550 cfs.
- Camping is classified `none`; Ogden City code prohibits camping on public property outside approved campgrounds, and the route is a short same-day urban parkway lap.
- Safety package records Class II+ whitewater, mandatory Crystal Wave finish, Lincoln bridge clearance/portage warning, fishhooks/wood, downstream brushy meanders, urban water-quality concerns, and the no-extension/diversion-dam caveat.
- Image result: bounded no-image. Ogden City / AW / Weber State / Commons / same-route review found useful route context but no clearly rights-clean exact Lorin-Farr-to-Crystal-Wave paddling asset selected for local reuse.

## 2026-08-06 Implementation

- Added `colorado-river-hittle-bottom-takeout-beach` as a whitewater route using BLM's Moab Daily map, AW endpoint/gauge context, USGS 09180500 current data, and published Moab Daily 2,000 cfs recommended-flow context. The Cisco gauge is upstream of the Hittle-to-Takeout split but inside the AW Professor Valley corridor that contains the Moab Daily, so route copy requires same-day visual checks at Hittle Bottom.
- Current USGS Water Services check returned Colorado River near Cisco 09180500 at 1,140 cfs / 1.50 ft at 2026-08-06 17:00 MDT, below the conservative 2,000 cfs minimum-only floor.
- Camping is classified `sandbar_or_gravel_bar` with BLM restrictions: river-right designated sites and sandbars, river-left developed campgrounds, firepans, toilet systems, trash pack-out, and 14-day trip limit.
- Safety package records Class I-III whitewater variability, PFD-wear/spare-propulsion/repair/bailing/first-aid gear, commercial traffic, wind/heat/storm exposure, and same-day visual checks.
- Image result: bounded no-image. BLM/AW/Commons/same-route review found useful context photos but no clearly rights-clean exact Hittle-Bottom-to-Takeout-Beach paddling asset selected for local reuse.

## Current Guidance

- Do not rerun broad Utah cadence on the same blocked Weber candidate.
- Revisit Weber only with manager/AW-grade endpoint coordinates and access authority.
- Favor official river management, AW route/gauge linkage, and conservative whitewater scoring.
- Next useful Utah task: do not reopen Utah broadly; only consider another materially new official route/access/gauge package outside the shipped Green, Colorado, and Ogden routes, and do not promote San Juan until permitted multi-day handling is product-approved.
