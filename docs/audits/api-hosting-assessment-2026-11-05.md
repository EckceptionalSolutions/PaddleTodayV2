# API hosting assessment — November 5, 2026

Keep the existing B1 API for this rollout. Its measured cost is approximately $12.96 per 30 days, and the evidence does not support counting that whole amount as an additional serverless saving. No replacement compute resource or paid commitment was created.

## Measured usage

Azure Monitor's complete UTC window October 29 through November 4 contains 168 hourly observations. The plan is Linux B1 with one instance. Plan CPU averaged 13.51% and peaked at 98%; plan memory averaged 72.35% and peaked at 94%.

Application-specific memory is lower than the whole-plan percentage: working set averaged 417.76 MiB and peaked at 505.85 MiB. App CPU time totaled 3,765 seconds during that week. These measurements do not establish safe headroom in a 512 MiB replacement; a 1 GiB container would be a more reasonable initial candidate for a separately measured pilot.

The app received 14,963 metric-counted requests, with a peak of 761/hour. This includes platform/monitoring traffic. Application Insights recorded 12,345 non-health API requests in the same window: mean duration 284.65 ms, median 34.72 ms, p95 1,586.85 ms. A further 2,044 frontend/other requests and 260 health requests were recorded. Instrumented request durations are observed application timings, not an end-to-end latency guarantee or a measurement of future cold starts.

## Consumption scenarios

The current Central US USD Retail Prices API lists Container Apps Standard active vCPU at $0.000024/second and active memory at $0.000003/GiB-second. Idle vCPU and memory both cost $0.000003 per respective second. The first monthly grants are shared across the subscription, including the existing snapshot worker and other applications.

API traffic is distributed throughout the week. As a scenario, extending each recorded non-health API request by a 300-second retention window, merging overlaps, retains one replica for approximately 545,526 seconds/week (90.2%). This is an inferred scenario, not an actual Container Apps execution or a requirement that every scaler use that delay.

At 0.5 vCPU / 1 GiB and minimum zero, that scenario costs about $35.07 per 30 days before grants, or $29.67 even if the entire subscription's 180,000 vCPU-second and 360,000 GiB-second grants were available solely to this API. Existing jobs already consume part of those grants. A replica above the configured minimum is charged at active rates, so low average CPU alone does not make this arrangement free.

Keeping one minimum replica may permit idle billing and avoid cold starts, but an entirely idle 0.5 vCPU / 1 GiB allocation already prices around $11.66/month before grants; actual active windows, background CPU/network activity, logging, and build costs change the result. The potential improvement is much smaller than the $12.96 gross hosting ceiling and has not been proven under load.

Shorter scale-down retention or an Azure Functions conversion may produce different economics. They require a separate compatibility/cold-start pilot, including Firebase, Blob storage, intake writes, cookies, streaming downloads, and response latency. They are not included in the current savings estimate. App Service deployment/restart times are not used as a proxy for consumption-platform cold starts.

Sources: [Container Apps billing and idle eligibility](https://learn.microsoft.com/en-us/azure/container-apps/billing), [Azure Retail Prices API](https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices). The raw metrics, exact price query/results, aligned Application Insights aggregates, and gap calculation remain in `.local/api-hosting-*.json` and `.local/api-consumption-prices.json`.

Frontend fee removal and history transaction batching remain the more concrete next savings. Revisit API hosting after those are deployed and a cheaper alternative can demonstrate comparable reliability and latency.
