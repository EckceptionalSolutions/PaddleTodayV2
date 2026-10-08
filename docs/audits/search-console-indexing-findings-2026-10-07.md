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

These samples point to Google’s selection of pages for indexing, rather than a fetch, robots, or self-canonical failure. They do not prove that content similarity is the only cause.

## External reference signal

Search Console’s Links report listed 185 external links from four sites: `google.com` (172), `apple.com` (7), `chrome-stats.com` (5), and `eckceptionalsolutions.com` (1). The top linked URLs were the homepage and privacy page. This report is sampled and is not a complete backlink census, but it shows very few independent paddling, tourism, or public-land references in Google’s current link data. That is a plausible sitewide authority gap alongside the route-page selection issue; it is separate from sitemap health and crawl access.

## Other exclusion samples

- The 1,081 “Alternate page with proper canonical” URLs include route-hub query selections such as `/rivers/by-river/bryant-creek/?route=...` and prefilled request forms such as `/request-river/?state=Iowa`. These are expected variants when the canonical points to the clean base page.
- Nine sampled URLs from the 57-page 404 report now return 301 redirects to current route or hub URLs. Examples include old Green River, Minnehaha Creek, Kansas River, Juniata, French Creek, and Big Eau Pleine paths. This suggests the sample report includes aliases already repaired; it is not evidence that those paths still return 404 today.
- The report’s 53 redirects are consistent with canonical route consolidation and host/path aliases. The 0 blocked-by-403 count rules out a broad access-forbidden issue in this snapshot.

## Internal-linking change

The route-detail template labeled the four closest routes on any other river as “nearby,” with no distance limit. That could present distant trips as nearby and add cross-river links without much local relevance. The current public route catalog contains 2,704 route records; coordinate analysis found at least one different-river option within 75 straight-line miles for 2,517 of them. The route detail page now shows at most four such options within 75 miles and labels the distance as straight-line. Same-river, state, and region navigation remains available when no cross-river option meets that radius.

This is a user and internal-link relevance improvement. It is not presented as a confirmed explanation for the indexing totals or traffic decline. Route-family consolidations, including the October 7 Penobscot update, address the larger pattern of overlapping route pages while keeping trip choices and their local planning notes on the river hub.

No sitemap submission, URL Inspection indexing request, or Search Console validation request was made.
