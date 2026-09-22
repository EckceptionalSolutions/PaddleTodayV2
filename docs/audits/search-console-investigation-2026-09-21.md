# PaddleToday Google Search investigation

Audit date: September 21, 2026. Domain property: `sc-domain:paddletoday.com`. Read-only investigation; no production DNS, hosting, content, indexing requests, or Search Console configuration changed. Opening a Search Console message may mark it read.

**Post-audit repair:** The user subsequently authorized recreation of the www binding. At approximately September 21, 17:12 UTC, Azure was Ready and the actual new certificate was verified valid through **March 21, 2027**. Root and path/query redirects passed; apex remained healthy. The certificate finding below describes the original audit state and is now resolved. See [repair record](www-certificate-repair-2026-09-21.md).

**Subsequent SEO remediation:** The missing-route fallback was traced to the asset-packaging step introduced September 17 and fixed in PR 29. Live public/origin tests verified real 404 responses on September 21 around 17:54 UTC. The original audit finding below is now resolved; it cannot explain the initial August 19 collapse. See [follow-up findings, backlog triage, and monitoring](search-recovery-followup-2026-09-21.md).

## Diagnosis

Google Web visibility collapsed on **August 19**, with impressions falling from 853 on August 18 to 124 on August 19 and 25 on August 20. In equivalent 28-day periods, clicks fell **832 → 10 (−98.8%)**, and impressions **25,014 → 366 (−98.5%)**. The loss is broad across river pages, mobile/desktop, and the US audience, rather than confined to one landing page or an analytics tag.

A real hosting/domain incident is documented: on **August 25**, Azure's apex custom-domain binding was expired/Failed and was recreated. The site was verified working that evening. However, the incident's start and uninterrupted duration are not established. An earlier diagnosis incorrectly treated near-zero Cloudflare traffic during DNS-only operation as proof of an outage. Those requests bypass Cloudflare, so that evidence cannot establish downtime.

Today, the apex site, robots.txt, sitemap, and sampled valid landing pages are accessible. Google has resumed crawling important pages, and the homepage, Little Miami, and Namekagon samples remain indexed with the intended canonical. **Current widespread inability to crawl is not supported.** Persistently weak rankings/visibility on indexed pages remain unexplained; the August hosting incident may have contributed, and Google's August 18–21 spam update overlaps the decline, but neither is proven to be the sole cause.

Two current technical problems need attention: **invalid river paths return a 200 homepage**, and **the www TLS certificate expires October 1 while Azure reports renewal failure**. Neither alone explains all lost traffic on valid, indexed pages. No manual action, security issue, or removal request was found. No recovery date can be promised.

## Evidence and scope

- Authenticated Search Console: performance daily history June 20–September 19, comparisons, indexing, URL Inspection, selected live tests, sitemaps, Crawl Stats, messages, manual actions, security, removals, HTTPS, Core Web Vitals, and breadcrumbs.
- Live DNS through Google and Cloudflare resolvers and authoritative nameservers; IPv4/IPv6 HTTP requests; redirects, TLS, HTML canonical/indexing directives, and sitemap checks.
- Azure custom-domain status and certificate metadata, read-only; local configuration and relevant deployment history; prior Codex repair sessions.
- A 36-URL production sitemap sample: eight general pages, twenty river pages spread through the sitemap, and eight hub/state pages. All returned 200, self-canonical HTML without noindex. Evidence: [live sample JSON](search-console-live-sample-2026-09-21.json). This is not an exhaustive crawl or proof that all URLs are indexable.
- Performance dates are Google's displayed reporting dates; incident timestamps below specify timezone when available. Performance latest complete date used: September 19. Page indexing was updated September 17; Crawl Stats September 19. Their dates differ and should not be treated as simultaneous snapshots.

## Incident and recovery timeline

| Date | Observed evidence | Interpretation |
|---|---|---|
| June 20–August 18 | Daily performance reviewed; traffic grew through July/August. August 16 message celebrated 900 clicks over 28 days. | Abrupt collapse followed growth, not a long gradual seasonal slide. |
| August 18 | 13 clicks, 853 impressions, average position 8.8. Google spam update started 09:27 PDT. | Last substantial-impression day; update timing is correlation only. |
| August 19 | 4 clicks, 124 impressions, position 14.9. | First unmistakable visibility break. |
| August 20 | 2 clicks, 25 impressions, position 24.2. | Near-zero visibility already established. |
| August 21 | Google update finished 01:49 PDT. | Overlap does not identify cause. |
| August 23 | GSC notification: “Duplicate, Google chose different canonical than user.” | A canonical issue existed; current category contains only one URL, not proof of sitewide canonical replacement. |
| August 25, approximately 17:55 CDT / 22:55 UTC | Task **“Investigate website issue”** documented Azure apex binding Failed: “The custom domain has not been resolving to your static web app and has expired.” Recreated binding, DNS-only apex/www, then verified homepage/about/API/www and Ready bindings. | Confirmed infrastructure fault and documented restoration. Exact onset remains unknown. |
| August 27–29 | Later task inferred outage from Cloudflare request counts. | Inference is invalid without origin evidence because DNS-only traffic bypasses Cloudflare. |
| August 29, 21:35 CDT / August 30, 02:35 UTC | Apex/www re-proxied; strict TLS setting followed at 02:37 UTC. | Resumed Cloudflare traffic is expected after re-proxying; not itself proof of restoration from downtime. |
| September 3 evening CDT / September 4 UTC | Apex selected as Azure default domain, www redirected to apex; www DNS-only at 01:34:09 UTC. Renewal issue remained. | Canonical-host consolidation improved, but www certificate issue persisted. |
| September 8 | Task **“Speed up Google traffic recovery”** deployed and verified real 404 behavior; submitted homepage, Little Miami, explore, and sitemap. | Prior corrective work was done; mass repeat submissions are unwarranted. |
| September 17–20 | GSC successful recent crawls of important indexed pages. | Google has revisited important pages well after August restoration. |
| September 21 | Missing paths again return homepage 200; www renewal still Unhealthy, expiry October 1. Latest seven complete days have zero Web clicks. | Routing behavior has regressed or differs from the previously verified deployment; recovery remains absent. |

Relevant task IDs for follow-up retrieval: August 25 `01a03aff-7784-7363-9bde-3b6850d49c2a`; September 3 `01a0695e-d338-7823-9fa5-1f35d69a7f54`; September 8 `01a08102-4d4f-7942-b6f0-65b43ac70754`. Historical conclusions were checked against their evidence rather than accepted automatically.

## Performance

Unfiltered Web search, all devices/countries, domain property. The 28-day periods contain matching weekdays. The earlier period includes August 19–22 after the break, so it understates the decline relative to an entirely healthy baseline.

| Metric | July 26–August 22 | August 23–September 19 | Change |
|---|---:|---:|---:|
| Clicks | 832 | 10 | −822 / −98.8% |
| Impressions | 25,014 | 366 | −24,648 / −98.5% |
| CTR | 3.3% | 2.7% | −0.6 percentage points |
| Average position | 8.7 | 35.1 | 26.4 positions worse |

The disappearance of impressions dominates; CTR changes cannot explain a 99% click loss. Average position is impression-weighted and sensitive to the changing query mix, so it is not a fixed ranking tracker. Three-month totals: 1,527 clicks, 44,740 impressions, 3.4% CTR, position 8.7.

| Date | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| Aug 14 | 63 | 1,385 | 4.5% | 8.5 |
| Aug 15 | 45 | 1,255 | 3.6% | 8.1 |
| Aug 16 | 34 | 1,171 | 2.9% | 8.3 |
| Aug 17 | 27 | 888 | 3.0% | 8.7 |
| Aug 18 | 13 | 853 | 1.5% | 8.8 |
| Aug 19 | 4 | 124 | 3.2% | 14.9 |
| Aug 20 | 2 | 25 | 8.0% | 24.2 |
| Aug 21 | 0 | 14 | 0% | 30.6 |
| Aug 22 | 4 | 22 | 18.2% | 37.2 |
| Aug 25 | 1 | 19 | 5.3% | 41.2 |
| Aug 30 | 0 | 21 | 0% | 62.7 |
| Sep 19 | 0 | 6 | 0% | 33.7 |

Recent weekly comparison: September 6–12 had 4 clicks / 99 impressions; September 13–19 had 0 / 64 (impressions −35.4%). Tiny counts are volatile, but there is no positive recovery signal. Same-period 2025 comparison returned no baseline data; the property welcome message is dated April 29, 2026. Seasonality cannot be quantified from this account's year-over-year history.

### Largest landing-page losses

Same 28-day comparison. Route names abbreviate the displayed paths; Little Miami is `/rivers/little-miami-river-kelley-milford/`. Page aggregation can differ from property aggregation, so do not force page totals to equal the property total.

| Landing page | Clicks before → after | Absolute loss | Click change | Impressions before → after | Position before → after |
|---|---:|---:|---:|---:|---:|
| Little Miami: Kelley–Milford | 97 → 0 | 97 | −100% | 2,151 → 27 | 8.1 → 35.4 |
| Namekagon: Big Bend–Trego | 23 → 0 | 23 | −100% | 261 → 3 | 9.5 → 11.0 |
| Milwaukee: West Bend–Quaas Creek | 21 → 0 | 21 | −100% | 224 → 7 | 10.6 → 43.6 |
| Ouachita: Remmel Whitewater | 21 → 0 | 21 | −100% | 1,493 → 5 | 8.8 → 28.6 |
| Homepage | 19 → 8 | 11 | −57.9% | 86 → 42 | 17.6 → 30.4 |
| Namekagon: County K–Whispering Pines | 18 → 0 | 18 | −100% | 306 → 4 | 7.7 → 27.3 |
| Big River: Mammoth–Merrill Horse | 14 → 1 | 13 | −92.9% | 344 → 9 | 7.4 → 9.7 |
| St. Croix: Sand Creek–Highway 70 | 12 → 0 | 12 | −100% | 169 → 2 | 8.0 → 44.0 |
| Lower Yough: Ohiopyle–Bruner Run | 11 → 0 | 11 | −100% | 193 → 1 | 7.2 → 8.0 |
| James: H. L. Kerr–Ralph Cox | 10 → 0 | 10 | −100% | 419 → 5 | 7.4 → 22.4 |

The five largest losing river pages account for 180 clicks, about 22% of the 822 property-level loss. This is broader than a handful of dominant pages disappearing.

### Queries and segments

| Query | Clicks before → after | Absolute loss / percent | Impressions before → after |
|---|---:|---:|---:|
| little miami river kayaking conditions today | 8 → 0 | 8 / −100% | 78 → 0 |
| little miami river kayaking | 3 → 0 | 3 / −100% | 71 → 1 |
| namekagon river levels today | 3 → 0 | 3 / −100% | 17 → 0 |
| ouachita river whitewater park | 2 → 0 | 2 / −100% | 187 → 0 |
| little miami river conditions | 2 → 0 | 2 / −100% | 33 → 0 |
| namekagon river levels | 2 → 0 | 2 / −100% | 20 → 0 |
| namekagon river water levels | 2 → 0 | 2 / −100% | 7 → 0 |
| turner bend water level | 1 → 0 | 1 / −100% | 101 → 0 |
| little miami river level | 1 → 0 | 1 / −100% | 43 → 0 |
| remmel dam float map | 1 → 0 | 1 / −100% | 37 → 0 |

For “little miami river kayaking,” average position deteriorated 9.4 → 47. Queries with zero impressions have no meaningful post-period position, even if the UI displays zero.

Branded regex `paddle[ ]*today|paddletoday\.com` returned zero reported clicks/impressions in both periods. Its inverse returned 42 → 0 clicks and 2,647 → 120 impressions, position 16.4 → 65.3. **This does not establish that there were no branded searches or that the remaining clicks were branded.** Query filtering omits substantial anonymized/unavailable data; 42 filtered clicks versus 832 unfiltered demonstrates severe coverage limitations.

| Segment | Clicks before → after | Impressions before → after | Interpretation |
|---|---:|---:|---|
| Mobile | 606 → 7 (−98.8%) | 16,578 → 75 | Broad loss; remaining position 8.5 is a tiny surviving query subset. |
| Desktop | 218 → 3 (−98.6%) | 8,183 → 290 | Position 11.3 → 42.1. |
| Tablet | 8 → 0 (−100%) | 253 → 1 | Negligible remaining volume. |
| United States | 830 → 10 (−98.8%) | 24,068 → 288 | Main audience affected; other countries were small. |
| Image search | 3 → 0 (−100%) | 457 → 5 | Also lost visibility, but too small to explain the Web loss. |
| Video search | 0 → 0 | 0 → 0 | No measurable baseline. |
| News search | 0 → 0 | 1 → 0 | Negligible volume. |

Search appearance returned no data. GSC independently confirms the loss, so an analytics implementation defect cannot explain it. No independent GA4/Umami Google-organic session series was retrieved; repository notes indicate Umami for the website and GA4/Firebase for native apps. Clicks and sessions should not be equated.

## Crawl, DNS, TLS, and serving health

Current authoritative nameservers: `carol.ns.cloudflare.com` and `gannon.ns.cloudflare.com`. Google `8.8.8.8`, Cloudflare `1.1.1.1`, and authoritative checks agreed on apex A records `104.21.58.133`, `172.67.204.14`. AAAA: `2606:4700:3036::6815:3a85`, `2606:4700:3035::ac43:cc0e`. Both IPv4 and IPv6 HTTPS tests returned 200.

`www` is DNS-only CNAME `jolly-river-0d74c2110.1.azurestaticapps.net`; it currently redirects 301 to the apex and preserved a tested path. No loop was observed. No parent DS record was returned; a validated DNSSEC chain was not demonstrated. This absence is not evidence of the outage.

Azure apex binding is Ready. `www` is **Unhealthy**, with a certificate renewal error; Azure's `expiresOn` is **2026-10-01T23:59:59Z**. A separately inspected TLS peer certificate confirmed that expiration. The certificate is currently valid; this is an impending availability risk, not a present certificate-expiry outage. Apex's Cloudflare-served certificate expires November 8. A redirect cannot rescue a failed TLS handshake at the source hostname.

Crawl Stats (90-day aggregate, updated September 19): 25,962 requests; approximately 658 MB downloaded; 412 ms average response. Apex: 23,283 requests, 418 ms average; www: 2,679 requests. Responses: 97% 200, 2% 404, under 1% each 5xx/304/301. Refresh 85%, discovery 15%; file types 53% JSON, 32% HTML, 10% JS, 1% CSS. Resource loading accounts for 48%, smartphone 23%, desktop 17%, other 9%, ads 1%. High resource volume is not by itself a crawl-budget defect.

Apex host status says problems occurred in the past but recently good; DNS and robots availability were acceptable in the inspected chart. A large server-problem spike appeared in late July, with smaller later spikes; no obvious August 19-matching spike was established. A binding failure can produce HTTP errors even when DNS resolves, so green DNS does not disprove the August incident. www host status was good. No verified Googlebot request logs or complete daily crawl export were retrieved. Point-in-time success cannot rule out intermittent failures or geographic WAF restrictions.

### Confirmed incorrect missing-page responses

`/rivers/pine-river-lincoln-pine-river-park-county-w/`, a retired Juniata sample, and a deliberately nonexistent river path returned **HTTP 200, homepage content, and canonical `https://paddletoday.com/`**. These were direct responses, not 301 redirects. Google's live test of Pine on September 21 also fetched successfully and saw the homepage canonical. This is duplicate/soft-404-like behavior even though GSC labels Pine an alternate canonical rather than “Soft 404.”

Local `staticwebapp.config.json` has a 404 override to `/404.html` with status 404 and no navigation fallback. Production therefore does not match the intended outcome; determine whether build output, Azure configuration, another rewrite, or cached content is responsible. Observed HTML cache headers allow four hours of caching. Do not assume the local file is the deployed file or attribute the defect to Cloudflare without tracing it.

## Indexing, canonicalization, and rendering

Page indexing snapshot, September 17: **996 indexed / 3,737 excluded**, total known URLs 4,733. Historical tasks recorded about 1,120 indexed September 3 and 1,096 September 8. The current catalog has changed, so those counts alone do not establish which previously indexed URLs were lost.

| Exclusion | URLs | Assessment / next action |
|---|---:|---|
| Discovered, currently not indexed | 2,249 | Material backlog; validation Started. Compare to intended canonical inventory and prioritize previously successful or important published routes. Do not assume all are lost former traffic. |
| Alternate page with proper canonical | 1,124 | Many may be expected duplicates; Pine proves some arise from missing-page homepage fallback. Separate legitimate duplicates from serving defects. |
| Crawled, currently not indexed | 274 | Validation Failed. Inspect current high-value examples for unique useful content and Google-selected canonical; count alone does not prove technical blocking. |
| Page with redirect | 52 | Expected where host/legacy redirects lead directly to the right canonical. Audit unexpected targets. |
| Not found (404) | 26 | Appropriate for removed URLs without replacements; restore or redirect only if a genuine equivalent should exist. |
| Excluded by noindex | 9 | Check against intended utility/admin exclusions before changing directives. |
| Blocked due to 403 | 2 | Validation Started September 20. Recheck those exact URLs and verified bot logs; no current sitewide 403 established. |
| Duplicate, Google chose different canonical | 1 | Inspect individual URL; not evidence of sitewide canonical replacement. |

### URL Inspection samples

Times below are displayed by Search Console; timezone was not independently normalized. “Allowed” means crawl and indexing permission reported allowed. Stored results can lag the live site.

| URL/sample | Stored Google result / last crawl | Fetch & permissions | Declared / Google canonical | Live evidence |
|---|---|---|---|---|
| Homepage | Indexed; Sep 19 16:43:44, smartphone | Successful; allowed | Self / self | HTTP 200, self-canonical. |
| Little Miami Kelley–Milford | Indexed; Sep 17 21:53:25, smartphone | Successful; allowed | Self / self | Sep 21 11:41 live test successful. Rendered title, gauge 10.24 ft, weather, score 0 and update time visible. |
| Namekagon Big Bend–Trego | Indexed; Sep 20 10:02:31, smartphone | Successful; allowed | Self / self | HTTP accessible. Inspection showed temporary sitemap-processing error despite successful global sitemap report; not proof of global sitemap failure. |
| Pine Lincoln–County W | Alternate with canonical; Sep 8 02:42:41 | Successful; allowed | Homepage / homepage | Sep 21 11:43 live test successful but homepage canonical. Google-selected canonical is not provided by a live test. |
| Erie Canal Little Falls–Lock E18 return | Unknown to Google; no crawl/sitemap association | No stored fetch or permissions available | Not available | Not in public sitemap and returns homepage 200; local new file is not proof it has been published. |

The largest losing inspected route is still indexed and was crawled after restoration. JavaScript rendering works on that tested page; this does not prove all page templates render correctly. General/hub/river templates passed the 36-URL HTTP/canonical sample. A complete internal-link crawl and orphan report were not produced; current sitemap inclusion and isolated rendered links cannot establish that every route has a discoverable HTML link path. For newly published routes, first verify deployment, sitemap membership, and links from their state/river hubs before interpreting “unknown to Google.”

### Sitemap and robots

GSC sitemap report: Success, last read September 19, submitted September 8, 3,340 discovered URLs. Current public sitemap index and child `sitemap-0.xml` return 200; current child contains 3,213 URLs. The differing totals reflect different snapshots and do not alone indicate corruption. No `lastmod` values were present; their absence is not an indexing blocker. Add them only if based on genuine substantive updates.

Robots.txt returns 200, allows the public site, and disallows `/admin/` and `/alerts/unsubscribe/`. Utility favorites/request-river/404 pages and the tested Pine/Juniata/Erie paths were absent from the current sitemap. The sitemap sample had no wrong canonicals/noindex; all 3,213 URLs were not fetched.

## Other causes checked

- **Manual actions and Security Issues:** clear. This rules out reported manual/security actions, not algorithmic evaluation.
- **Removals:** no requests in the last six months across Temporary removals, Outdated content, and SafeSearch filtering.
- **Messages:** reviewed the 23-message list and opened the August 23 canonical notification. September messages concern validation started/failed; earlier performance milestones support prior growth. No manual-action/security notification in that list.
- **HTTPS:** zero non-HTTPS issues; 50 reported HTTPS pages, no issues over 90 days. This is a report population, not the total indexed URL count, and does not override today's www renewal warning.
- **Core Web Vitals:** insufficient usage data for mobile and desktop. This is not a passing score.
- **Breadcrumbs:** 41 valid, zero invalid. No evidenced rich-result defect explaining the collapse.
- **Deployment/configuration:** sampled August 20 template changes concerned labels; no accidental noindex was found in that sampled diff. The current local 404 configuration conflicts with production behavior. An exhaustive historical deployed-artifact comparison was not possible. Live route titles already include distinct reach/state information; do not repeat an older recommendation to implement titles that now exist.
- **Google update:** official August 2026 spam update ran August 18–21 and overlaps the August 19 break. That increases plausibility of an algorithmic contribution but is not evidence the site violated a policy. Review substantive route usefulness on a bounded sample, not a speculative wholesale rewrite.
- **Reporting incidents:** official anomalies checked included August Discover logging and August 13–17 generative-AI impression reporting, fixed August 21. Neither establishes a general Web-reporting defect matching this sustained collapse.
- **Demand/seasonality:** plausible secondary influences for paddling, but an abrupt cross-route ~99% reduction is not adequately explained by seasonality from the available evidence. No reliable year-over-year control series was available.

## Prioritized findings and precise proposed fixes

| Priority / severity | Finding and affected area | Evidence/date | Likely traffic impact / confidence | Corrective action and verification |
|---|---|---|---|---|
| P0 urgent operational risk | www certificate renewal failed; expiry Oct 1 | Azure Unhealthy + independently inspected TLS certificate, Sep 21 | Future www failure if unresolved; high confidence. Does not explain today's apex ranking loss. | Diagnose managed-certificate renewal against current DNS validation and Azure binding; repair renewal while preserving intended www→apex redirect. Verify Azure Ready and a newly issued certificate with later expiry, then HTTPS hostname/path redirect tests. Do not delete a working binding blindly. |
| P1 high | Missing river URLs serve homepage 200 | HTTP checks + Pine GSC live test, Sep 21 | Wrong canonical/duplicate signals and wasted crawling for affected paths; high confidence, sitewide ranking effect unproven. | Inspect deployed static config/artifact and CDN rewrite/cache rules. Return real 404/410 for absent routes, or one-hop 301 to an actual equivalent. No blanket redirect to homepage. Verify Pine, retired Juniata, random absent path, and valid Little Miami through apex/www; valid route must remain 200/self-canonical. Retest after cache invalidation/expiry. |
| P1 high investigative priority | Previously successful indexed routes lost nearly all visibility | Web comparison, recent successful URL inspections | Direct explanation of lost clicks is lost impressions/rankings; high confidence. Root cause uncertain. | Compare the ten largest losing routes with actual served preincident versions: access details, reach identity, gauge relevance, stale/misleading conditions, source attribution, unique practical information, and HTML navigation. Prioritize demonstrable defects. Separate impacted indexed cohort from unpublished/new backlog. |
| P2 medium | Large discovered/crawled indexing backlog | 2,249 discovered / 274 crawled, Sep 17 | Limits catalog reach; high confidence in counts, uncertain historical traffic contribution. | Export exclusions, join current canonical sitemap, inspect a stratified sample (top former performers, new routes, states/templates). Resolve technical issues per URL, strengthen useful pages/internal paths where deficient. Avoid mass indexing requests. |
| P2 medium | Historical 403 examples under validation | Two URLs; validation began Sep 20 | Potential narrow access issue; current failure unconfirmed. | Fetch exact examples, inspect live Google tests, correlate verified Googlebot with origin/CDN logs. Change WAF only if a rule is evidenced; do not broadly disable protection. |
| P2 medium | Incident observability cannot establish start/duration | DNS-only interval and missing origin logs | Prevents confident causal attribution; high confidence in limitation. | Recover Azure availability/deployment/binding history and origin logs for Aug 14–30, especially Aug 18–20. Distinguish DNS failures, HTTP 404 binding responses, TLS, 5xx, and successful requests. |

### Confirmed versus hypothetical

**Confirmed events/defects:** August 25 expired Azure binding and repair; August 19 visibility break; current incorrect missing-route responses; failed www certificate renewal; important pages currently indexed and recently fetched.

**Plausible contributors:** the August hosting failure, duplicate/missing-route handling, and a substantial new-page indexing backlog. None has been quantified as the cause of the entire loss.

**Unverified hypotheses:** algorithmic reassessment during the spam update; intermittent origin/WAF failures; substantive page-quality problems. No penalty, policy violation, prolonged continuous outage, or universal content defect is established.

**Evidence against DNS as the complete ongoing explanation:** healthy current resolution and IPv6; successful recent Google crawls; indexed self-canonical former winners; sustained poor impressions after restoration; no proven August 19 DNS failure. **Evidence against an algorithm-only explanation:** a real expired binding existed and current routing problems are demonstrable. Multiple causes remain possible.

## Recovery plan

### Immediate, next 24–48 hours

1. Resolve the www renewal warning before October 1. Estimated engineering effort 1–3 hours, provider issuance/support timing uncertain. Acceptance: Azure Ready, later actual peer-certificate expiry, clean HTTPS redirects.
2. Restore real missing-route status behavior in the production deployment. Estimated 2–4 hours plus rollout/cache observation. Acceptance: invalid routes 404/410 or justified equivalent 301; representative valid pages 200/self-canonical; Google live test sees the intended content/status.
3. Preserve/export current performance and indexing evidence before further changes. Estimated 30–60 minutes. Record deployment SHA, sitemap count, and exact affected URL list so subsequent change effects can be distinguished.

### This week

1. Investigate the ten top losing routes and 20–30 stratified excluded canonical URLs, with a dated worksheet of index status, crawl, canonical, content, hub links, and intended lifecycle. Estimated 4–8 hours. Remedy concrete issues, then request indexing only for a small set of materially repaired priority pages where appropriate; several key pages were already submitted September 8.
2. Reconcile published catalog, generated files, sitemap and hub links; explicitly distinguish unpublished local additions such as the Erie sample from deployed pages. Estimated 2–4 hours. Produce an orphan/missing-file report before adding more URLs.
3. Retrieve incident-period origin/availability evidence and deployed configuration versions. Estimated 1–3 hours if retained. If unavailable, retain the uncertainty rather than replace it with Cloudflare analytics inference.

### Ongoing measurement (proposed; no automation created)

- Daily operational checks of apex/www HTTPS, certificate expiry, robots, sitemap, one valid route, and one absent route; alert on changed status, wrong canonical, or origin failure.
- Weekly, compare complete seven-day windows with matching weekdays: Web impressions/clicks, the fixed top-ten route cohort, and observed nonbrand query subset. Keep device/country filters consistent. Exclude preliminary days.
- Track sitemap-canonical coverage rather than all known URL exclusions. Successful recrawls, correct Google canonical selection, and a shrinking *important-page* backlog are technical recovery indicators.
- Ranking recovery requires sustained impressions across several formerly successful routes and returning nonbrand clicks; isolated homepage clicks or total indexed-count growth are insufficient.
- After fixes are verified, if two consecutive complete weekly windows remain flat/down, escalate the content/competitor and historical deployment investigation. This is an investigation trigger, not a promised recovery window. If Google live tests fail or host warnings recur, investigate immediately rather than waiting.

## Missing evidence that would materially change the diagnosis

1. Origin/CDN request and uptime history for August 14–30, with verified Googlebot identity and response status; especially August 18–20.
2. Exact DNS/hosting change that started the problem, plus audit timestamps and deployment artifacts around the initial break.
3. Full exported daily Crawl Stats and a URL-level join of indexed/excluded history against the evolving intended sitemap.
4. Website analytics Google-organic series, if available, to independently compare visitor impact and landing behavior.
5. Full internal-link/orphan crawl and a comparison of substantive content on formerly ranking pages against earlier deployed versions and current competing results.

## Reference sources

- [Google: debugging Search traffic drops](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops)
- [Google: August 2026 spam update incident](https://status.search.google.com/incidents/LEubPCm2octf2uMqCFKE)
- [Google: spam updates](https://developers.google.com/search/docs/appearance/spam-updates)
- [Google: HTTP status handling](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes)
- [Google: DNS and network errors](https://developers.google.com/crawling/docs/troubleshooting/dns-network-errors)
- [Search Console: Crawl Stats](https://support.google.com/webmasters/answer/9679690?hl=en)
- [Search Console: Page indexing](https://support.google.com/webmasters/answer/7440203?hl=en)
- [Search Console: URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en)
- [Search Console: data anomalies](https://support.google.com/webmasters/answer/6211453)
- [Cloudflare: proxied versus DNS-only records](https://developers.cloudflare.com/dns/proxy-status/)
- [Azure Static Web Apps: custom domains](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain)

The authenticated property reports and Azure responses supply the site-specific evidence; these public references explain interpretation and update timing. This report supersedes any earlier assertion that absent Cloudflare edge traffic alone proved an uninterrupted August 27–29 outage.
