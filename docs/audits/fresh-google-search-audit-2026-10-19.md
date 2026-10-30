# Fresh Google Search audit — October 19, 2026

## Conclusion

There is still no meaningful search recovery. Authenticated Search Console access worked during this audit, superseding the access limitation recorded in this morning's automated check. The latest complete performance data runs through October 17.

The evidence supports two separate problems: very weak rankings on retained, indexed pages, and Google's limited selection/crawling of the larger published catalog. A broad automated assessment of the site's route content remains a plausible explanation, alongside a pronounced lack of independent editorial references. Google's internal cause is unknown. This audit did not establish a manual penalty, a current sitewide crawl block, or a guarantee that any particular change will restore rankings.

The previous technical changes are substantially present in production. Further sitemap tweaks and title changes alone are unlikely to address the main remaining problem. The next substantial work should concentrate on demonstrably useful, independently reviewed route guides and river hubs, starting with former winners.

## Fresh performance evidence

Search Console Web search, all queries, countries and devices. Dates were verified in the date comparison dialog; CSV exports are saved under `output/seo-audit-2026-10-19/`.

| Metric | Sep 20–Oct 17 | Aug 23–Sep 19 | Change |
|---|---:|---:|---:|
| Clicks | 4 | 10 | −60.0% |
| Impressions | 282 | 366 | −23.0% |
| CTR | 1.4% | 2.7% | −1.3 percentage points |
| Average position | 27.0 | 35.1 | Mix-dependent |

Both periods are after the August collapse. Compared with the saved July 26–August 22 baseline of 832 clicks and 25,014 impressions, current totals remain approximately 99.5% and 98.9% lower respectively. The baseline includes several days of the original decline and is not a seasonally controlled comparison.

The latest complete week, **October 11–17 versus October 4–10**, produced **2 versus 1 clicks, 41 versus 64 impressions, 4.9% versus 1.6% CTR, and position 15.5 versus 23.3**. Impressions declined another 35.9%, following the previous week's 45.8% decline. One current click went to the homepage and one to the Eau Claire River hub. These tiny samples and shifts in query mix cannot establish broad ranking recovery.

The original fixed cohort of nine river pages remains unchanged. All nine had zero clicks in both 28-day periods. Their page-row impressions total **30 now versus 63 previously**, down 52.4%; the saved baseline totaled 5,560. These page sums are separate from property totals.

| Retained route | Current / previous 28-day impressions |
|---|---:|
| Little Miami Kelley–Milford | 12 / 27 |
| Namekagon Big Bend–Trego | 1 / 3 |
| Milwaukee West Bend–Quaas Creek | 4 / 7 |
| Ouachita Remmel–Whitewater Park | 2 / 5 |
| Namekagon County K–Whispering Pines | 2 / 4 |
| Big River Mammoth–Merrill Horse | 3 / 9 |
| St. Croix Sand Creek–Highway 70 | 0 / 2 |
| Lower Yough Ohiopyle–Bruner Run | 0 / 1 |
| James H.L. Kerr–Ralph Cox | 6 / 5 |

Little Miami's average position moved from 35.41 to 63.83 in this comparison. These are the same page but potentially different queries; they are not fixed-query rank measurements. Zero impressions give no meaningful position.

## Production crawl: all 2,509 sitemap URLs

Fetched the live sitemap index and child, then every URL with four concurrent requests. Initial results: 2,508 HTTP 200 responses and one transient fetch failure for Iowa River Marengo–Amana. A separate retry returned 200 with the expected title, H1 and self-canonical. Initial evidence retains the failure; the follow-up records its resolution.

- Catalog: **2,065 standalone route pages, 382 river hubs, 48 state pages plus the state directory, and 13 other pages**.
- Every successfully fetched sitemap page had a matching single canonical, allowed indexing, one H1, a title and one description. No sitemap page redirected or used an instant meta refresh. The retried Iowa page also has its correct route canonical.
- No duplicate titles. **Nine exact duplicate description groups affect 22 river hubs**, including identically named Black, Chippewa, Colorado, Green, James, Salmon, Pine, Rio Grande and Snake rivers. These are modest snippet/locality defects, not sufficient explanations for a 99% traffic loss. Full URL pairs are in `crawl-summary.json`.
- An HTML-link graph traversal from the homepage reaches **all 2,509 sitemap URLs within two clicks**: one homepage, 57 pages at depth one, and 2,451 at depth two. This establishes discoverable paths through the fetched HTML; it does not establish how Google prioritizes them or that every link is prominent to users.
- A unique invalid river path returns a genuine 404. Robots, sitemap index and child return 200.
- The sampled intentionally consolidated American Harrington–Watt URL returns the existing immediate meta-refresh page and canonicalizes to the American River hub. It is outside the current sitemap. This is an intentional transition rather than an accidental canonical defect.

Search Console independently reports **sitemap Success, last read October 17, with 2,509 discovered pages**, matching production. The October 8 sitemap freshness discrepancy has cleared. URL Inspection's separate “Temporary processing error” discovery field still appears on some pages; it does not override a successful fetch or this current sitemap report.

## What Google currently indexes

The Page indexing report is **last updated October 11**, eight days before this audit. Its snapshot differs from both today's live catalog and individual stored inspections.

| Category | All known URLs | Submitted URLs |
|---|---:|---:|
| Indexed | 754 | 590 |
| Discovered, currently not indexed | 1,603 | 1,603 |
| Crawled, currently not indexed | 521 | 298 |
| Alternate canonical | 1,074 | 24 |
| Not found | 65 | 5 |
| Redirect | 63 | — |
| Noindex | 10 | — |
| Google chose a different canonical | 2 | 1 |
| Forbidden | 0 | 0 |

Submitted totals are 590 indexed and 1,931 not indexed, reflecting a 2,521-URL report snapshot. Dividing those counts by today's 2,509 sitemap URLs would mix dates. Historical aliases and deliberate consolidation also affect all-known counts.

Compared with the October 8 snapshot documented last week, all-known indexed URLs moved only **755 → 754**, discovered exclusions **1,604 → 1,603**, and crawled exclusions **526 → 521**. This is near stability, not a new wave of deindexing. It is also not recovery.

### Inspected examples

**Little Miami Kelley–Milford:** indexed, last crawled **October 18 at 7:01:40 AM as displayed**, smartphone fetch successful, crawling/indexing allowed, declared and Google canonicals match. Today's Google live test passed at **2:54 PM Central**. Its tested HTML contains the new reach-specific title and description, the Milford gauge reading of 5.16 ft, score 69, forecast and explanation. Thus Google can render the live data on this tested page, and Google has recently revisited the page while its search visibility remains very weak. This sample rules out delayed discovery or a current rendering block as a sufficient explanation for this former winner.

**Volga Klock's Island–Heron Road:** still crawled-not-indexed. Last crawl October 10 at 3:55:14 AM as displayed; smartphone fetch successful, crawling/indexing allowed, matching declared and Google canonical. Current production returns 200, self-canonical, and appears in the current sitemap/link graph. It is eligible but not selected for indexing. This single example does not prove why Google excluded it.

**Des Moines Highway 30–Sportsman:** not indexed because Google selected **Redwood River Vesta–Wabasso**, an unrelated Minnesota route, as canonical. The saved September 30 crawl succeeded and allowed indexing while declaring the correct Des Moines URL. Today's live pages return 200 with different route names, endpoints, states, summaries and correct self-canonicals. The stored selection predates the current October 16 deployment. This warrants a focused review of Google's next crawl and saved/rendered content, rather than treating every different-canonical exclusion as a harmless host variant. It is one affected submitted URL and cannot by itself explain the corpus-wide loss.

## Crawl health and independent recognition

Fresh Crawl Stats through October 17: **19,958 requests over 90 days, 405 ms average response, 95% HTTP 200, 3% 404 and less than 1% 5XX**. Refreshes account for 91%, discovery 9%; JSON is 51%, HTML 29%, and page-resource loads 58%. These rolling totals show Google spending substantial activity on resources/refreshes. They do not prove that resources exhaust a crawl budget. The apex host is labeled “Problems in the past”; this audit did not inspect its daily failure timeline and cannot date or attribute those failures.

Manual actions and Security issues both currently report **No issues detected**. An algorithmic reassessment can occur without a manual action.

The Links report shows **203 external links**, targeting privacy (102), homepage (100) and contact (1). Reported linking sites: google.com (178), apple.com (16), chrome-stats.com (6), foxdata.com (2), and eckceptionalsolutions.com (1). It shows **no route or river-hub editorial references**. This is a sampled Google report, not a complete backlink census, but it remains strong evidence of a recognition gap for a catalog spanning 48 states. The increase from 185 links in the October 5 review has not supplied visible paddling-specific endorsements.

The public Little Miami page already provides useful route-specific access, shuttle, hazard and threshold explanations, identifies its borrowed river-context photograph accurately, and shows a USGS camera. Des Moines and Redwood also have distinct route summaries. The current priority pages are not empty shells. Remaining editorial work should add verifiable information or analysis paddlers cannot get from the linked source alone, and distinguish firsthand observations from desk research. Word count, schema volume and cosmetic date updates are not meaningful substitutes.

## Recommended work, in order

1. **Build a focused group of independently reviewed guides around proven demand.** Start with Little Miami, both Namekagon winners, Milwaukee, Ouachita and their hubs. Preserve their established URLs. Identify the person and actual scope/date of review; verify access logistics and gauge interpretation with the relevant manager or knowledgeable local paddler when feasible. Add original launch/take-out photographs, documented field observations, or genuinely useful comparative analysis where available. Keep unsupported firsthand claims out of the pages. Little Miami already has a specific threshold guide; use that as a starting standard, not another generic paragraph to append everywhere.
2. **Make those guides worth referencing and pursue relevant recognition.** After substantive improvements, identify clubs, outfitters, water-trail managers and tourism resources for possible editorial inclusion or collaboration. This requires real relationships and useful content; app-store links have not supplied that signal. No outreach was sent during this audit.
3. **Keep curation selective and stable.** The live catalog has fallen from 3,249 sitemap URLs on October 5 to 2,509 now. Consolidated trip options can be appropriate, but raw URL reduction has not yet produced demonstrated visibility recovery. Further consolidation should depend on equivalent intent, access, hazards, conditions and observed demand. Retain distinct trip plans and maintain matching redirects. Do not use low impression counts alone to decide which routes disappear.
4. **Investigate the Des Moines canonical selection after recrawl.** Compare Google's captured content with the current route and Redwood page, then verify both rendered identity and canonical signals. The current self-canonical is correct. Escalate if Google repeats this mismatch after fetching the materially distinct current content.
5. **Make small technical refinements at appropriate scope.** Add location/reach distinctions to the 22 duplicate hub descriptions. Consider timestamped server-rendered conditions as resilience and resource-efficiency work, with freshness handling; Google's live test already renders the sampled conditions successfully. Neither refinement warrants claiming it explains the collapse.
6. **Measure stable cohorts and query intent.** Retain the nine original routes as the baseline, follow corresponding hubs separately, and compare fixed queries where there is enough volume. Record actual Google crawl dates after substantive changes. Use four-week windows alongside weekly checks; distinguish ranking recovery, newly indexed pages and deliberately retired aliases. More impressions and non-brand clicks on retained routes are stronger evidence than an improved aggregate position or a smaller sitemap.

## Interpretation, sources and limits

The saved August decline coincides with Google's official [August 18–21 spam update](https://status.search.google.com/incidents/LEubPCm2octf2uMqCFKE). That timing supports investigation of automated ranking assessment; it does not prove this site violated a particular policy. Google's [traffic-drop guidance](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) distinguishes indexing/access failures from broad ranking loss and advises evaluating the affected content. Its [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) emphasizes original value and verifiable expertise. Recovery has no guaranteed date; see [spam-update guidance](https://developers.google.com/search/docs/appearance/spam-updates).

Scope: authenticated performance/indexing/sitemap/link/manual/security/crawl reports; three stored URL inspections; one Google live test with rendered-HTML review; production crawl of the complete current sitemap; sampled retired/invalid URLs; and targeted source review. This was not a complete editorial, backlink, real-user performance or route-safety audit. No current fixed-query competitor ranking benchmark was established. No production code, deployment, sitemap submission, validation, indexing request, removal or outreach was changed.

Structured observations are in `fresh-google-search-audit-2026-10-19.json`. Raw exports, crawl responses, link graph, sampled HTML and reproducible audit scripts are in `output/seo-audit-2026-10-19/`. Earlier working-directory changes were preserved.
