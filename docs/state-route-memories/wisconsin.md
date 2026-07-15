# Wisconsin Route Memory

Last summarized: 2026-07-15.

## Current Inventory

- Live routes: 77.
- Top represented rivers: Wisconsin River 11, Peshtigo River 5, Wolf River 4, Chippewa River 4, Bois Brule River 4, Black River 3, Brule River 3, Grant River 3, Milwaukee River 3, Sugar River 3.
- Ledger candidates: 74 total; 65 added, 4 `research_later`, 1 `duplicate_corridor`, 4 `rejected`.

## Status

Wisconsin remains mature and heavily implemented. The 2026-07-14/15 America/Chicago run added three Grant River routes beyond the 74-route baseline: `grant-river-short-cut-county-u`, `grant-river-county-u-chaffie-hollow`, and `grant-river-chaffie-hollow-potosi-point`.

## Latest Audit

- 2026-07-14/15 America/Chicago: added `grant-river-short-cut-county-u`, `grant-river-county-u-chaffie-hollow`, and `grant-river-chaffie-hollow-potosi-point`, bringing the live Wisconsin route count to 77.
- The Grant routes use Miles Paddled route-specific endpoint coordinates, distances, class/gradient notes, and Burton-gauge guidance; Travel Wisconsin and Grant County tourism corroborate Grant River public paddling context; USACE/Recreation.gov support the Potosi Point / Grant River Recreation Area endpoint campground and boat-ramp context.
- Live gauge check during the run returned USGS `05413500` Grant River at Burton at 267 cfs / 6.00 ft on 2026-07-14 19:00 CDT. Short Cut-to-County-U and County-U-to-Chaffie use minimum-only 175 cfs floors; Chaffie-to-Potosi uses the route-specific 260 cfs recommended level as a conservative floor. No upper cutoffs were invented.
- Safety/logistics added: private/outfitter landing ambiguity, same-day signage checks, low-water scraping, deadfall/logjam history, strainers, cattle/farm banks, overgrown access, long flat lower-river commitment, Mississippi River backwater/confluence exposure, wind/wake, cold water, and nearby/endpoint campground caveats.
- No route-gallery assets were added. Bounded Commons / Travel Wisconsin / Grant County / Miles Paddled / Wisconsin River Trips / USACE / Recreation.gov / same-route review found no clearly rights-clean exact-route paddling image selected for local reuse.
- 2026-07-14 19:32 America/Chicago: folded the unpushed Lower Wisconsin split slugs `wisconsin-river-boscobel-woodman`, `wisconsin-river-woodman-millville`, and `wisconsin-river-millville-bridgeport` into canonical `wisconsin-river-boscobel-bridgeport`.
- The canonical Boscobel-to-Bridgeport corridor now carries Woodman and Millville as alternate access-planner points, plus Wisconsin River Trips support for the adjacent splits and the existing Muscoda gauge ladder.
- Current imported Wisconsin route count is 77. Wisconsin River live cards are now 12, not 15, because the split routes are represented inside the access planner instead of as separate route cards.
- 2026-07-14 19:17 America/Chicago: added `brule-river-campground-highway-139`, `brule-river-forest-road-2150-flowage`, and `wisconsin-river-pine-island-portage`. The same commit also consolidated overlapping Lower Wisconsin split cards, so the final committed Wisconsin count remains 74.
- The two new Brule routes complete the WTG B1/B2/B3 border-river chain around existing `brule-river-highway-139-fr-2150`; B1 and B3 use USGS `04060993` with WTG's 220 cfs / 3.5 ft minimum and explicit remote/strainer/primitive-camping or no-camping caveats.
- The new Pine Island-to-Portage route uses Wisconsin River Trips Pine Island and Portage pages, Wisconsin DNR Pine Island Wildlife Area access and no-camping rules, and USGS `05404000` at Wisconsin Dells with WRT's 4,000-6,000 cfs average-summer band and 13,000+ cfs unsuitable caveat.
- Reviewed but did not add the Granite Heights / Wisconsin River Forest Landing-to-Brokaw idea because USGS `05400650` at Merrill returned only stale 1987 data in Water Services during this run.

## Main Blockers

- Remaining work is still mostly blocked or research-later rather than a broad shortage of known routes. The Grant River family is now represented by three route cards and should not be re-added as adjacent duplicate cards without stronger official access segmentation.
- The easiest remaining wins are now even narrower and more likely to be duplicate corridors, stale access records, or weak threshold models.

## Current Guidance

- Broad Wisconsin cadence still does not make sense.
- If Wisconsin comes back into rotation, prefer targeted follow-up around official county paddling pages plus Wisconsin Trail Guide segments that share a direct USGS gauge and publish named public accesses.
- The 2026-07-02 upper Chippewa pass exhausted the cleanest remaining Bruce-gauge continuations: `chippewa-river-county-d-imalone`, `chippewa-river-county-d-highway-8`, and `chippewa-river-highway-8-flambeau-river`.
- The 2026-07-14 Wisconsin run added WTG Wolf W1 and Black River BK2/BK3. The Wolf W1 route uses Langlade as a downstream proxy with a full WTG ladder; the Black River BK2/BK3 routes use Black River Falls gauge bounds of 200 cfs minimum and 3000 cfs maximum without inventing a narrower ideal window.
- The 2026-07-14 17:03 Wisconsin run initially added Lower Wisconsin shorter split routes only after confirming the prompt examples were already present or still blocked: Bark River Prince's Point-to-Burnt Village, Sugar River Highway X-to-Attica, and upper Chippewa continuations were already implemented; Black Earth Creek Cross Plains-to-Salmo Pond stayed blocked by unresolved 2025 blockage evidence.
- Those Lower Wisconsin split routes used USGS `05407000` at Muscoda, Wisconsin Trail Guide LWSR4's 4,000-10,000 cfs normal / 20,000+ cfs not-recommended ladder, Wisconsin River Trips route-specific reports, and DNR major-access listings for Boscobel, Woodman Lake, Millville, and Bridgeport. They are now folded into canonical `wisconsin-river-boscobel-bridgeport`; no images were selected.
- The 2026-07-14 18:10 run used Wisconsin Trail Guide route families instead of weaker remaining prompt examples. Peshtigo P1 uses downstream/proxy USGS `04067958` at Wabeno with WTG's 4.2-6.0 ft P1 guidance; Peshtigo P3 uses the same Wabeno gauge with WTG's 4.5 ft minimum, 5.0-6.0 ft best rapid-running band, and 7.5 ft high-water ceiling; Popple PO1 uses direct in-segment USGS `04063700` with WTG's 150 cfs minimum, 250-500 cfs medium band, and 800 cfs high-water ceiling.
- The 2026-07-14 19:17 run added WTG Brule B1 and B3 plus WRT Pine Island-to-Portage. Do not re-add adjacent Brule B2, and keep Pine Island no-camping language strict because DNR prohibits camping on the wildlife area including islands and sandbars.
- Black River BK1 was reviewed but not added because Wisconsin Trail Guide explicitly says no usable gauge and the take-out is directly above the Black River Falls dam. Chippewa C1 stayed out because the safer lower River Road access lacks parking while the upper option introduces Bellile Falls / dam-release complexity.
- Wisconsin River Trips, Wisconsin Trail Guide, official county water-trail PDFs/pages, DNR/USFS sources, AW, and direct USGS gauges remain the core source stack.

