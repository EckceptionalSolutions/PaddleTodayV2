# Search recovery weekly check — October 12, 2026

Authenticated Search Console review and public technical checks. No production changes, validation submissions, or indexing requests were made. Raw technical evidence and structured metrics are in `search-recovery-weekly-2026-10-12.json`.

## Performance

Latest complete seven-day Web period: October 4–10, compared with September 27–October 3. Dates were verified in the comparison dialog. No query filter; all 84 Pages comparison rows were reviewed.

| Property metric | Current | Previous |
|---|---:|---:|
| Clicks | 1 | 0 |
| Impressions | 64 | 118 |
| CTR | 1.6% | 0% |
| Average position | 23.3 | 28.0 |

Impressions declined 45.8%. The one click was to the homepage. Average position improved, but changing query/page mix at this volume prevents interpreting that as broad ranking recovery. Traffic remains extremely low. Last week's impressions rose, so this is not two consecutive complete weekly comparisons without progress. September 28's inaccessible comparison remains incomplete, not zero.

## Fixed baseline cohort

Columns show current / previous. Zero means zero reported activity; four absent rows are flagged. CTR and position are undefined when there are no impressions, even when GSC displays zero.

| Page | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| Homepage | 1 / 0 | 8 / 8 | 12.5% / 0% | 14.1 / 20.9 |
| Little Miami Kelley–Milford | 0 / 0 | 0 / 5 | — / 0% | — / 63.8 |
| Namekagon Big Bend–Trego* | 0 / 0 | 0 / 0 | — / — | — / — |
| Milwaukee West Bend–Quaas Creek* | 0 / 0 | 0 / 0 | — / — | — / — |
| Ouachita Remmel–Whitewater Park | 0 / 0 | 2 / 0 | 0% / — | 29 / — |
| Namekagon County K–Whispering Pines | 0 / 0 | 2 / 0 | 0% / — | 73 / — |
| Big River Mammoth–Merrill Horse | 0 / 0 | 0 / 2 | — / 0% | — / 17 |
| St. Croix Sand Creek–Highway 70* | 0 / 0 | 0 / 0 | — / — | — / — |
| Lower Yough Ohiopyle–Bruner Run* | 0 / 0 | 0 / 0 | — / — | — / — |
| James H.L. Kerr–Ralph Cox | 0 / 0 | 1 / 4 | 0% / 0% | 1 / 12.3 |

*Absent from all 84 rows in both periods; not proof that nobody searched. Cohort page-row impressions total 13 versus 19, down 31.6%; river pages alone total 5 versus 11. These page-row sums do not replace property totals. No river cohort clicks occurred.

## Indexing

Report refreshed to October 8, compared below with the October 3 snapshot documented in the October 8 root-cause follow-up. It is no longer the September 20 snapshot seen in last Monday's weekly check.

| All known pages | Oct 8 | Oct 3 |
|---|---:|---:|
| Indexed | 755 | 836 |
| Discovered, not indexed | 1,604 | 2,171 |
| Crawled, not indexed | 526 | 450 |
| Alternate canonical | 1,077 | 1,081 |
| Not found | 64 | 57 |
| Redirect | 59 | 53 |
| Noindex | 8 | 9 |
| Google chose different canonical | 2 | 2 |
| Forbidden | 0 | 0 |

All-known crawled-not-indexed validation says Failed, discovered validation Started, and forbidden Passed. These are report states, not newly submitted validations. Submitted pages: 590 indexed; 1,604 discovered; 297 crawled; 24 alternate canonical; five 404; one different canonical; zero forbidden. Submitted alternate-canonical validation remains Started.

The indexed count is down 81 (9.7%) from October 3, while crawled exclusions increased 76. This warrants continued monitoring, but recent deliberate catalog consolidation makes raw URL-count decreases ambiguous. The current live child sitemap has 2,521 URLs and returns 200. Do not treat fewer discovered or indexed URLs as recovery or failure without separating retained standalone pages from intentionally consolidated aliases.

Checked all five submitted 404 examples: Buffalo Tyler Bend–Gilbert, Namekagon Springbrook–Big Bend, St. Louis Toivola–County Road 29, Peshtigo Roaring Rapids, and Menominee Piers Gorge. All currently return 200, are self-canonical, and are present in the live sitemap. Their stored crawls are September 12–25; no current 404 repair is indicated by this sample.

## Bounded URL inspections

- Little Miami Kelley–Milford remains indexed, with a successful smartphone crawl October 9 at 9:05:25 PM as displayed. Crawl/indexing allowed; declared and Google canonicals match. Its zero weekly impressions therefore do not establish deindexing.
- Cedar Chain Lakes–Ellis Harbor remains indexed; stored successful crawl September 21 at 3:26:48 PM; both canonicals match and crawl/indexing allowed.
- American Harrington–Watt remains indexed in its stored September 21, 3:30:50 PM inspection with self canonicals and successful allowed crawl. This predates the intentional October 7 consolidation: the live response now declares the American River hub canonical. The route-family audit explicitly retains all ten endpoint choices on the hub. This is an expected transition, not a new accidental homepage canonical.

Little Miami and Cedar show Temporary processing error under Sitemaps; American shows no referring sitemap. These discovery fields do not negate their indexed, successfully fetched state. No live tests or indexing requests were submitted during this check.

## Technical health

- Homepage and all nine fixed river cohort routes return 200 with self-canonical and index/follow. Lower Yough now returns 200, unlike last week's 404. Pine River Lincoln County also now returns 200/self-canonical; its restoration is documented in the follow-up publication review. These response changes alone do not establish search recovery.
- Cedar remains 200/self-canonical. American returns 200 with the intended hub canonical after consolidation.
- A unique invalid river URL returns actual HTTP 404 with noindex/follow, not a 200 homepage fallback.
- Robots and sitemap index return 200; child sitemap independently checked at 200 with 2,521 URLs.
- HTTP apex redirects 301 to HTTPS apex. HTTPS www redirects 301 to apex, including the sampled route path and query string.
- Both certificates pass normal TLS hostname/trust validation. Apex certificate renewed: expires January 6, 2027 at 21:21:27 GMT, previously November 8. The www certificate expires March 21, 2027 at 23:59:59 GMT. No renewal action is needed from these observations.

## Assessment and next check

Notify for this week's visibility regression and refreshed indexing decline, with catalog-change caveats. No sampled current technical defect calls for an automatic repair. Continue evaluating the retained former-winning route cohort and the source-backed content/consolidation work already documented in `search-console-root-cause-followup-2026-10-05.md`; do not undo intended hub canonicals or request indexing for retired aliases. Compare another complete week and recheck the growing crawled-not-indexed group against the retained sitemap if weakness persists. No recovery date can be inferred.
