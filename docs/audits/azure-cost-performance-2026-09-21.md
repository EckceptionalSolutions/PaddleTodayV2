# Azure cost and performance review — 2026-09-21

The highest-confidence saving is moving frequently rewritten Blob data from **Cool to Hot**, initially preserving RA-GRS redundancy. The strongest performance opportunity is reusing snapshot reads, normalized data, and compressed responses on the existing B1 API. Downsizing the API is not recommended with its current memory utilization.

This was a read-only review of Azure resources, Cost Management, Azure Monitor, public HTTP responses, and the current working tree. No Azure resources, application code, deployment configuration, or existing documents were changed. Repository recommendations describe the current checkout; deployed code may differ.

## Evidence and scope

- Azure resource group: `paddletoday`, primarily Central US. Included the default Central US Log Analytics workspace used by both Application Insights resources.
- Costs: Azure Cost Management `ActualCost` / `PreTaxCost`, month-to-date September 1–21, queried September 21. These are posted USD costs, subject to ingestion lag and a partial final day, not a final invoice or forecast. Subscription-level API version `2023-03-01` succeeded after resource-group queries returned HTTP 429. Results had no additional page.
- Infrastructure metrics: September 14 00:00 through September 21 00:00 UTC. Plan metrics were aggregated hourly; request latency percentiles came from recorded Application Insights requests, not hourly Azure Monitor averages.
- Blob data-plane listing was denied to the current identity. Container names and account metrics were available; per-container byte counts, explicit blob tiers, and retained snapshot counts were not verified. No account-key fallback was used.
- Azure Advisor returned no Cost recommendations. The workload-specific findings below come from billing, metrics, and code inspection.

## Observed spend

| Resource | Configuration | Posted September MTD cost |
| --- | --- | ---: |
| Blob/storage account `paddletoday` | StorageV2, **Cool**, Standard_RA-GRS | **$30.07** |
| API plan `ASP-paddletoday-9013` | Linux B1, one instance | $8.77 |
| Static Web App `PaddleToday` | Standard, linked to App Service | $3.74 |
| Registry `paddletodayjobs` | Basic | $3.39 |
| Jobs and default Log Analytics workspaces | 30-day retention | $0.00 |
| **Total returned for the reviewed groups** | | **$45.96** |

Container Apps and Communication Services did not have separately priced rows in this result. Their absence is not a guarantee of no future charges. Static Web Apps had no posted charges in the September 14–20 subset despite its live Standard SKU; do not use that partial billing pattern to assume the service is permanently free. This review excludes GitHub, DNS/Cloudflare plans, mobile services, taxes, and other non-Azure charges.

Storage is 65% of the returned total. Its breakdown is decisive:

| Storage meter | September MTD |
| --- | ---: |
| **Cool GRS Write Operations** | **$28.7131** |
| Geo-replication transfer | $0.5420 |
| Cool Read Operations | $0.3668 |
| Cool Data Retrieval | $0.2581 |
| Cool RA-GRS Data Stored | $0.1278 |
| Other operations / transfer | approximately $0.0611 |

## 1. Move active Blob workloads to Hot — first cost change

The account default is Cool. Snapshot generation overwrites every scored route plus two summary blobs every 30 minutes (`src/lib/river-snapshots.ts:164`). Hourly history capture also performs two reads and two writes per scored route (`src/lib/history.ts:114`). Cool is a poor economic fit for those operations.

Microsoft's Central US USD Retail Prices API returned these consumption rates for `General Block Blob v2`:

| Meter | Cool RA-GRS | Hot RA-GRS |
| --- | ---: | ---: |
| Writes per 10,000 | $0.20 | $0.10 |
| Reads per 10,000 | $0.01 | $0.004 |
| Retrieval per GB | $0.01 | No Cool retrieval charge |
| Stored GB-month, first capacity tier | $0.025 | $0.046 |

Repricing the same $28.7131 MTD write volume at the Hot rate saves **$14.3566**, before capacity and transition differences. That is approximately **31% of the entire returned MTD bill** from writes alone.

The last full week recorded **638,403 PutBlob operations**. At unchanged volume for 30 days, halving the write rate saves approximately **$27.36/month**. Extrapolating the MTD write saving over the 21 calendar dates gives approximately **$20.51/month**. Thus **$20–27/month is a planning range**, not a guaranteed forecast; it assumes the busy writes move to Hot, similar future volume, and the observed retail rate ratio applies. At the observed capacity peak of 13.8 GB, the Hot storage premium would be only about **$0.29/month** if that capacity were held throughout the month. Read/retrieval savings would partly offset it.

Implementation:

1. Inspect explicit versus inherited tiers on representative snapshot, active history, and intake blobs with a data-reader identity.
2. Set active workloads to Hot. If their tiers are inherited, changing the account default can be the simplest path. Explicit Cool tiers need an explicit migration; changing the default will not override them.
3. Preserve RA-GRS initially. Verify new writes use Hot, readers remain healthy, and subsequent Cost Management meters change as expected.
4. Keep genuinely old, infrequently read history in Cool only under a retention policy aligned with product requirements.

Budget for one-time retrieval/read operations and possible minimum-duration charges during migration. Hot is a cost optimization here, **not an inherent latency improvement**: Microsoft describes Hot and Cool as having the same retrieval latency and throughput characteristics. [Access-tier behavior and transition charges](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview), [Retail Prices API](https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices).

## 2. Reuse snapshot processing on B1 — first performance change

| Recorded API operation, September 14–20 | Samples | Mean | p95 |
| --- | ---: | ---: | ---: |
| River summary | 602 | 2.86 s | **6.57 s** |
| Explore catalog | 602 | 3.52 s | **4.83 s** |
| Weekend summary | 190 | 3.80 s | **7.39 s** |

Live GET spot checks agreed with the general pattern: summary TTFB was 3.49–4.96 seconds through Cloudflare on misses/expiry, 2.26 seconds at the direct API, and **0.22–0.23 seconds on Cloudflare hits**. These were a few sequential reads, not a load test or an isolation of server bottlenecks.

The current code exposes several avoidable repeated operations:

- `src/lib/river-snapshots.ts:198` rereads the full summary from Blob on each call. Detail and weekend reads likewise have no snapshot-specific cache. `createJsonStorage` always GETs and parses; it exposes an ETag but does not perform conditional revalidation.
- `src/lib/explore-catalog.ts:17` runs fallback scoring and serialization for every route even when a current score exists, then primarily uses the fallback's route metadata.
- `src/server/http.ts:31` serializes the whole response, and line 35 runs **synchronous gzip** on the request thread. Compression already exists; simply enabling gzip is not a new improvement.
- Live decoded payloads were approximately **7.12 MB summary**, **10.19 MB Explore**, and **2.79 MB weekend**, although gzip reduced transferred bytes to about 550 KB, 851 KB, and 255 KB. Mobile parsing and repeated allocation still pay for decoded size.

Recommended implementation order:

1. Add bounded, in-flight-deduplicated snapshot caching with a short revalidation interval (start at 30–60 seconds). Use conditional reads where useful; cache by snapshot generation and catalog revision.
2. Cache normalized summary/Explore content. Precompute static route metadata per catalog revision instead of scoring every route merely to obtain metadata.
3. Cache compressed public response representations where practical, or use asynchronous compression. Maintain `Vary: Accept-Encoding`; keep per-request IDs in headers if the API contract permits. A body request ID and continuously changing snapshot age prevent blindly reusing identical response bytes.
4. Consider a smaller Explore DTO with detail-only fields fetched on demand; measure client parse time as well as transfer size.

Preserve the two-hour stale-data boundary and recalculate freshness when serving cached data. Bound caches by bytes/count, evict expired entries, and do not globally cache authenticated or mutable intake data. The existing generic cache retains entries in a Map after expiration, so it should not be reused for unbounded snapshot generations without eviction.

Validate warm/cold latency, memory, freshness across a generation change, and existing snapshot failure behavior. An initial target is warm summary/Explore p95 below one second, **a target rather than a measured or promised result**. The code findings identify plausible contributors; telemetry does not currently prove how much time each contributes.

## 3. Correct the edge/browser freshness mismatch

Direct API summary response:

```text
Cache-Control: public, max-age=60, s-maxage=180, stale-while-revalidate=600
```

Public Cloudflare response:

```text
Cache-Control: public, max-age=14400, s-maxage=180, stale-while-revalidate=600
```

The public path advertises **four hours of browser freshness**, beyond the application's two-hour snapshot stale threshold. Review the Cloudflare browser-TTL/header override and align it with the origin's freshness policy. Edge hits are already fast, so extending browser TTL is not the preferred way to improve performance. Inspect the actual Cloudflare rule before editing; only the response difference, not the rule responsible, was verified. Avoid caching writes, admin pages, tokens, or personalized responses.

## 4. Reduce writes and repeated background scoring

The account recorded 859,576 total Blob transactions in the week, including 638,403 writes, 155,869 reads, and 65,155 property reads. Costs are transaction-driven, not capacity-driven.

Hourly history capture recomputes all live scores separately from the half-hour snapshot worker, then rewrites both today's hourly samples and each route's daily summary. A follow-on design can consume an agreed snapshot generation, retain hourly samples, and finalize historical daily summaries once per day. The read API would derive today's daily aggregate from current samples, so existing charts remain current. That changes history semantics and requires validation of timezone boundaries, missed runs, retries, and sample timing.

Reducing only the daily-summary writes from 24 to one per day removes **23 of 48 history writes per route-day (48%)**, not 48% of all storage writes. Per-container usage was not available, so do not turn that percentage into a verified dollar saving. Evaluate savings at **Hot rates after item 1** to avoid double counting.

Separating reconstructible snapshots into a Hot LRS or ZRS account is another option. Retail writes are $0.05/10,000 for Hot LRS and $0.0625/10,000 for Hot ZRS, versus $0.10 for Hot GRS. Apply that only to reconstructible data after defining recovery behavior. Do not downgrade the shared account containing user submissions and history merely to cheapen snapshots. RA-GRS to GRS alone leaves the GRS write meter unchanged and would save little of the dominant charge. [Redundancy tradeoffs and account-level scope](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy).

## 5. Keep the API size and worker schedule for now

The API runs Node 22 with Always On enabled on one Linux B1 instance:

- Plan CPU: 26.3% mean of hourly averages; maximum observed 99%.
- Plan memory: **82.2% mean, 94% maximum**.
- App memory working set: about 465 MB mean / 592 MB maximum. This differs from whole-plan memory and does not by itself explain all plan usage.
- HTTP queue length: zero in returned measurements.
- 25,484 requests and 23 HTTP 5xx responses at the platform level.

Do not downgrade to a free/shared tier, add Node worker processes, or move scheduled scoring onto this instance before reducing memory/CPU work. Keep Always On. B1 retail is $0.018/hour, about $13.14 per 730-hour month; the realistic saving from replacing it is modest relative to migration and cold-start risks.

The Container Apps job already has a sensible shape: 1 vCPU / 2 GiB, one replica, every 30 minutes. The last 100 completed execution records had median 82 seconds, mean 96.6 seconds, p95 156 seconds, and maximum 491 seconds. At the recent mean, a 30-day scheduled-only model uses approximately 139,147 vCPU-seconds / 278,294 GiB-seconds, below the subscription's monthly consumption grants **if available**. This excludes failed attempts, retries, manual runs, and other apps. [Job billing and subscription grants](https://azure.microsoft.com/en-us/pricing/details/container-apps/).

Measured worker CPU averaged approximately 0.63 cores in populated metric buckets; peak memory was approximately 513 MB. Halving CPU could slow runs, and may save no billed money while under the grant. Preserve the 30-minute freshness cadence; consider right-sizing only after measuring complete billed execution consumption.

## 6. Smaller improvements and operational gaps

- **Deployment churn:** API and frontend workflows run for every main/master push without path filters or deployment concurrency. The worker filter includes all `src/**`. Excluding documentation/mobile-only changes from irrelevant deployments and serializing production releases can reduce build work and API restarts. Keep route/catalog changes in the relevant dependency sets. The API runs TypeScript through `tsx`; benchmarking a compiled runtime is worthwhile, but no measured saving is claimed.
- **Registry:** Basic uses only 0.412 GB of its included 10 GiB. Pruning images is housekeeping, not an immediate storage saving. Replacing ACR might remove roughly $5/month of fixed cost, but introduces registry/authentication dependencies; low priority. ACR Tasks builds are usage-metered, so narrow unnecessary build triggers first. [Registry pricing](https://azure.microsoft.com/en-us/pricing/details/container-registry/).
- **Telemetry:** last 30 days showed approximately 780 MB of billable application-workspace ingestion and 392 MB of worker logs, while returned posted workspace cost was $0. Performance counters dominated application volume (675 MB), so indiscriminate request-trace sampling would miss the main volume source. Verify whether the App Service instrumentation extension and code-based Azure Monitor setup overlap; duplicate telemetry was not proven. Avoid deleting either Application Insights resource solely because there are two.
- **Retention:** seven-day Blob and container soft delete are enabled, versioning is not reported enabled, and no lifecycle policy exists. Overwrite retention may explain part of the 9.89 GB average / 13.81 GB peak capacity, but this was not verified per blob. Capacity charges are currently tiny; retain recovery protection for user data and prioritize the write meter.
- **Monitoring drift:** the repository defines two snapshot alerts and an action group, but none of those resource types were returned by the subscription inventory. Logs show **17 terminal failed executions on September 17**, amid 328 successful terminal executions during September 14–20. Do not remove failure controls to save money. Verify/provision intended alerts as a separate reliability task; new alert rules may have a small cost.
- **Health checks:** App Service has no configured health-check path although `/api/health/ready` exists. Evaluate enabling a lightweight liveness/readiness check with correct single-instance expectations. It is not a substitute for snapshot-freshness monitoring.

Keep Static Web Apps Standard while using the linked App Service backend: bring-your-own API integration requires Standard. Moving to Free is an architecture change, not a safe tier toggle. [Static Web Apps API support](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview).

## Recommended sequence

1. Verify active blob tiers and move busy data to Hot while preserving redundancy; compare write meters after billing catches up.
2. Implement bounded snapshot/Explore/response caching and measure p95 and memory on B1.
3. Align the public browser TTL with the origin freshness contract and verify stale behavior.
4. Reduce unnecessary deployments and validate missing monitoring.
5. Reassess history write batching and a separate reconstructible-data account using post-Hot costs.

No new Redis, database, Front Door, larger VM, or always-on container is needed to pursue the first three improvements.
