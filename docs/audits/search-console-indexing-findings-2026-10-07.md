# Search Console indexing findings — October 7, 2026

## Current report snapshot

Search Console’s Page indexing report was last updated October 3. It showed 3.82K not-indexed URLs across seven reasons and 836 indexed URLs:

| Reason | URLs |
| --- | ---: |
| Discovered – currently not indexed | 2,171 |
| Alternate page with proper canonical tag | 1,081 |
| Crawled – currently not indexed | 450 |
| Not found (404) | 57 |
| Page with redirect | 53 |
| Excluded by `noindex` | 9 |
| Duplicate, Google chose different canonical | 2 |
| Blocked by 403 | 0 |

The sitemap report showed `https://paddletoday.com/sitemap-index.xml` as **Success**, with 3,249 discovered pages. Search Console listed it as submitted October 7 and last read September 29. `robots.txt` points to this sitemap index. The earlier `/sitemap.xml` address is not the submitted sitemap; there is no evidence here of a broken sitemap endpoint.

## URL inspections

Two recent “Crawled – currently not indexed” examples were inspected:

- `/rivers/volga-river-osborne-mederville/` was last crawled October 4. Google reported crawl allowed, successful fetch, indexing allowed, and a user-declared canonical matching the URL. The displayed referring pages were the Split Rock Creek route and Pine River hub. Neither current page contains a link to the Volga URL, so those referrer examples appear stale or historical; they do not establish a current broken internal link.
- `/rivers/buffalo-river-ponca-steel-creek/` was last crawled October 4 and likewise had a successful fetch, crawl and indexing allowed, and a matching user-declared canonical. Its displayed referring page was a Mulberry River route. This is a source-backed Buffalo float, but Search Console does not expose a technical block explaining its exclusion.

The Search Console Performance filter for the three Volga River route URLs showed 8 impressions, 0 clicks, and average position 6.8 from April 28 through October 5. That is a small sample, but it is enough to avoid treating this three-section family as an obvious consolidation target based only on zero impressions.

The same report showed 291 impressions, 5 clicks, and average position 6.5 for the Big Sioux route URL pattern. Although `big-sioux-river-farm-field-rotary` appeared in the crawled-not-indexed examples, the family-level signal argues against consolidating or removing the whole river’s route pages as one unit.

These samples point to Google’s selection of pages for indexing, rather than a fetch, robots, or self-canonical failure. They do not prove that content similarity is the only cause.

## External reference signal

Search Console’s Links report listed 185 external links from four sites: `google.com` (172), `apple.com` (7), `chrome-stats.com` (5), and `eckceptionalsolutions.com` (1). The top linked URLs were the homepage and privacy page. This report is sampled and is not a complete backlink census, but it shows very few independent paddling, tourism, or public-land references in Google’s current link data. That is a plausible sitewide authority gap alongside the route-page selection issue; it is separate from sitemap health and crawl access.

## Other exclusion samples

- The 1,081 “Alternate page with proper canonical” URLs include route-hub query selections such as `/rivers/by-river/bryant-creek/?route=...` and prefilled request forms such as `/request-river/?state=Iowa`. These are expected variants when the canonical points to the clean base page.
- Nine sampled URLs from the 57-page 404 report now return 301 redirects to current route or hub URLs. Examples include old Green River, Minnehaha Creek, Kansas River, Juniata, French Creek, and Big Eau Pleine paths. This suggests the sample report includes aliases already repaired; it is not evidence that those paths still return 404 today.
- The report’s 53 redirects are consistent with canonical route consolidation and host/path aliases. The 0 blocked-by-403 count rules out a broad access-forbidden issue in this snapshot.

## October 8 live sample of crawled-not-indexed URLs

The report showed 450 crawled-not-indexed URLs under All known pages and 324 under All submitted pages. I checked the ten visible examples against production HTML and the current child sitemap. Six are still current URLs (five route pages and the Ouachita hub); each returned 200, allowed indexing, used a matching canonical, and appeared in the current sitemap. This sample does not show a broad robots, canonical, or sitemap failure for active pages.

Four other examples had already been consolidated and are no longer in the current sitemap: Wabash Linn Grove–White Bridge, Goose Creek Jacks Dump–Hollow, Green River American Legion–Greensburg, and Eleven Point Greer Crossing–Riverton. Their old URLs return the existing “Trip moved” response with an immediate meta refresh to the relevant river hub. The Boone River `www` variant redirects once to the apex hostname, whose page has a self-canonical. Search Console’s submitted-page sample therefore includes historical URLs alongside currently submitted pages; its counts should not be read as a live inventory of current sitemap entries.

The active examples remain eligible to index, but Search Console gives no fetch-level reason for excluding them. Their shared route-page template and thin route distinctions remain a stronger improvement area than sitemap repair; consolidation should still be selective and based on whether the river’s sections have distinct conditions, hazards, or access logistics.

## Internal-linking change

The route-detail template labeled the four closest routes on any other river as “nearby,” with no distance limit. That could present distant trips as nearby and add cross-river links without much local relevance. The current public route catalog contains 2,704 route records; coordinate analysis found at least one different-river option within 75 straight-line miles for 2,517 of them. The route detail page now shows at most four such options within 75 miles and labels the distance as straight-line. Same-river, state, and region navigation remains available when no cross-river option meets that radius.

This is a user and internal-link relevance improvement. It is not presented as a confirmed explanation for the indexing totals or traffic decline. Route-family consolidations, including the October 7 Penobscot update, address the larger pattern of overlapping route pages while keeping trip choices and their local planning notes on the river hub.

No sitemap submission, URL Inspection indexing request, or Search Console validation request was made.

## Bartram Canoe Trail route-family review — October 8, 2026

The Bartram Canoe Trail has 13 route choices in one Mobile–Tensaw Delta system. Search Console Performance showed zero clicks and impressions for `/rivers/bartram-` URLs from April 28 through October 5. Its Page indexing report had not discovered the Bartram hub and one route, while another route was reported as unknown to Google. The hub and route inspection records showed no referring page and no prior crawl.

Those stored discovery results do not match the current site graph: the Bartram hub and route pages return 200, are index-follow with self canonicals, and appear in the current sitemap; the Alabama state page and Bartram hub link to the trip cards. Google’s October 8 live test said the Globe Creek route was available and eligible to index. This sample does not identify a current sitemap, robots, or internal-link defect, and it does not explain why Google has not crawled the stored examples.

The 13 standalone route URLs now lead to their corresponding trip cards on `/rivers/by-river/bartram-canoe-trail-alabama/`. All 13 route choices remain available with their separate mileage, waterway, access, gauge, safety, and overnight details. The official brochure documents meaningful differences among routes, including three French’s Lake–Hubbard Landing itineraries: a 6.8-mile Globe Creek day trip, an approximately 11-mile Canal Island platform overnight, and a 16-mile Spoonbill Sandbar campsite overnight. Consolidation reduces the number of indexable landing pages without collapsing these materially different trip plans into one card.

This is a page-selection and site-structure improvement based on low observed search demand, shared geography, and the existing hub’s trip-specific content. It is not evidence that content similarity alone caused the broader indexing or traffic decline.

## October 8 sample of discovered-not-indexed URLs

Search Console’s report, last updated October 3, showed 2,171 “Discovered – currently not indexed” URLs. Its first ten examples were all-known routes with no recorded crawl. The Allagash Falls–Twin Brook route is one example. Its current production page returns 200, is index-follow with a matching canonical, appears in `sitemap-0.xml`, and is linked from the Allagash river hub. It is a source-backed 14-mile lower-river planning itinerary with rapids and remote-access cautions; the [Maine DACF Allagash guide](https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/aww-guide.pdf?20239131=) lists an 8-mile falls-to-Twin-Brook segment and a 6-mile Twin-Brook-to-Allagash-Village segment. This sample has no current sitemap or internal-link defect to fix.

Another representative example, the Saco River First Bridge–Smith-Eastman composite, was “URL is unknown to Google,” with no referring sitemap or page and no prior crawl in stored inspection data. Its October 8 live test said the URL was available and eligible for indexing. The current production URL returns 200, has a self-canonical and `index, follow`, appears in the sitemap, and has a direct link from its Saco hub. As with Bartram, the stored discovery attribution does not match the current sitemap and HTML link graph.

## Saco River (New Hampshire) route-family review — October 8, 2026

For April 28–October 5, 2026, Search Console Performance showed zero clicks and impressions for both the `/rivers/saco-river-` route prefix and the `/rivers/by-river/saco-river-new-hampshire/` hub. The family contains ten route pages built around five access points; several are longer combinations of the same connected reaches. Search Console’s URL Inspection for the First Bridge–Smith-Eastman composite showed “URL is unknown to Google,” no referring page or sitemap, and no previous crawl, while its live test and current production checks found the page available to Google, indexable, linked from the hub, and present in the sitemap.

Seven additional endpoint-pair URLs now lead to their exact trip cards on the river hub. The cards remain available with their distances, intermediate exits, and access notes. Three source-documented routes remain standalone: Bartlett–Cooks Crossing (Wilderness Portal, 5.3 miles, Class I–II), First Bridge–Davis Park (AMC, 8.5 miles, Class I), and Davis Park–Smith-Eastman (AMC, 2.5 miles, Class II). The hub now explains the two Conway reaches, the Powerline Rapid take-out boundary, and current access checks.

This selective change removes repeated landing pages while preserving named routes that have direct source support and materially different skill or waterway context. The zero-impression observation and indexing state do not prove that duplication caused the family’s search performance or the wider traffic decline.

## Search Console penalty check and route-family demand screen — October 8, 2026

Search Console’s Manual actions and Security issues reports both showed “No issues detected.” This rules out a reported manual penalty or security compromise in these reports, but it does not rule out algorithmic ranking changes or weak site authority.

I screened three high-count Iowa/Minnesota families over April 28–October 5. Cedar River (Iowa, 27 public routes) had 10 clicks and 446 impressions across 24 reporting URLs; six route pages accounted for all ten clicks. Minnesota River (19 routes) had 15 clicks and 560 impressions, with six click-bearing route pages. Sauk River (21 routes) had 7 clicks and 295 impressions. These figures support preserving the route-specific landing pages that already earn visits and argue against blanket consolidation of the entire river families.

The Erie Canal group is a better candidate for a structural review: its catalog has 37 public route records, including seven planning-only proxy-gauge routes. Production sitemap and hub checks confirm that the 30 indexable routes are linked from the hub and listed in the sitemap; the seven planning-only routes are correctly omitted. The 30 indexable Erie Canal route URLs had zero Search Console clicks and impressions in the same six-month window. The shared `erie-canal` group spans the Erie Canal and connected Mohawk, Seneca, and Oneida waters, with distinct locks, access points, and navigation hazards. This suggests reviewing regional or waterbody-level hub organization, while retaining the official section details; it does not support merging all routes into one undifferentiated itinerary.

## Redirect delivery follow-up — October 8, 2026

Production checks of current Search Console crawled-not-indexed examples found that the retired Wabash Linn Grove–White Bridge, Green River American Legion–Greensburg, and Eleven Point Greer Crossing–Riverton URLs still returned HTTP 200 pages with immediate meta refreshes to their exact trip cards on the current river hubs. The destinations and card anchors exist, and the retired paths are absent from the current sitemap. A comparable retired Goose Creek route already returns an HTTP 301.

Added exact HTTP 301 rules for those three known retired URLs in `staticwebapp.config.json`, pointing to their matching hub trip-card anchors. Commit `85e5c6ca9` deployed successfully in frontend workflow [37749970891](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37749970891). The config is 15,545 bytes, below Azure Static Web Apps’ documented 20 KB configuration limit. Production checks confirmed that all six slash and no-slash forms return one 301 to the matching hub/card fragment; each destination returns 200 and contains its target card anchor. Following each retired URL ends at the hub with exactly one redirect. No Search Console indexing request or validation action was made.

## Erie Canal live-fetch and retired-route redirect audit — October 8, 2026

Search Console's stored inspection for `/rivers/erie-canal-fairport-bushnells-basin/` says “Discovered – currently not indexed,” with no referring page and no previous crawl. Its live URL test on October 8 reported that the URL is available to Google: Google Inspection Tool smartphone fetch succeeded, crawling and indexing are allowed, and the user-declared canonical matches the URL. Search Console had not completed a live discovery check, and its broader Page indexing report was last updated October 3.

Production HTML checks on the Fairport–Bushnell’s Basin and Brockport–Holley route pages found HTTP 200, `index, follow`, and matching self-canonicals. Both URLs are present in the Erie Canal child sitemap and have exact standard `<a href>` links on the Erie Canal hub. This second route was checked against production HTML and sitemap; it was not separately live-tested in Search Console. The sampled Erie routes therefore show no current sitemap omission, missing hub link, canonical mismatch, robots block, or failed Google fetch that would explain their stored discovery statuses.

As a broader redirect-delivery check, all 77 exact river redirect rules in the deployed static web app configuration returned HTTP 301 with the configured target. No mismatch or failed route was found in that set. This confirms that the three retired-route soft-refresh cases were a small, fixed exception rather than a widespread redirect-delivery failure among configured exact river redirects.

Together, the samples point away from a current sitewide sitemap, internal-link, robots, or fetch defect. The stored GSC discovery data can lag behind the live graph and live-fetch result. The broader indexing gap remains a page-selection problem without a single identified technical blocker; selective reduction of overlapping route landing pages and better-organized river hubs remain the active improvement path. No URL indexing request, sitemap submission, or validation action was made.
