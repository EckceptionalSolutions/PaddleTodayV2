# Floyds Fork route-family review — Kentucky — 2026-10-07

## Search Console evidence

For April 28–October 4, 2026, the Search Console performance report filtered to Floyds Fork showed 17 clicks, 750 impressions, 2.3% CTR, and average position 7.6 across 25 rows. The rows include route pages, host aliases, and hub forms. All 17 clicks came from six route pages:

| Route | Clicks | Impressions | Decision |
| --- | ---: | ---: | --- |
| Creekside–Fisherville | 7 | 262 | Keep: KDFWR adjacent leg and search performer |
| North Beckley–Creekside | 6 | 118 | Keep: KDFWR adjacent leg and search performer |
| Fisherville–Cane Run | 1 | 61 | Keep: KDFWR adjacent leg and search performer |
| Broad Run Valley–Cliffside | 1 | 44 | Keep: KDFWR adjacent leg and search performer |
| Creekside–Cliffside | 1 | 26 | Keep: click-bearing extended route |
| Cane Run–Broad Run Valley | 1 | 19 | Keep: click-bearing two-leg trip |

Search Console also lists Fisherville–Cliffside as crawled but currently not indexed (last crawl September 20). Its declared canonical is self; crawling and indexing are allowed, and fetch succeeded. The live URL test says the page is available to Google and can be indexed. Its reported referring page is a retired Barren River Tailwater–VPA #3 URL, which now redirects to the current Barren River planner. The current Barren planner does not link to Floyds Fork, so that referral appears historical rather than a current cross-river link defect.

## Route-page decision

The hub has 21 endpoint combinations. Keep 13 standalone guides:

- **Six adjacent access legs listed by KDFWR:** North Beckley–Creekside; Creekside–Fisherville; Fisherville–Cane Run; Cane Run–Seaton Valley; Seaton Valley–Broad Run Valley; Broad Run Valley–Cliffside.
- **Five longer Parklands routes:** North Beckley–Fisherville; North Beckley–Cane Run; North Beckley–Seaton Valley; North Beckley–Broad Run Valley; North Beckley–Cliffside.
- **Two additional routes with Search Console clicks:** Creekside–Cliffside and Cane Run–Broad Run Valley.

Consolidate the other eight pages to their exact selections on the Floyds Fork hub:

- Fisherville–Seaton Valley
- Creekside–Cane Run
- Creekside–Seaton Valley
- Creekside–Broad Run Valley
- Fisherville–Broad Run Valley
- Fisherville–Cliffside
- Seaton Valley–Cliffside
- Cane Run–Cliffside

All 21 endpoint choices remain on the hub, with their route-specific mileage, access, gauge, and hazard details. This reduces repeated standalone pages while preserving the user's ability to select any put-in and take-out. The two longer routes with clicks remain available as full guides even though their endpoints overlap other named options.

## Source and condition context

KDFWR lists six successive access legs and their mileage. Its current fish-and-boating page gives a 50–300 cfs / 1.3–2.5 ft recommendation at the Fisherville gauge; its education article describes a broader 35–500 cfs recreation range. These are agency recommendations, not safety guarantees. Because the sources provide different ranges, the hub names both sources instead of blending them into one universal threshold.

The Parklands' recommended-route map names five longer North Beckley trips. Its current paddling page says to use marked landings and posts current access notices; it showed a Seaton Valley-area closure at review time. The hub links users to the current notice page and tells them to verify access, gauge, and shuttle before launching. The two official sources differ slightly on some adjacent-leg mileages, so the individual route pages retain the source associated with their exact endpoint pair.

Sources:

- KDFWR, [Floyds Fork access and levels](https://fw.ky.gov/Fish/Pages/Floyds-Fork.aspx)
- KDFWR, [Floyds Fork education guide](https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx)
- The Parklands, [recommended-route map](https://theparklands.org/app/uploads/2020/11/TheParklands_PaddlingMap_Public.pdf)
- The Parklands, [current paddling information and access notices](https://theparklands.org/find-an-activity/paddling/)

## Implementation and verification

The hub now leads with the source-named sections, distinguishes the two KDFWR flow recommendations, and surfaces The Parklands' landing and notice guidance. Eight retired route pages resolve to the matching hub selections. Search Console settings remain unchanged; no sitemap submission or URL Inspection indexing request was made.

The full production build and typecheck passed. The built-page indexability audit found 2,811 sitemap URLs, all 21 Floyds Fork trip cards, all 13 retained route pages in the sitemap and hub guide, and all eight exact selected-card fallback targets outside the sitemap. The audit reported no orphaned public pages, missing state or hub links, duplicate route headings or descriptions, errors, or warnings. The seven unrelated legacy 404 paths also have matching redirect rules in the 4,332-byte Azure configuration.

Commit `242c61d1e636b63d254e37ec46c58919580da42b` is deployed. Frontend [workflow 37683036826](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37683036826), API [workflow 37683036854](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37683036854), and Snapshot Worker [workflow 37683036825](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37683036825) all succeeded. Live production checks matched the candidate: the sitemap index and child return HTTP 200 with 2,811 URLs; the Floyds Fork hub returns HTTP 200 with 21 trip cards; all 13 retained guides return HTTP 200 with self-canonicals and sitemap entries; and all eight consolidated paths preserve their exact hub selection in their instant meta-refresh fallback pages and stay out of the sitemap. All seven legacy paths return the intended HTTP 301 to their replacement hubs for both slash and non-slash forms.

This change targets page selection and user discovery; it cannot guarantee indexing or ranking recovery. Search Console settings remain unchanged; no sitemap submission or URL Inspection indexing request was made.
