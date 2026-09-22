# Search Console audit — September 20, 2026

## Main finding

The search decline is severe and closely coincides with Google's August 2026 spam update. The strongest working hypothesis is an automated ranking reassessment, with separate historical routing and current URL-publication cleanup issues. Timing is evidence of correlation, not proof that Google classified this site under a particular spam policy.

Google's official rollout ran August 18–21: https://status.search.google.com/incidents/LEubPCm2octf2uMqCFKE

## Performance evidence

Search Console Web search, last 28 days compared with previous 28 days, ending September 18 (August 22–September 18 versus July 25–August 21):

| Metric | Previous 28 days | Last 28 days |
| --- | ---: | ---: |
| Clicks | 858 | 14 |
| Impressions | 26,200 | 382 |
| CTR | 3.3% | 3.7% |
| Average position | 8.6 | 35.2 |

Clicks fell 98.4%; impressions fell 98.5%. Aggregate position changes include changes in the mix of queries/pages; this is not a controlled same-query ranking comparison.

Daily report pinpoints the break:

| Date | Clicks | Impressions |
| --- | ---: | ---: |
| August 16 | 34 | 1,171 |
| August 17 | 27 | 888 |
| August 18 | 13 | 853 |
| August 19 | 4 | 124 |
| August 20 | 2 | 25 |
| August 21 | 0 | 14 |

Former landing-page winners, previous → last 28 days:

- Little Miami, Kelley–Milford: 98 → 0 clicks; 2,253 → 26 impressions.
- Namekagon, Big Bend–Trego: 23 → 0 clicks; 278 → 3 impressions.
- Milwaukee, West Bend–Quaas Creek: 21 → 0 clicks; 231 → 8 impressions.
- Ouachita, Remmel–Whitewater Park: 21 → 0 clicks; 1,600 → 7 impressions.
- Namekagon, County K–Whispering Pines: 18 → 0 clicks; 306 → 4 impressions.

## Indexing evidence and treatment

Summary report last updated September 17: 996 indexed; 3,737 not indexed. Counts cover all known URLs, including variants and removed pages; they are not a count of intended canonical pages alone.

| Category | Count | Assessment |
| --- | ---: | --- |
| Discovered, currently not indexed | 2,249 | Prioritize valuable published routes; verify publication, sitemap inclusion, internal links, distinct content and current accessibility. Discovery alone does not guarantee indexing. |
| Crawled, currently not indexed | 274 | Review current inspection before acting; at least one sampled example has already become indexed. Improve pages with insufficient distinct value rather than repeatedly validating unchanged pages. |
| Alternate page with proper canonical | 1,124 | Mixed group: parameter variants are expected, but one sampled route previously canonicalized to the homepage. Do not dismiss the whole category as healthy. |
| Page with redirect | 52 | Sample includes HTTP host and correction-form variants. Correct redirects are expected exclusions. |
| Not found (404) | 26 | Classify each as intentionally withheld/removed, renamed, or accidentally absent from deployment. Restore intended pages; redirect only to genuinely equivalent replacements. |
| Excluded by noindex | 9 | Samples were favorites and request/correction forms, not route guides. These do not need to be indexed. |
| Forbidden (403) | 2 | Upper Iowa and Minnesota river hubs; reported crawls June 3. Old errors require current live tests before infrastructure changes. |
| Google chose different canonical | 1 | Juniata Newport–Green Valley: Google chose the www version at its June 23 crawl. Current www navigation redirects to apex, but the route is now a 404. |

### URL-level verification

1. `/rivers/little-miami-river-kelley-milford/`: indexed; September 17 smartphone crawl successful; crawling/indexing allowed; self-canonical selected by Google. September 20 live test also successful. Google's tested HTML contains the loaded gauge (11.56 ft), weather and score, not just loading placeholders. This strongly argues against a current blanket rendering/indexing block as the explanation for this page's ranking loss.
2. `/rivers/redwood-river-vesta-wabasso/`: listed in the crawled-not-indexed report, but current URL Inspection says indexed. Summary reports lag; do not treat all 274 as current failures.
3. `/rivers/pine-river-lincoln-pine-river-park-county-w/`: September 8 crawl declared the homepage as canonical; Google agreed. Current browser response and September 20 Google live test both show 404. Repository commit `85ddde02` added `/rivers/*` to the Azure navigation-fallback exclusions September 8. This is consistent with the former homepage fallback being fixed. The next question is whether this route should be published, not whether its current HTML needs another canonical tag.
4. `/rivers/by-river/upper-iowa-river/`: stored inspection has a June 3 forbidden error; the route hub loads in the current browser. September 20 Google live test passed: URL available to Google, page can be indexed, one valid breadcrumb item. Requesting indexing for this repaired hub is reasonable; the old 403 is not evidence of a current block. Minnesota hub still needs its own live test.
5. `/rivers/juniata-river-newport-green-valley/`: historical www canonical disagreement; current www URL redirects to apex and shows Azure 404. Audit intended publication/replacement before requesting indexing.

## Other health checks

- Manual actions: no issues detected.
- Security issues: no issues detected.
- Sitemap index: Success; last read September 19; 3,340 discovered pages.
- HTTPS: no critical issues; no issues detected in last 90 days.
- Breadcrumbs: zero invalid items in report.
- Core Web Vitals: insufficient real-user data for both devices. This is not a pass or a failure.
- Crawl stats: 26,140 requests over 90 days; 97% HTTP 200; mean response 410 ms; 85% refresh, 15% discovery; 53% JSON versus 32% HTML; 48% page-resource loads. Resource-heavy rendering is an optimization opportunity, not proof of exhausted crawl capacity.
- Apex host reports past server-connectivity problems, recently acceptable. Visible main failure spike is in late July, not aligned with the August 19 collapse. DNS and robots fetching acceptable.
- Links report: 63 external links, to homepage/privacy only; listed domains are Google (59), Apple (2), eckceptionalsolutions.com (1), thesiterank.com (1). This is a limited report, not a complete backlink inventory, but shows little observed independent route-level endorsement.
- Shell HTTP probes received 403 even for robots/sitemap; browser and Google live test succeeded for the key page. Do not interpret these environment-specific probes as proof Googlebot is blocked.

## Recommended work, in order

### 1. Audit publication and missing routes

Reconcile the live sitemap and all intended public routes against actual production status, canonical, robots and internal links. Include the historical homepage-canonical URLs and 26 reported 404s. Keep deliberately withheld routes private while their access/safety data is unresolved. Existing `WITHHELD_ROUTE_SLUGS` logic demonstrates that some missing pages can be intentional.

Required outcome: intended pages return 200 and self-canonical; renamed pages use equivalent 301 destinations; removed pages return real 404/410; sitemap and internal links include the right URLs. Preserve the September 8 river fallback exclusion. Consider a branded 404 with useful navigation while retaining the real error status.

### 2. Concentrate editorial effort on proven demand

Prioritize the five former winners above and their river hubs. Make the distinct purpose of each page obvious: hub for comparing reaches/general river conditions, route page for its specific start/end, distance, launch rules, hazards, shuttle and gauge interpretation. Add evidence of review, source dates, locally specific explanations and original/accurately labeled imagery where available. Avoid expanding generic prose merely to increase word count.

The route title template at `src/pages/rivers/[slug].astro:172` uses river name but omits reach and state, yielding identical titles for scored reaches on the same river. Change it to distinguish the reach and location, e.g. `Little Miami River: Kelley to Jim Terrell | Conditions & Access`. Do not claim this small change alone reverses the ranking loss.

Maintain useful programmatic pages, but assess whether near-identical or overlapping entries add independent value. Consolidation/noindex should be selective and evidence-based, not applied automatically to every unindexed page. Google explicitly evaluates low-value scaled content; using templates alone is not evidence of a violation.

### 3. Reduce unnecessary URL variants

The correction link generator at `src/pages/rivers/[slug].astro:104` exposes long query strings containing copied route text, source URL and notes. GSC examples confirm Google discovers these. Prefer a stable form route with a short identifier or client-side form state; apply a consistent noindex policy to utility forms and exclude those forms from the sitemap. Retain normal crawl access where Google needs to observe noindex; do not indiscriminately block route/API resources.

### 4. Improve resilience and independent usefulness

Consider a timestamped server/build-rendered conditions snapshot with client refresh, and reduce/cache redundant resource requests. Google rendered the current sample successfully, so this is resilience/performance work, not a proven rendering fix. Never show stale conditions as current.

Pursue genuine editorial references from local paddling clubs, outfitters and relevant water-trail organizations by making a few route guides worth citing. No bulk link purchasing or disavow campaign is supported by this audit.

### 5. Measure recovery after substantive changes

Track weekly clicks/impressions and same-page/same-query rankings for a fixed cohort of former winners; separately track submitted canonical URLs and current inspection status. Request indexing for a small set of materially improved or repaired priority pages, not all excluded URLs. The failed September 18 crawled-not-indexed validation does not itself identify a technical defect or penalty.

Google says recovery after spam-related changes may require systems to observe compliance over months; no fixed recovery date is promised: https://developers.google.com/search/docs/appearance/spam-updates

Traffic-drop guidance: https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops

Spam policies: https://developers.google.com/search/docs/essentials/spam-policies#scaled-content

## Scope and limits

Read-only account review plus browser live tests and repository inspection. No site code, deployments, ranking settings, removal requests, or validation requests were changed. This file records the findings. The audit sampled URLs; it is not a complete crawl or a confirmed diagnosis of Google's internal classifier. The repository has extensive pre-existing changes, and local source is not assumed to match the currently deployed version.


## Authorized implementation follow-up

Implemented in draft PR https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/28 (commit a0af4174). Changes cover distinct route/hub titles, existing route-specific summaries, fragment-based form prefill with legacy-query support, utility noindex/sitemap consistency, genuine branded Azure 404s, invalid evidence links and a built-site audit before deployment. Named Bartram itineraries remain distinguishable where endpoints overlap. An unsupported redundant Iowa endpoint note was removed; the same warning remains in supported access caveats and route-access notes.

Isolated build/audit: 3,213 sitemap pages, 2,780 public routes, zero errors/warnings. Twelve existing 404 tests passed; an injected canonical/noindex regression was correctly rejected. Full typecheck passed route/runtime checks and route-data audit, then hit an existing geometry fingerprint failure reproduced with unchanged HEAD route files. PR is draft and not deployed. Main-workspace build also passed the audit (3,248 sitemap pages, 2,811 routes), but contains additional pre-existing changes excluded from the PR.

Search Console accepted indexing requests for both Upper Iowa River and Minnesota River hubs. The 403 category now displays Validation Started, September 20, 2026. No mass indexing, removal, or unrelated validation requests were submitted.
