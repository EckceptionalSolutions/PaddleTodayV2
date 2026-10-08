# Saco River (New Hampshire) route-family review — October 8, 2026

## Finding

The New Hampshire Saco family has ten route records built around Bartlett, Cooks Crossing, First Bridge, Davis Park, and Smith-Eastman. Six were public route pages; four routes involving Cooks Crossing were already withheld because the stored point identified the area, not a verified public landing. The route prefix and hub showed zero Search Console clicks and impressions during April 28–October 5, 2026.

Four published endpoint-pair URLs now lead to their exact trip cards on the river hub. They include longer combinations and alternate starts built from the same access chain; the trip options and their route-specific details remain available there. Two named Conway reaches remain standalone because AMC documents them as separate day trips with distinct skill context:

- First Bridge–Davis Park: 8.5 miles, Class I, documented by Appalachian Mountain Club (AMC).
- Davis Park–Smith-Eastman: 2.5 miles, Class II, with Conway Rips and Powerline Rapid, documented by AMC.

The four Cooks Crossing URLs now lead to the Saco section guide rather than to trip-card anchors for routes that are not in the public catalog. The hub summarizes Wilderness Portal's 5.3-mile Class I–II Bartlett–Cooks Crossing listing, but makes clear that the route stays out of the trip picker until a lawful public take-out and carry are verified. It also explains that the Davis Park–Smith-Eastman reach has no easy take-out before Powerline Rapid and directs paddlers to confirm current Conway parking, posted hours, and water entry.

## Search Console and live-page checks

For April 28–October 5, 2026, the route-prefix filter `/rivers/saco-river-` and exact hub filter `/rivers/by-river/saco-river-new-hampshire/` each showed zero clicks and impressions.

URL Inspection for `/rivers/saco-river-first-bridge-smith-eastman/` reported “URL is unknown to Google,” no referring sitemap or page, and no prior crawl. The October 8 live test said the URL was available to Google and eligible for indexing. Before the consolidation release, production checks found a `200` response, self-canonical, `index, follow`, a sitemap entry, and a direct link from the river hub.

This discrepancy means the stored Search Console discovery attribution does not match the current page graph for this sample. It does not establish why Google had not discovered, crawled, or selected the URL.

## Source-backed distinctions

- AMC describes First Bridge–Davis Park as an 8.5-mile Class I day trip. It notes that shallow water can limit maneuverability and high water can strengthen the current.
- AMC describes Davis Park–Smith-Eastman as a 2.5-mile Class II trip with Conway Rips and Powerline Rapid. It warns that there is no easy take-out before Powerline and recommends the section only for paddlers comfortable with whitewater.
- Wilderness Portal describes Bartlett–Cooks Crossing as a distinct 5.3-mile Class I–II reach, but the catalog's Cooks Crossing point is a hamlet-area coordinate. No current town or land-manager source reviewed verifies the public landing, parking, and carry there, so all four Cooks Crossing route records remain withheld.
- Conway’s public-use rules list First Bridge, Davis Park, and Smith-Eastman as town properties. Users should still check current posted hours, parking, access, and water entry.
- Longer route cards remain selectable as planning options; their intermediate exits and access uncertainties remain attached to each card. Four former Cooks Crossing URL paths now point to the section guide without implying those routes are available.

## Limits

Zero impressions for this small family do not prove why the pages were not indexed or explain the site-wide decline. Consolidation is a page-selection and organization decision supported by overlapping endpoint combinations; withholding the Cooks Crossing routes addresses an access-verification issue. Neither action is a confirmed diagnosis of Google’s ranking system.

## Sources

- Appalachian Mountain Club, [5 Easy Day Paddles on the Saco River](https://www.outdoors.org/resources/amc-outdoors/destinations-travel/5-easy-day-paddles-on-the-saco-river/)
- Town of Conway, [Public Use of Town Property](https://ecode360.com/29475968)
- Wilderness Portal, [Saco River: Bartlett to Cooks Crossing](https://www.wildernessportal.com/routes/saco-river-bartlett-to-cooks-crossing)
- Search Console Performance and URL Inspection reports, April 28–October 8, 2026.
