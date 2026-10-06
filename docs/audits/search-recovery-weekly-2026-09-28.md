# Weekly search recovery check — September 28, 2026

Observed around 15:02 UTC (10:02 Central). Read-only check; no production changes, validation submissions or indexing requests.

## Attention needed: Search Console signed out

The in-app browser redirected Search Console to Google's account chooser. Both remembered accounts were marked signed out. Sign in with the account that has access to the paddletoday.com domain property to resume performance and indexing checks.

Clicks, impressions, CTR and average position are **unavailable**, not zero, for both property totals and all ten fixed-cohort URLs. The latest complete reporting day could not be verified. Candidate comparison windows are September 20–26 versus September 13–19, subject to Google's finalized data after sign-in. No query-filtered estimates were substituted.

Current exclusion totals, the September 21 submitted-canonical validation result, recent Google crawl dates, and Google's selected canonicals could not be checked. Today's HTTP canonical checks below are not evidence of Google index selection.

This run does not establish recovery or regression and does not count as a complete no-progress weekly comparison. The two-consecutive-comparisons escalation condition cannot be evaluated from missing data.

## Public technical checks passed

- Fixed cohort: homepage and all eight previously published river pages return HTTP 200, self-canonical HTML, and `index, follow`. Lower Yough still returns the expected 404 with `noindex, follow`, consistent with the recorded publication hold.
- Cedar River Chain Lakes–Ellis Harbor and American River Harrington–Watt return 200, self-canonical and indexable HTML. Their Google indexing-request outcomes remain unknown.
- Previously withheld Pine route and a fresh nonexistent route both return real HTTP 404, `noindex, follow`, and the 404 canonical rather than homepage HTML.
- Robots and sitemap-index endpoints return HTTP 200. Robots allows public crawling and retains admin/unsubscribe exclusions.
- HTTPS www redirects to apex with HTTP 301, preserving a tested route path and query. HTTP apex redirects to HTTPS apex with 301.
- Normal certificate/hostname verification succeeds on apex and www. Apex edge certificate expires **November 8, 2026 at 20:12:10 UTC** (about 41 days remaining). The repaired www certificate expires **March 21, 2027 at 23:59:59 UTC**. Neither is expired; this does not verify a future automatic renewal or the apex's upstream origin certificate.

No technical regression was observed in this bounded sample. Successful point checks do not exclude intermittent or region-specific failures.

## Evidence and next step

Raw URL, TLS, redirect evidence and explicit unavailable performance fields: `search-recovery-weekly-2026-09-28.json`. Cohort definition: `search-recovery-baseline-2026-09-21.json`. Prior repairs and Google requests: `submitted-indexing-followup-2026-09-21.md`.

Resume the missing authenticated checks after the user signs in. Keep the existing monitor schedule. No recovery date is predicted.
