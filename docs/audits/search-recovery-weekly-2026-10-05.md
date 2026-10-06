# Weekly search recovery check October 5 2026

Search Console access is restored. Both URLs submitted on September 21 are now indexed with correct canonicals. Web impressions increased on a small base, but clicks remain near zero. No production changes or indexing requests were made during this check.

## Complete weekly comparison

The date dialog confirms September 27–October 3 versus September 20–26, 2026. Latest reported date is October 3. Unfiltered Web search, all devices and countries; no query filters. Search Console was accessed as the signed-in account with domain-property access.

| Metric | Sep 20–26 | Sep 27–Oct 3 |
|---|---:|---:|
| Clicks | 1 | 0 |
| Impressions | 59 | 118 |
| CTR | 1.7% | 0% |
| Average position | 37.2 | 28.0 |

Impressions doubled and average position improved 9.2 places. This is an early visibility signal, not established traffic recovery: there were zero clicks, and changing query/page mix affects aggregate position. Mulberry Redding–Turner Bend contributed 20 current impressions versus two previously, accounting for 18 of the 59 additional impressions.

This reporting week began three days after Google's September 24 spam update started. The official dashboard said rollout could take up to two weeks, so the September 27–October 3 comparison was still inside that window as of this October 5 check. Treat the small impression increase as provisional and compare another complete week after the rollout window before calling it recovery. This later update does not change the August 18–21 update's timing against the original August traffic cliff. Source: [Google Search Status Dashboard](https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu).

## Fixed cohort

All 82 reported page rows were reviewed. Every cohort page has zero reported clicks in both periods. CTR is 0% where impressions exist and undefined otherwise. Positions below are undefined when no impressions are reported; GSC's displayed zero is not rank zero.

| Page | Previous impressions | Current impressions | Previous position | Current position |
|---|---:|---:|---:|---:|
| Homepage | 5 | 8 | 33.8 | 20.9 |
| Little Miami Kelley–Milford | 7 | 5 | 63.9 | 63.8 |
| Namekagon Big Bend–Trego | 1 | 0 | 21 | — |
| Milwaukee West Bend–Quaas Creek | 0* | 0* | — | — |
| Ouachita Remmel–Whitewater Park | 0* | 0* | — | — |
| Namekagon County K–Whispering Pines | 0* | 0* | — | — |
| Big River Mammoth–Merrill Horse | 1 | 2 | 11 | 17 |
| St. Croix Sand Creek–Highway 70 | 0* | 0* | — | — |
| Lower Yough Ohiopyle–Bruner Run | 0* | 0* | — | — |
| James H. L. Kerr–Ralph Cox | 0 | 4 | — | 12.3 |

*Absent from the complete displayed page table: zero reported activity, not a claim that reporting has no omissions. Cohort reported impressions total 14 → 19. Query-filtered counts were not used as complete totals. No broad return of the previously successful cohort is evident.

## Indexing and canonical checks

The aggregate indexing report is still dated **September 20**, before the September 21 fixes. Do not interpret the following as post-repair totals:

- All known: 980 indexed; 1,115 alternate canonical; 52 redirects; 30 404; nine noindex; one Google-selected different canonical; 2,141 discovered; 298 crawled; zero 403. The 403 validation says Passed.
- Submitted: 858 indexed; 2,141 discovered; 185 crawled; 29 alternate canonical; zero 403. Submitted alternate-canonical validation still says Started.

Stored URL Inspection gives more relevant evidence:

| URL | Current Google status | Last crawl shown |
|---|---|---|
| Cedar Chain Lakes–Ellis Harbor | Indexed; declared and Google-selected canonical are the inspected URL | Sep 21, 3:26:48 PM |
| American Harrington–Watt | Indexed; declared and Google-selected canonical are the inspected URL | Sep 21, 3:30:50 PM |
| Little Miami Kelley–Milford | Indexed; declared and Google-selected canonical are the inspected URL | Oct 2, 9:03:20 PM |

All three show successful Googlebot smartphone fetches with crawling/indexing allowed. Times are browser-displayed, not converted to UTC. Cedar and American are meaningful improvements from the September 21 pre-request inspections. Little Miami's fresh successful crawl, yet five impressions and average position 63.8, supports continued attention to ranking visibility rather than assuming current deindexing.

## Public technical checks

Homepage, all eight published cohort routes, Cedar and American return 200 with their own canonicals and `index, follow`. Namekagon County K initially had a connection reset during concurrent probing; a separate retry returned 200/self-canonical. No sustained failure was reproduced, but the transient result is preserved in JSON.

Lower Yough and the previously withheld Pine route remain real 404/noindex pages. A fresh nonexistent route also returns 404/noindex, not homepage content. Robots and sitemap-index endpoints return 200.

HTTP apex redirects to HTTPS apex with 301. HTTPS www redirects to apex with 301, retaining the tested route path/query. Normal TLS/hostname verification succeeds on both hosts. Apex edge certificate expires November 8, 2026 at 20:12:10 UTC (about 34 days); www expires March 21, 2027 at 23:59:59 UTC. These are served certificates, not proof of future renewal or the upstream apex-origin certificate.

## Follow-up

Continue the weekly comparison and canonical-validation monitoring. This week has some visibility/indexing progress, so the two-consecutive-complete-comparisons-with-no-progress escalation condition is not met. Last week's signed-out run was incomplete and must not be counted as a no-progress measurement. No recovery date is predicted.

Evidence: `search-recovery-weekly-2026-10-05.json`; cohort definition: `search-recovery-baseline-2026-09-21.json`; repair history: `submitted-indexing-followup-2026-09-21.md`. Checks are bounded and cannot exclude intermittent or region-specific serving issues.
