# Azure cost follow-up — November 4, 2026

**The changes reduced the price of active writes, but the monthly Azure bill has not gone down.** October's reviewed cost was **$77.73**, compared with **$62.37** in September: **+$15.36 / +24.6%**. Adjusting for October's extra day, average daily spend increased **20.6%**.

Hot writes avoided approximately **$25.80 in October** versus charging that same write volume at the observed Cool rate. Higher transaction volume, intermittent Cool-write spikes, more posted Static Web Apps charges, and a weather-error log flood outweighed those savings.

This was a read-only production review. No application, Azure resource, tier, retention policy, or schedule was changed. Analysis and evidence were saved locally.

## Scope and method

- Azure subscription `Main`; primary scope is resource group `paddletoday`, plus the Central US default Log Analytics workspace used by its Application Insights resources. Other subscription resource groups are shown separately below.
- Azure Cost Management `ActualCost`, summed `PreTaxCost`, USD, September 1–October 31; queried November 4. A second query included storage `UsageQuantity`. Both returned all rows with no continuation link. November 1–3 was queried separately and is provisional.
- Daily windows use **UTC**, including workflow timestamps. All before/after values were re-queried together; the September 21 audit's partial MTD total is not treated as a full month.
- Azure Monitor metrics cover October 25 00:00–November 1 00:00 UTC. Log queries extend through November 3. History workflow metadata was read from GitHub.
- Posted costs are pretax usage estimates, not an invoice. Recent data can lag up to 72 hours; monthly free-benefit resets also make early November a poor forecast. [Microsoft cost-data guidance](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/understand-cost-mgt-data).
- The $0.19 default-workspace charge is the **entire shared workspace**, not proven exclusive Paddle Today spend. The jobs workspace also contains another project's very small digest logs; sampled volume was approximately two console rows/day versus hundreds of thousands of Paddle Today rows during the flood.
- Authenticated Blob listing was denied. Explicit tiers and costs cannot be attributed to individual containers with the present identity. No account-key fallback was used. Storage Blob Data Reader would permit a more precise next audit.

## What actually changed in the bill

| Resource / cost | September | October | Change |
| --- | ---: | ---: | ---: |
| Blob account `paddletoday` | $40.67 | $47.29 | +$6.62 |
| API B1 plan | $12.96 | $13.39 | +$0.43 |
| Static Web Apps | $3.74 | $7.19 | +$3.45 |
| Container registry and builds | $5.00 | $5.46 | +$0.47 |
| Jobs Log Analytics workspace | $0.00 | $4.19 | +$4.19 |
| Shared default Log Analytics workspace | $0.00 | $0.19 | +$0.19 |
| Email | $0.00 | <$0.01 | <$0.01 |
| **Reviewed total** | **$62.37** | **$77.73** | **+$15.36** |

Displayed amounts are rounded; totals use unrounded costs. No separately priced Container Apps job compute rows appeared in these results. This does not establish permanent free compute.

B1's increase is the extra calendar day at $0.432/day. Static Web Apps had no priced Standard App rows on several September dates and early October dates; sustained charges later in October account for its increase. The live SKU is still Standard. The billing pattern alone does not establish why those earlier dates were uncharged or prove a SKU change.

## Did the optimizations work?

**Yes, at the unit-price level.** Billing shows Cool GRS writes at **$0.20/10,000** and Hot GRS writes at **$0.10/10,000**, matching the original expected 50% reduction. Hot write charges appear from September 21, following the recorded tier migration. The repository also includes the later bounded-cache and asynchronous-compression changes.

October contained about **2,579,853 Hot write operations**, costing **$25.79853**. At the billed Cool rate those same operations would cost **$51.59706**. The difference is **$25.79853 of avoided write charges**, before capacity, read, or migration effects. This is a same-volume pricing comparison, not a claim that every operation would otherwise have occurred unchanged.

Total billed Hot plus Cool write volume increased from approximately **2.28 million in September to 3.43 million in October**, about **50%**. That extra volume helps explain why the storage bill rose despite cheaper active writes.

| Complete UTC window | Total reviewed cost | Storage | Daily total |
| --- | ---: | ---: | ---: |
| September 14–20, before tier migration | $17.55 | $13.36 | $2.51 |
| September 22–28, immediately after | $10.62 | $6.43 | $1.52 |
| October 25–31, latest full October week | $16.67 | $6.01 | $2.38 |

The initial post-change week was **39.5% cheaper overall** and **51.9% cheaper for storage**. Latest-week storage is **55.0% below** the baseline week, but the total is only **5.1% below**, after new log and frontend charges.

Do not attribute the entire storage reduction to optimization: billed writes fell from approximately **636,711 to 520,390** between those weeks, an **18.3% volume reduction**. Failed refreshes and infrequent history captures are material confounders. The 50% Hot unit-price reduction is the stronger evidence of genuine savings.

Excluding logs, the latest week implies approximately **$52.63 per 30 days**; including that week's log charges implies **$71.42**. These are arithmetic run-rate scenarios, not forecasts. Restoring missed work, traffic growth, deployments, and recurring incidents can change them. November 1–3 currently shows **$5.42**, or $1.81/day, subject to billing lag and the monthly benefit reset.

## Further savings, in priority order

### 1. Stop avoidable Cool writes and repeated asset uploads

October still incurred **$16.94 in Cool GRS write charges**. October 8 alone contributed **$7.69**, and October 6–8 plus October 20–21 account for approximately **86%** of October's Cool-write cost.

The account default is still **Cool**. Snapshot/history writers explicitly request Hot, but `scripts/publish-static-assets.mjs` uploads the asset tree to both content-hashed release paths and legacy paths with `--overwrite true`, without specifying a tier. The frontend workflow runs this publisher on qualifying deployments even if the content-derived release already exists.

That makes publishing a concrete optimization target, although billing cannot prove it caused all the spikes:

1. Verify whether the immutable content-hashed release is already complete and reuse it when unchanged.
2. Upload only changed legacy files, using stored content hashes; preserve existing public URLs.
3. Request Hot explicitly for frequently rewritten assets and other active writers that inherit Cool. Inventory workloads before changing the whole account default.

Repricing **all** October Cool writes as Hot would save at most **$8.47 for that month's volume**, before capacity and transition costs. At the much quieter October 25–31 volume, the equivalent saving is only **$0.64 per 30 days**. Preventing repeat spikes matters more than the current residual baseline. Upload deduplication and tier savings overlap; do not add their full estimates together. [Tier behavior and transition billing](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview/).

### 2. Bound repeated upstream-error logging

The jobs workspace incurred **$4.19** of October ingestion charges. Paddle Today's snapshot job generated approximately **2.66 GB** of console logs during October 27–November 1. The largest messages were repeated weather-fetch stack frames; aggregate queries found hundreds of thousands of **HTTP 403** error lines from NWS/weather paths.

Console ingestion reached approximately **713 MB on October 29** and **677 MB on October 30**. Posted worker-workspace charges on those dates were approximately **$1.97 and $1.87**. By November 2–3, job console volume was back below **1 MB/day**. The latest 100 successful execution records are recent, and the latest returned failure was November 1.

Keep upstream failure counts, provider/status summaries, terminal job errors, and representative stack traces. Aggregate duplicate per-location errors and bound stack samples per provider/status/run. Investigate the 403 condition independently; logging changes must not conceal missing weather or bypass the snapshot quality gates.

This is prevention of an incident-driven cost, not a guaranteed $4.19 recurring monthly saving. November's currently zero log charges do not prove the issue would be free if it recurs. [Azure Monitor ingestion billing](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/cost-logs).

### 3. History batching: about $1.50/month at recent frequency

`captureHistorySnapshotForResults` still reads and rewrites both the hourly record and the daily summary per route on each successful capture. Daily summaries could be derived for the current day and finalized once per day.

The workflow declares an hourly schedule, but GitHub returned only **147 runs in October: 75 successful and 72 failed**, and **32 successful runs during October 25–31**. The latest successful history run captured **1,392 routes**. Snapshot success logs independently confirm 1,392 routes on November 2–3.

Assuming that route count for all 32 recent successful history runs, replacing 32 daily-summary writes per route-week with seven saves:

`(32 - 7) × 1,392 × ($0.10 / 10,000) × (30 / 7) = $1.49 per 30 days`

This is a model, not verified history-container billing. At a fully functioning 24-captures/day cadence, the corresponding saving would be about **$9.60/month**, but current execution frequency does not support claiming that saving today. Investigate missing/failed captures as a reliability issue; do not treat doing less work as a successful optimization. Any redesign needs backward-compatible reads, DST/midnight handling, catch-up, and preserved hourly history.

### 4. Registry replacement is optional, with a small ceiling

October registry charges were **$5.16 fixed Basic registry cost plus $0.30 build cost**. Current stored image bytes are approximately **2.0 GiB** against **10 GiB included**. Pruning images will not remove the fixed charge or save current storage overage.

An already suitable shared or external registry could remove roughly **$5/month**, but requires a verified authentication, deployment, and rollback path. It is lower priority than avoiding transaction spikes. [Registry pricing and included storage](https://azure.microsoft.com/en-us/pricing/details/container-registry/).

## Hosting decisions

- **Keep B1 and Always On.** October 25–31 CPU averaged **13.8%**, but whole-plan memory averaged **72.4%**, with a **93% maximum**. CPU improved versus September's 26.3%, and memory improved versus 82.2%, but there is insufficient memory headroom to recommend downsizing. Current B1 cost is only about $13/month.
- **Keep the worker cadence and allocation for now.** It remains 1 vCPU / 2 GiB every 30 minutes, with up to three retries. Recent successful runs averaged **82.6 seconds**, median 81, p95 96, maximum 226. A successful-only 30-day model is about 119,000 vCPU-seconds and 238,000 GiB-seconds. Retries, failed executions, and other subscription workloads are additional. Azure's consumption grants are subscription-wide; no compute savings are established by shrinking an already unpriced workload. [Container Apps job pricing](https://azure.microsoft.com/en-us/pricing/details/container-apps/).
- **Keep Static Web Apps Standard while linked to App Service.** Bring-your-own API integration requires Standard. Its latest steady posted charge is approximately $0.296/day, or $8.88 per 30 days. A Free-tier move requires an architecture change. [Microsoft API plan requirements](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview).
- **Capacity cleanup is secondary.** October Hot plus Cool stored-capacity charges totaled only **$0.90**, versus **$42.74 for writes**. Mean Blob capacity in the measured week was approximately 23.4 GB, peak 29.8 GB. Preserve recovery protections and old public asset URLs; blanket deletion has little cost upside here.
- **A separate reconstructible-snapshot account remains optional.** LRS/ZRS may reduce replication cost, but only after measuring snapshot-specific writes and defining recovery requirements. Redundancy applies to the entire account, so do not downgrade the account holding user data/history based on snapshot economics alone. [Redundancy scope and tradeoffs](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy).

Recorded API telemetry also suggests improved performance: river summary mean/p95 was approximately **1.77/3.32 seconds** over 250 recorded requests, versus September's 2.86/6.57 seconds. Traffic and routes differ, so this does not isolate the caching change. Weekend summary had only eight recorded requests and a 23.36-second p95; there is insufficient evidence to declare all latency targets met.

Azure Advisor returned no Cost recommendations. The targeted findings above come from actual billing, metrics, logs, and code.

## Subscription context and evidence

The **whole subscription** increased from **$64.28 in September to $82.94 in October**. Paddle Today's group accounted for $62.37 and $77.53 respectively; the extra $0.19 in the reviewed October total is the shared default workspace. `assumable-homes` increased from approximately $1.88 to $5.18; other groups were approximately $0.03/month combined. These additional workloads were not optimized or changed by this review.

The best next implementation is to make asset publishing reuse unchanged content and explicitly choose the appropriate tier, then add bounded upstream-error reporting. Reconcile subsequent complete billing weeks against successful captures and route counts. History batching and registry replacement have smaller current dollar returns.

- [Machine-readable calculations and supporting aggregates](azure-cost-follow-up-2026-11-04.json)
- [Original September audit](azure-cost-performance-2026-09-21.md)
- [Original optimization plan and rollout log](../operations/azure-optimization-plan-2026-09-21.md)
- Raw query responses, request bodies, and the calculation helper: `output/azure-cost-2026-11-04/` (local supporting evidence, not committed).

The execution-list API returned 100 successful and 100 failed records spanning different dates; this retention-shaped list must not be interpreted as a 50% current failure rate. History workflow counts above use explicitly filtered UTC timestamps from the returned workflow history.
