# Utah Route Memory

Last summarized: 2026-08-09.

## 2026-08-09 Saturation Audit

- Completed `utah-coverage-complete-saturation-audit` without adding a route or screening speculative expansion candidates.
- Utah inventory is coverage-complete under the current task-board policy: 3 inventory routes, 3 scored direct-USGS routes, and 0 planning routes.
- Confirmed route packages for Green River Section A, Colorado River Moab Daily, and Ogden River Lorin Farr-to-Crystal-Wave retain source-backed access, safety, camping, coordinate/geometry, and bounded no-image evidence.
- USGS current check returned Colorado 09180500 at 1,290 cfs / 1.59 ft at 2026-08-09 03:00 MDT and Ogden 10140700 at 326 cfs / 7.26 ft at 2026-08-09 03:45 MDT. Green 09234500 returned official daily discharge through 2026-08-08 at 1,910 cfs; the instantaneous endpoint retry closed the transport connection during this audit, so no route-data change was made.
- Known excluded blockers remain unchanged: Weber Henefer-to-Taggarts still needs endpoint/access legitimacy and exact coordinates, Provo Deer Creek-to-Vivian still needs product-supported live-source support, and San Juan Sand Island-to-Mexican Hat still needs a permitted multi-day product model.

## Current Inventory

- Live routes: 3.
- Rivers represented: Colorado River, Green River, Ogden River.
- Ledger candidates: 6 total; 3 added/implemented, 1 blocked Weber manual-coordinate/access lead, 1 Provo no-live-gauge lead, 1 San Juan research-later multi-day/permit-model lead.

## Status

Utah now has three implemented seed routes: Green River below Flaming Gorge Dam to Little Hole, Colorado River Hittle Bottom to Takeout Beach / Moab Daily, and Ogden River Lorin Farr Park to Crystal Wave.

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
- Next useful Utah task: look for another same-day, public-access route with product-supported live gauge and source-backed numeric thresholds outside the shipped Green, Colorado, and Ogden routes; do not promote San Juan until permitted multi-day handling is product-approved.
