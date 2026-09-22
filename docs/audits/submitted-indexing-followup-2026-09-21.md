# Submitted indexing follow-up — September 21, 2026

## Scope and baseline

Read the authenticated Search Console report and its submitted-page filter. The report remains dated September 17, before today's certificate and missing-page repairs. All known URLs: 996 indexed, 3,737 excluded. Submitted URLs: 891 indexed, 2,449 excluded (2,249 discovered, 165 crawled, 33 alternate canonical, two 403). This is Google's historical submitted set of 3,340, not the current 3,213-page sitemap.

## Canonical exclusions: all 33 checked

Expanded and read all 33 examples, then fetched each public URL with curl using a browser-style user agent. Compared canonical, response status, robots meta and membership in the matching production build sitemap.

- 31 return HTTP 200, self-canonical HTML, no noindex, and belong to the current sitemap.
- Sheboygan Rochester–Esslingen and Baraboo Rock Springs–North Freedom return real 404/noindex and are absent from the current sitemap. Both have explicit access-review holds in source: uncertain public access during contaminated-soil cleanup at Rochester Park, and unresolved launch usability at Rock Springs. Keep those holds.
- No remaining incorrect live canonical was found in this complete 33-URL group. Evidence: `submitted-canonical-audit-2026-09-21.json`.

Individual Google inspections:

| URL | Stored Google result | Current live result / action |
|---|---|---|
| Cedar River Chain Lakes–Ellis Harbor | Not indexed; August 24 14:12:33 crawl received homepage canonical, selected homepage | September 21 15:23:33 Google Inspection Tool smartphone: fetch successful, crawl/index allowed, self-canonical. Indexing request accepted into priority crawl queue. |
| Shell Rock Frank Hall–St. Nicholas | Not indexed; July 18 03:49:05 crawl received homepage canonical; Google selected Blue Earth Amboy–Dodd Ford | Current public fetch 200/self-canonical. Included in category validation; no separate live test or indexing request. |
| American River Harrington–Watt | Inspection says unknown to Google, despite discovered category; no reported crawl or sitemap association | September 21 15:29:20 Google live fetch successful, allowed, self-canonical. Individual indexing request submitted; final confirmation recorded separately below. |

Times above are GSC browser-displayed times. Google selected canonical is not determined by live testing. Live success does not guarantee indexing.

**Action completed:** Started validation of the 33 submitted alternate-canonical exclusions; GSC visibly shows `Validation started — Started: 9/21/26`. This targets the submitted group, not all 1,124 alternate URLs. The two intentionally missing pages may leave this category without becoming indexed, which is appropriate.

The historical homepage-canonical problem demonstrably existed before September 17: Cedar's stored crawl is August 24 and Shell Rock's is July 18. Today's September 17 packaging-regression diagnosis remains valid, but it was a recurrence, not the earliest occurrence of homepage substitution. Neither observation establishes the exact cause of the August 19 traffic collapse.

## Crawler security investigation

Used existing authorized Cloudflare API access, read-only. First fetched the latest 1,000 firewall events in a 24-hour window, then issued targeted Google ASN, Googlebot-user-agent and Python-user-agent queries to avoid relying solely on that capped list. Saved filtered evidence in `crawler-security-audit-2026-09-21.json` (September 20 20:28 to September 21 20:28 UTC).

- The ten Python requests from our previous check were blocked by Browser Integrity Check (`source: bic`), not evidence of Googlebot denial.
- The Googlebot-name query returned one block: a request for `/wp/.env` from ASN 400810. That user-agent claim is not authenticated Googlebot evidence.
- The Google ASN query returned five Bot Fight Mode challenges for `PlayStore-Google` on `/privacy/` and `/`. These are a separate app-crawler concern; they do not demonstrate Google Search crawler blocking.
- Browser-style public requests and two real Google live inspections succeeded.
- Browser Integrity Check is on; security level is medium. Ruleset inventory was readable, but rule details and Bot Management settings returned API authorization errors. No rules or protections were changed.
- Tried the Cloudflare dashboard as a fallback; it is signed out. Further rule-level diagnosis needs authenticated dashboard access or appropriately scoped read access. No credentials or new permissions were requested for this bounded search audit.

This is sampled, bounded security-event evidence, not complete verified Googlebot request logs, and does not rule out earlier or intermittent blocking. Do not disable sitewide security based on the Python test. The Play Store challenges warrant a targeted app-access review; any exception should identify the verified service, not trust an easily spoofed user-agent string.

## Content comparison and correction

Compared the previous same-day HTML/link evidence for five discovered Lower American routes, published crawled-category examples, and the indexed Little Miami traffic-loss page. The American routes have distinct endpoints, distances (4.9–13.1 miles) and durations, but share gauge, safety, logistics and much of the page template. Link counts range from two to 48 linking pages and all are depth two. Their 2,142–2,158-word initial HTML includes extensive shared interface/loading text, so word count is not evidence of unique content quality.

This supports a focused review of route-specific usefulness; it does not justify merging distinct itineraries, changing their canonicals to the river hub, or removing them from search. In particular, live data placeholders also appear on the indexed Little Miami page, so their presence alone does not establish an indexing defect. The current inspection of Harrington–Watt reports no crawl, not a documented content-quality rejection.

Git history adds useful context: the California American route module first appears in the September 11 coverage expansion (`5b296416`) and was revised September 13. Numerous other state expansions occurred in September. Those newly added route examples should not be counted as pages that lost indexing during the August outage. Git dates describe source history, not independently verified deployment dates; this does not quantify the age of the entire 2,249-URL backlog.

Extended the source-age check to the 30 previously sampled discovered URLs: **none of their exact slugs exists in `src/data` at `189ce67f`**, the latest reachable main-history commit before August 19 UTC (committed August 14 local time). The identical search correctly finds Little Miami Kelley–Milford as a positive control. This supports treating these sampled slugs as later catalog additions, not presumed August deindexing. It does not establish first publication dates, exclude earlier differently named routes, or estimate the whole category. Evidence: `discovered-source-age-2026-09-21.json`.

Found a concrete editorial issue in two public introductions: St. Croix Sand Creek–Highway 70 describes an internal inventory gap; Wisconsin Sauk City–Arena describes why the catalog keeps a separate scored route. Replaced those passages with route descriptions based on existing endpoints, route context, distance, duration and shuttle data. No safety, scoring, publication or access rules changed.

PR: https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/31

Local validation: route-data TypeScript check and git diff check passed. No new tests for two copy changes.

**Production complete:** PR 31 merged as `07fd75ae28cbc0b132d4e662030fc314d274fe64`. Frontend run https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/35651609986 succeeded, including full tests, both search-indexability audits, asset/mobile checks, deployment and the origin response check. Both public route URLs now return 200, their own canonicals and the new summaries. The public five-probe routing check passed again (homepage/Little Miami 200; two withheld and one unique nonexistent route 404). Existing user changes in the main workspace were not deployed.

American River Harrington–Watt: GSC subsequently confirmed **Indexing requested**, with the URL added to the priority crawl queue. Both individual requests in this follow-up were accepted; no mass request was attempted.

## Follow-up criteria

The existing Monday monitor should read this addendum alongside `search-recovery-followup-2026-09-21.md`. Track the submitted canonical validation outcome, Cedar/Harrington indexing status, and complete-week impressions on the fixed traffic cohort. Do not repeatedly submit the same requests. Fixes and recrawl requests do not promise ranking recovery. Continue investigating ranking losses independently because the previously successful published cohort remains indexed.
