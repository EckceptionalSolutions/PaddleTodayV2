# Search recovery weekly check â€” October 26, 2026

Authenticated Search Console access worked. No production modifications, live inspection tests, validation submissions, or indexing requests were made. Structured evidence is in `search-recovery-weekly-2026-10-26.json`.

## Complete weekly comparison

Web search, all queries/countries/devices, October 18â€“24 versus October 11â€“17. Exact dates verified in the comparison dialog; report updated three hours earlier. Reviewed all 73 page rows, without using query rows as complete totals.

| Metric | Current | Previous |
|---|---:|---:|
| Clicks | 1 | 2 |
| Impressions | 52 | 41 |
| CTR | 1.9% | 4.9% |
| Average position | 29.2 | 15.5 |

Impressions rose 26.8%, while clicks fell by one. The current click was Big Sioux Highway 42â€“Grandview, outside the fixed cohort. This tiny sample does not establish meaningful recovery or a new ranking regression; aggregate position is sensitive to changing query mix. It also breaks the consecutive weekly impression declines documented October 19, so do not label this two new complete comparisons without progress.

## Fixed cohort

Values are current / previous. All nine original river URLs were preserved. No cohort page received a current click. Six routes were absent in both periods across all 73 page rows: Little Miami Kelleyâ€“Milford, Namekagon Big Bendâ€“Trego, Ouachita Remmelâ€“Whitewater Park, Big River Mammothâ€“Merrill Horse, St. Croix Sand Creekâ€“Highway 70, and Lower Yough Ohiopyleâ€“Bruner Run. These have zero reported activity, not verified zero search demand; CTR/position are undefined with no impressions.

| Page | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| Homepage | 0 / 1 | 9 / 10 | 0% / 10% | 2.3 / 10 |
| Milwaukee West Bendâ€“Quaas Creek | 0 / 0 | 6 / 4 | 0% / 0% | 1 / 1 |
| Namekagon County Kâ€“Whispering Pines | 0 / 0 | 2 / 0 | 0% / â€” | 45 / â€” |
| James H.L. Kerrâ€“Ralph Cox | 0 / 0 | 0 / 1 | â€” / 0% | â€” / 36 |

Cohort page-row impressions total 17 versus 15; river pages alone 8 versus 5. These are separate from property totals and too small to establish broad recovery.

## Refreshed indexing snapshot

Report date October 22. Comparison is with the October 11 snapshot captured in `fresh-google-search-audit-2026-10-19.md`, which superseded last week's initial browser-access failure.

| All known pages | Oct 22 | Oct 11 |
|---|---:|---:|
| Indexed | 670 | 754 |
| Discovered, not indexed | 1,521 | 1,603 |
| Crawled, not indexed | 577 | 521 |
| Alternate canonical | 1,046 | 1,074 |
| Not found | 91 | 65 |
| Redirect | 95 | 63 |
| Noindex | 22 | 10 |
| Google chose different canonical | 2 | 2 |
| Forbidden | 1 | 0 |

Submitted pages currently show 544 indexed, 1,521 discovered-not-indexed, 353 crawled-not-indexed, 23 alternate canonicals, five 404s, one different canonical, and one forbidden. Indexed submitted URLs declined from 590 to 544; crawled exclusions rose from 298 to 353. All-known indexed URLs fell 84 (11.1%). This is a material selection/count change worth tracking, but ongoing deliberate publication changes prevent attributing the whole decline to an indexing defect.

All-known crawled validation says Failed; discovered Started; forbidden Passed from September 21 despite its one current example. Submitted forbidden says Not Started. No validation was initiated here.

## Bounded crawl and canonical checks

- Little Miami is indexed and was crawled successfully by Googlebot smartphone October 24 at 2:52:49 PM as displayed. Crawl and indexing are allowed, both canonicals match, and the sitemap index is now listed. Its absent weekly impressions do not establish deindexing.
- The one forbidden example is Pine River Petersonâ€“Low Bridge. Stored inspection still records a June 3, 4:45:11 PM forbidden fetch, with no canonical available. The current public response is 200/self-canonical/index-follow. This historical failure is not a demonstrated current block; a general browser-user-agent request cannot prove Googlebot accessibility.
- Des Moines Highway 30â€“Sportsman remains unindexed with Google selecting Redwood Vestaâ€“Wabasso. Its successful, allowed crawl is still September 30 at 1:54:37 AM. This does not show that Google repeated the mismatch after recent content changes. Keep the outstanding recrawl check; no new canonical fix is established by the old snapshot.

## Public technical health and publication context

Homepage and all nine fixed routes return 200/self-canonical/index-follow. Cedar Chain Lakesâ€“Ellis Harbor also passes. A unique invalid river URL returns actual 404 with noindex/follow. Robots, sitemap index and child return 200; the child now contains 2,448 URLs, versus 2,509 last week. No sampled network failures occurred.

American Harringtonâ€“Watt has changed from a hub-canonical transition page to a self-canonical noindex trip-detail page. Main commit `e0a10715b` (October 21, PR #118) deliberately gives every supported trip a detail page; `docs/seo-route-publication-policy.md` separates trip availability from independent search publication. The live noindex on this former hub option is consistent with that policy, not an accidental noindex on one of the fixed former winners. Do not request indexing for it automatically.

HTTP apex and HTTPS www root return 301 to HTTPS apex; the sampled www route preserves path and query. Normal hostname/trust validation passes on both certificates. Apex expiry remains January 6, 2027 at 21:21:27 GMT; www expiry March 21, 2027 at 23:59:59 GMT. No renewal action is indicated.

## Assessment

There is still no meaningful traffic recovery. Notify for the refreshed indexed-page decline and higher crawled exclusions, with the publication-change caveat. Sampled technical checks found no current repair to perform. Continue tracking retained guides separately from intentionally noindex trip pages and consolidated aliases; expand the retained submitted-page exclusion sample on a subsequent investigation if the indexed decline continues. The substantive editorial and independent-review priorities in the October 19 audit remain applicable. No recovery date is promised.
