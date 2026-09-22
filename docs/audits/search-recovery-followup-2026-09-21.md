# Search recovery follow-up — September 21, 2026

Later same-day follow-up: see `submitted-indexing-followup-2026-09-21.md` for the complete 33 submitted-canonical audit, validation started September 21, Cedar and American River recrawl requests, and bounded Cloudflare security findings. Include those outcomes in the existing weekly review.

## Work completed

1. Located the exact cause of the current missing-page regression, fixed it, and deployed [PR 29](https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/29). The site repair was verified live at approximately 17:54–17:56 UTC. [PR 30](https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/30) makes the CI probe independent of public-CDN runner blocking while retaining TLS validation.
2. Reviewed a fixed ten-page traffic cohort (homepage plus nine river pages) against current HTML, publication status, sitemap membership, link paths, live APIs, and selected Google inspections.
3. Triaged 42 Google indexing examples against the deployed catalog and a complete build link graph. Preserved access/safety publication holds.
4. Created a weekly follow-up in this task: Mondays at 10:00 a.m. America/Chicago, with meaningful-change/problem notifications rather than routine unchanged reports.

The www certificate repair earlier today is complete: Azure Ready, actual certificate valid through March 21, 2027, and working redirects.

## Exact routing regression and correction

The September 17 asset-hosting change (`3f9dc705`, PR 25) introduced this behavior in `scripts/lib/static-assets.mjs`:

```js
config.navigationFallback ??= { rewrite: '/index.html' };
```

It ran during frontend packaging, after the earlier build audit. The audit also read the repository's config rather than the config in its selected build directory. Thus the repository and audit appeared correct while the deployed package routed missing river paths to homepage HTML with HTTP 200.

Direct-origin HTTPS testing reproduced the response, so this was not just an old Cloudflare cache entry. The defect is newer than the August 19 traffic collapse and cannot explain its initial onset.

The repair:

- Preserves routing configuration during asset packaging.
- Audits `staticwebapp.config.json` inside the selected build/package directory.
- Adds a second audit after packaging.
- Adds a post-deployment check of two valid URLs and three missing routes, including a unique nonexistent path. Valid pages must have their own canonical; missing pages must return real 404 without homepage canonical.
- Updates the existing packaging test to preserve redirects and real 404 overrides and reject the former fallback behavior.

Verification before deployment: 3,213 sitemap pages, 2,780 published routes, no build indexability errors/warnings. A deliberately injected package fallback caused the audit to fail; restoring the package made it pass. Route/runtime/workspace type checks and data/geometry audits passed. Root tests had 1,174 passes and one unrelated 5-second timeout under parallel load; the timed-out test passed on focused rerun, together with all packaging tests (13 focused tests). All additional workspace suites passed. No npm configuration or dependency manifests were changed; local dependencies were installed explicitly for Windows in the isolated worktree.

### Production verification

The Azure upload in [run 35633918419](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/35633918419) succeeded. Its new public smoke check then received 403 for all URLs from the GitHub runner, causing the overall run to be marked failed. The same checks passed through the public CDN from this audit host, and direct-origin testing also passed. PR 30 lets CI resolve the Azure app hostname directly while retaining the public Host header, SNI, and certificate verification. It does not change CDN access rules. Public CDN checks remain the script default and part of weekly monitoring.

After deployment, all 52 sampled URLs were checked again: **48 published pages returned 200/self-canonical/no noindex; three access-held routes and Lower Yough returned 404**. Pine, Juniata, and a unique nonexistent path also returned 404. An unmodified Pine URL without a cache-busting query returned 404. Both public and direct-origin five-probe checks passed. Evidence: `search-recovery-2026-09-21/after-deployment/triage.json`.

Google's live smartphone inspection of Pine at September 21, 12:57:05 displayed time also returned **Not found (404)** with crawling allowed. This is the desired response for that unpublished route. The www redirect was verified to end at the same 404. No indexing request was submitted for a missing page.

**Final CI outcome:** [run 35635105251](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/35635105251), commit `f609cf01bb9febac531752868f13fc3597c641ae`, completed successfully, including tests, both package audits, asset checks, deployment, and the new origin-routing check. The public five-probe check passed again after this final deployment. Both PRs are merged and their operations gates passed.

## Fixed traffic cohort

Baseline: July 26–August 22 versus August 23–September 19, Web search, domain property, all devices/countries. The earlier period includes the first four collapsed days. Query privacy limitations do not affect this property/page comparison in the same way as query-filtered totals.

| Page | Clicks before → after | Current publication and link findings |
|---|---:|---|
| Homepage | 19 → 8 | Published, self-canonical, linked from 3,212 sitemap pages. |
| Little Miami Kelley–Milford | 97 → 0 | Published; 5 linking pages, depth 2; route-specific access/gauge content. |
| Namekagon Big Bend–Trego | 23 → 0 | Published; 9 linking pages, depth 2; proxy-gauge planning treatment. |
| Milwaukee West Bend–Quaas Creek | 21 → 0 | Published; 8 linking pages, depth 2; both access names present. |
| Ouachita Remmel–Whitewater Park | 21 → 0 | Published; 9 linking pages, depth 2; dam-release/whitewater limitations present. |
| Namekagon County K–Whispering Pines | 18 → 0 | Published; 8 linking pages, depth 2; distinct route and direct-gauge context. |
| Big River Mammoth–Merrill Horse | 14 → 1 | Published; 6 linking pages, depth 2; access and threshold-source context present. |
| St. Croix Sand Creek–Highway 70 | 12 → 0 | Published; 8 linking pages, depth 2; planning route, no same-day score. |
| Lower Yough Ohiopyle–Bruner Run | 11 → 0 | Not public under current Class IV publication rules; absent from sitemap and link graph; API 404. Before routing repair, HTML incorrectly returned homepage 200. |
| James H. L. Kerr–Ralph Cox | 10 → 0 | Published; 10 linking pages, depth 2; named accesses and direct-gauge context. |

All nine published cohort pages returned HTTP 200, self-canonical HTML, and no noindex. All eight published river pages had both endpoint names in initial HTML. Their live APIs returned HTTP 200 with fresh/live snapshot status, roughly 0–8 minutes old at sampling. This verifies API availability, not freshness of every underlying gauge observation. Initial HTML contains live-data placeholders, but also substantial route/access/source content; the earlier Google live render of Little Miami successfully populated live values.

### Content/history conclusions

The published river pages are not empty copies of the homepage. They have distinct reach titles, summaries, endpoint information, route cautions, source references, and gauge context. The strongest evidence still points to lost search visibility on indexed pages, rather than widespread current technical exclusion. This review does not establish that Google considers the content sufficiently useful or that all source claims are current.

Namekagon Big Bend and St. Croix are planning pages; do not restore misleading live-score claims to chase “conditions today” queries. St. Croix's introduction contains internal catalog language (“closing the Minnesota inventory gap”), which is a bounded editorial improvement opportunity, not a proven cause of lost rankings. The API and markup checks do not justify a wholesale rewrite or mass URL migration.

Lower Yough requires a separate publication-policy decision: the route has reviewed safety notes and Class III–IV difficulty context, but its effective scored/default status does not qualify it for the public planning surface. Merely forcing it back into same-day recommendations would contradict the Class IV gate. If the product owner intends to retain it, explicitly review a planning-only publication with existing expert-use warnings and access evidence. No safety rule was weakened and no held route was republished during this SEO repair. Its 11 lost baseline clicks represent about 1.3% of the total 822-click property loss, so it cannot account for the sitewide collapse.

The inspected August 20 route-template commit primarily changed labels/reporting UI and followed the August 19 break. The larger August 21 template change also followed it. No matching August 18–19 page/layout/robots/config commit appeared in the focused history query. Git author timestamps are not deployment timestamps; this does not rule out a deployment or infrastructure problem.

## Indexing backlog triage

GSC category totals remain 2,249 discovered, 274 crawled, 1,124 alternate canonicals, 52 redirects, 26 404s, 9 noindex, 2 forbidden, and 1 Google-selected other canonical. These are known-URL categories, not a count of valuable formerly indexed pages lost.

Sample method: first ten discovered URLs plus every 25th URL through the first 500 alphabetically displayed examples (30 total); first ten crawled examples; both forbidden examples. This is a deliberate diagnostic sample, not random sampling or an estimate of whole-category proportions.

| GSC sample | Count | Current result | Action |
|---|---:|---|---|
| Discovered, published | 29 | In sitemap and linked in HTML; live 200/self-canonical/no noindex | Keep published. Monitor crawl/index selection; improve only demonstrated deficiencies. |
| Discovered, access hold | 1 | Clearwater McKays Bend–Pink House withheld | Keep hold; correct response should be 404, not homepage 200. |
| Crawled, published | 8 | In sitemap and linked; live 200/self-canonical/no noindex | Prioritize individual inspections; at least Redwood's aggregate label is stale. |
| Crawled, access holds | 2 | Eleven Point Thomasville–Greer Crossing and Susquehanna Sayre–Towanda withheld | Preserve access review; no restoration or index request solely for SEO. |
| Historical 403 examples | 2 | Both currently indexed, successfully fetched September 20 | No WAF relaxation warranted; validation was already started September 20. |

All **3,213 sitemap pages** were reachable from the homepage through the build's HTML anchor graph; no orphaned sitemap pages were found. This checks generated HTML, not all external URLs or Google's crawl scheduling. The sampled published routes are generally two clicks from home. Adding more links indiscriminately is not supported by an orphan problem here.

### Google inspection evidence collected September 21

| Page | Current Google result | Crawl/live test | Canonical/permission result |
|---|---|---|---|
| Upper Iowa river hub | Indexed, despite 403 category | Sep 20, 16:26:47 displayed | Smartphone successful; crawl/index allowed; self-selected canonical. |
| Minnesota river hub | Indexed, despite 403 category | Sep 20, 16:28:48 | Smartphone successful; allowed; self-selected canonical. |
| Redwood Vesta–Wabasso | Indexed, despite crawled-not-indexed category | Sep 19, 01:47:38 | Smartphone successful; allowed; self-selected canonical. |
| Fox River Frame Park–Greenway Waukesha | Stored inspection: unknown to Google, despite discovered category | Live Sep 21, 12:43:54 | Available to Google; successful; crawl/index allowed; self-declared canonical. Selection only determined after indexing. |
| Milwaukee West Bend–Quaas Creek | Indexed | Sep 19, 14:23:26 | Smartphone successful; allowed; self-selected canonical. |
| Ouachita Remmel–Whitewater Park | Indexed | Sep 17, 20:19:19 | Smartphone successful; allowed; self-selected canonical. |
| Namekagon County K–Whispering Pines | Indexed | Sep 20, 05:16:10 | Smartphone successful; allowed; self-selected canonical. |
| Big River Mammoth–Merrill Horse | Indexed | Sep 15, 19:54:15 | Smartphone successful; allowed; self-selected canonical. |
| St. Croix Sand Creek–Highway 70 | Indexed | Sep 8, 02:49:52 | Smartphone successful; allowed; self-selected canonical. |
| James H. L. Kerr–Ralph Cox | Indexed | Sep 19, 16:43:45 | Smartphone successful; allowed; self-selected canonical. |
| Lower Yough Ohiopyle–Bruner Run | Stored result indexed, but currently unpublished | Jul 23, 22:21:00 | Historical successful fetch/self-selected canonical; not evidence of current route availability. Sitemap association reports temporary processing error. |

Inspection timestamps are displayed by the browser; do not assume they use the same timezone as GSC performance days. Earlier inspections in this task also confirmed homepage, Little Miami and Namekagon Big Bend indexed with successful recent crawls.

Taken together, all eight currently published river pages in the traffic cohort are individually confirmed indexed with self-selected canonicals and successful crawls after the August repair.

No mass indexing requests were made. Aggregate validation and indexing selection can lag even when the current live page is healthy.

## Monitoring and decision criteria

Automation: `paddletoday-search-recovery`, weekly Mondays at 10:00 a.m. America/Chicago, attached to this task. It compares complete seven-day windows, tracks the same ten-page cohort, checks bounded indexing/canonical samples, real 404 behavior, TLS and redirects, and writes a local report. It does not modify production or submit indexing requests automatically. It alerts on meaningful recovery/regression, technical failure, missing access needing action, or two consecutive weekly comparisons without progress. The local app and authenticated access must be available for the checks to run successfully.

Recovery evidence means sustained impressions across formerly successful pages and renewed nonbrand visibility/clicks, not only a larger indexed count. Recheck technical serving immediately on any regression. If the next two complete weekly comparisons show no progress, prioritize historical outage/deployment evidence and a substantive competitor/content review of the fixed cohort. Do not present this as a promised recovery window.

## Local evidence and reproduction

- `search-recovery-baseline-2026-09-21.json`: fixed cohort, periods and baseline metrics.
- `search-indexing-sample-2026-09-21.json`: observed category samples and sampling limitations.
- `search-recovery-2026-09-21/triage.json`: URL-level live markup, catalog classification, link counts/depth, and route context.
- `search-recovery-2026-09-21/live-api.json`: bounded API health/freshness observations.
- `scripts/audit-search-recovery.ts`: local read-only audit; run after building with `node --import tsx scripts/audit-search-recovery.ts tmp/frontend <output-directory>`.

The audit helper and matching built catalog are in the attached isolated checkout at `C:\Users\Yerff\.codex\worktrees\search-recovery-9965\PaddleTodayV2`. Run the reproduction command there so source catalog and build match. Reports and JSON evidence are also copied to the main workspace's `docs/audits` directory for the weekly monitor. The preexisting main-workspace changes were not overwritten or deployed.

These account-specific evidence files remain local; the public PR contains only the routing fix, regression tests, deployment checks and technical documentation.
