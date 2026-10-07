# Truckee River route-family review — Nevada — 2026-10-07

## Search Console and catalog evidence

The Search Console Web Performance report filtered to URLs containing `truckee-river` showed 0 clicks and 0 impressions for April 28–October 4, 2026. This is no observed search demand in the available period; it does not establish the indexing status of each route.

The public catalog has 24 Truckee River endpoint combinations and no existing route-page consolidations. Most choices lie along the Reno–Sparks access chain; the set also includes a technical Floriston reach and lower reaches toward Pyramid Lake. All routes retain different distances, access notes, gauge assignments, and hazards in the data model, so the family should be organized around documented reaches without merging route records.

## Route-page decision

The Nevada Truckee floatable-reaches map publishes six consecutive named sections, rows 4–9: Floriston–Verdi (10 mi, Class III–IV), Verdi–Mayberry (8 mi, Class I–II), Mayberry–Cottonwood (10.8 mi, Class I–II), Cottonwood–Lockwood (4.9 mi, Class I–II), Lockwood–USA Parkway (12 mi, Class I–II), and USA Parkway–Wadsworth (14.7 mi, Class I–II). Keep these six source-named sections as standalone pages.

Consolidate the other 18 endpoint combinations to their exact trip cards on the Truckee River hub. The picker still exposes all 24 trips with route-specific distance, difficulty, gauge, access, and hazard information. This reduces indexable combination pages from 24 to the six mapped reaches while preserving each trip option.

## Source reconciliation and route-specific cautions

The current Nevada Trail Finder detail page titled “Mayberry Park to Cottonwood Park” lists 5.1 miles, but the Nevada floatable-reaches map lists the same endpoint pair at 10.8 miles, and American Whitewater's detailed reach places Cottonwood Park 10.41 miles below Mayberry. Paddle Today already shows about 10 miles; the hub now makes the conflict visible and bases that displayed rounded figure on the map and detailed river feature distances rather than the inconsistent single-page listing.

The Nevada map identifies the Floriston run as Class III–IV, marks dams and portage areas, warns that higher flows increase danger, and says a Pyramid Lake Paiute Tribe boating permit is required for USA Parkway–Wadsworth Bridge. It also says all river users must take out at Wadsworth Bridge. The Nevada Trail Finder's Lockwood–USA Parkway and USA Parkway–Wadsworth pages further distinguish the lower reach and Derby Dam portage. The hub directs paddlers to the gauge linked to each trip: Farad for Floriston, Reno for the central corridor, Vista near Lockwood–USA Parkway, and below Derby Dam near Wadsworth for the final reach.

## Implementation

- Six documented map reaches retain standalone route pages and sitemap entries.
- Eighteen overlapping endpoint combinations now resolve to their selected trip cards on the Truckee hub and leave the sitemap.
- State and route links use the consolidation target helper, so they lead directly to the selected hub card.
- The hub explains the upper, Reno–Sparks, and lower reaches; the per-trip gauge differences; the Derby Dam portage; the Wadsworth permit/take-out rule; and the Mayberry–Cottonwood distance discrepancy.
- No route record, distance, gauge, hazard, or access option was removed or rewritten.

## Sources

- Nevada Trail Finder, [Truckee River floatable reaches and access points map](https://files.aptuitivcdn.com/mVq57ky5p9-1707/docs/trails/map/TruckeeRiver11x17-10.1773313608.pdf)
- Nevada Trail Finder, [Mayberry Park to Cottonwood Park](https://www.nvtrailfinder.com/trails/trail/truckee-river-mayberry-park-to-idlewild-park)
- Nevada Trail Finder, [Lockwood to USA Parkway](https://www.nvtrailfinder.com/trails/trail/truckee-river-lockwood-to-usa-parkway)
- Nevada Trail Finder, [USA Parkway to Wadsworth](https://www.nvtrailfinder.com/trails/trail/truckee-river-usa-parkway-to-wadsworth)
- American Whitewater, [Truckee Reno reach](https://www.americanwhitewater.org/content/River/view/river-detail/4137/main)
- USGS, [Truckee River at Farad](https://waterdata.usgs.gov/monitoring-location/USGS-10346000/), [Truckee River at Reno](https://waterdata.usgs.gov/monitoring-location/USGS-10348000/), [Truckee River at Vista](https://waterdata.usgs.gov/monitoring-location/USGS-10350000/), and [Truckee River below Derby Dam near Wadsworth](https://waterdata.usgs.gov/monitoring-location/USGS-10351600/)

## Production verification

Commit `c4c02205b7a39454c7e0cf8b5aeda1b107443e90` is deployed. Frontend workflow 37690589748 passed tests, production build, both built-page indexability audits, asset checks, deployment, and live-origin checks; API workflow 37690589622 and Snapshot Worker workflow 37690589702 also succeeded.

Production `robots.txt`, `/sitemap-index.xml`, and its child sitemap return HTTP 200. The child contains 2,779 URLs. The Truckee hub returns HTTP 200, shows all 24 choices and the new guide, and has a self-canonical. All six retained reaches return HTTP 200 with self-canonicals and sitemap entries. All 18 consolidated routes return HTTP 200 with an instant exact-card meta refresh and the Truckee hub canonical; none appears in the sitemap. Search Console has not been resubmitted and no URL Inspection indexing request was made.
