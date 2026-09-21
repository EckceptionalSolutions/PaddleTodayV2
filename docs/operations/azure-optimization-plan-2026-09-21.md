# Azure optimization implementation plan

Created: 2026-09-21. Status: implementation in progress; code changes are ready for review, and production rollout remains pending deployment.

## Implementation status — 2026-09-21

- Completed in the repository: bounded snapshot read caching with concurrent-load coalescing and invalidation, catalog metadata reuse for scored Explore routes, Hot access-tier headers for future snapshot/history writes, production workflow path filters/concurrency groups, route/source typecheck cleanup, and a guarded Blob tier inventory/apply/verify helper ([runbook](azure-storage-tier-rollout.md)).
- Pending production rollout: deploy the API/worker packages, verify existing blob tiers and set currently active blobs to Hot, then compare seven days of posted storage meters.
- Still pending: response/compression profiling, Cloudflare browser-TTL correction, history write batching, and monitoring permissions/alert verification.

Based on the [live Azure cost and performance audit](../audits/azure-cost-performance-2026-09-21.md). Implement the storage saving and API improvements first, measure them separately, then decide whether the remaining work justifies its complexity.

## Outcomes and constraints

| Outcome | Baseline | Acceptance target |
| --- | --- | --- |
| Cheaper active storage writes | Cool GRS writes: $28.71 September MTD | Targeted writes billed as Hot; approximately 50% lower write-unit cost at the same redundancy |
| Faster boards on current hosting | Summary / Explore / weekend p95: 6.57 / 4.83 / 7.39 seconds | At least 50% lower comparable origin p95; warm summary/Explore p95 below one second is the stretch target |
| Accurate freshness | Origin browser TTL 60 seconds; public response 14,400 seconds | Public API honors intended short browser TTL; cached data crosses the stale boundary correctly |
| Controlled memory | B1 plan memory mean 82.2%, maximum 94% | No sustained increase over a comparable baseline, unbounded cache growth, or new memory-related restarts |
| Less background work | 638,403 account PutBlob calls in seven days | Measure writes per successful refresh and per history route-hour; decrease without dropping required samples |

The $20–27/month storage saving is a volume-dependent estimate, not a release gate. Compare unit cost and normalized workload first, then actual spend after billing catches up. Count subsequent savings at Hot prices rather than double-counting the tier change.

Keep B1, Always On, Static Web Apps Standard, the 30-minute snapshot cadence, existing stale-data behavior, and RA-GRS for the first rollout. No new paid cache, gateway, database, or compute tier is required. Use small changes that can be released independently.

## Phase 0 — Establish a reproducible baseline and release controls

Deliverable: baseline evidence and a small read-only measurement script/runbook.

- [ ] Record the deployed API version and worker image revision; identify differences from the current working tree. Preserve unrelated local changes and prepare implementation on a focused branch/checkout.
- [ ] Save redacted current resource configuration, Blob access/retention settings, relevant Cloudflare rules, and previous deployment identifiers for rollback.
- [ ] Reuse the audited seven-day baseline. Collect a short new sample using the same request paths and metric definitions before changing production.
- [ ] Measure origin response latency, Blob-read duration, normalization/Explore time, serialization/compression time, cache hits/misses, and process memory. Prefer counters and sampled timing over per-request verbose logs.
- [ ] Record compressed/decoded response size and route counts. Use fixture-based local benchmarks at modest concurrency (for example 1, 4, and 8 requests); keep production checks to bounded normal GETs.
- [ ] Verify effective permissions for inspecting blob tiers and editing the relevant Cloudflare rules. Blob listing failed during the audit; obtain the narrow data-plane access needed through the resource owner if still unavailable. Do not substitute account keys or print credentials.
- [ ] Verify the two existing Bicep snapshot alerts and action group against Azure. The September 6 deployment record documents missing monitoring-write permissions; validate those permissions before attempting provisioning. Any alert deployment and associated small charge is a separate, explicit change.

Gate: baseline and previous configuration are retained; the expected API payload/freshness contract is recorded. Platform-access blockers affect only their dependent changes; code work can proceed.

## Phase 1 — Put active Blob data in Hot

Deliverable: a reviewed storage change manifest, an idempotent apply/verify procedure, and resulting tier/billing evidence.

- [ ] Run the guarded inventory helper and review representative blobs in `river-snapshots`, active `river-history`, and frequently updated intake data. Record explicit/inherited access tier, age, size, and write pattern without downloading private content.
- [ ] Distinguish active history from old hourly history and user-owned records. Do not treat all objects in a container as equally active.
- [ ] Choose the smallest effective scope: change the account default only after confirming the impact on all inherited-tier blobs; otherwise target active prefixes/blobs and their writer configuration. There is no container-level default tier to rely on.
- [ ] Estimate one-time tier-change operations, retrieval, and minimum-duration charges from the inventory. Preserve redundancy and recovery settings.
- [ ] Ensure future writes use the intended tier, including explicitly tiered existing blobs. Capture the change in the deployment/runbook configuration so it is repeatable.
- [ ] Apply the selected production change independently of an API release. Verify representative tiers, successful readback, two scheduled snapshot completions, and the next hourly history completion.
- [ ] After usage is posted, compare Hot/Cool write meters and cost per 10,000 operations. Confirm results over a full seven-day window.

Gate: active writes consistently land in Hot; no storage errors or freshness regression; lower write-unit cost appears in posted usage.

Rollback: retain the prior tier manifest and writer configuration. If application behavior regresses, revert the responsible code/configuration first. Avoid reflexively toggling every blob back to Cool: that creates additional billable transitions. Restore tiers selectively only if required.

## Phase 2 — Cache snapshots and remove repeated Explore work

Suggested first implementation PR: snapshot cache and Explore reuse.

Primary files: `src/lib/river-snapshots.ts`, `src/lib/blob-storage.ts`, `src/lib/server-cache.ts`, `src/lib/explore-catalog.ts`, and `src/server/routes/public-rivers.ts`.

- [x] Add a snapshot-specific cache with a configurable initial 30–60 second revalidation interval. Scope it to public snapshot reads, not the general mutable storage adapter.
- [x] Deduplicate concurrent loads for the same logical blob. Retain a bounded number of entries and replace old generations rather than accumulating generation keys indefinitely.
- [ ] Keep publication readback uncached or explicitly invalidated so the worker verifies the write it just performed. Do not let an old cached value falsely fail or pass verification.
- [ ] Add conditional ETag revalidation only where the benchmark shows useful benefit. Never turn a 304 into a missing snapshot or reuse a value with the wrong key/catalog revision.
- [x] Cache normalized content by generation and catalog revision. Recalculate age and stale-state metadata when serving; do not freeze a fresh classification inside a long-lived cache entry.
- [x] Precompute static Explore route metadata per catalog revision instead of running fallback scoring solely to obtain that metadata for scored routes. Preserve planning-route and missing-score behavior.
- [x] Keep last-known-good behavior consistent with the existing API during storage failures. A stale snapshot remains visibly stale; cached data must not conceal a failed refresh indefinitely.

Meaningful validation: concurrent request coalescing; generation replacement; catalog changes; eviction/memory bounds; publication readback; failed loads; missing snapshots; the two-hour freshness transition; planning routes and withheld scores. Run the relevant tests and the repository's `npm run test:api` release check.

Gate: repeatable benchmark improvement, equivalent public payload semantics, bounded memory, and no freshness regression. Release this PR independently and observe at least 24 hours before layering another API optimization onto it.

Rollback: turn off the new cache through its configuration switch or redeploy the previous package. Retain existing Blob formats throughout this phase.

## Phase 3 — Reduce response work and correct public cache headers

Suggested second implementation PR: response processing, followed by a separate Cloudflare configuration change.

Primary files: `src/server/http.ts`, associated HTTP tests, and public API handlers.

- [ ] Profile after Phase 2 to distinguish remaining serialization, compression, network, and client parsing costs.
- [ ] If compression remains material, use asynchronous gzip with bounded work or reuse a compatible representation. Preserve JSON response fields, per-request IDs, HEAD behavior, compression negotiation, content length, and `Vary` semantics.
- [ ] Do not remove body request IDs or freeze `snapshotAgeSeconds` merely to improve cacheability. Any public contract change requires an explicit compatible client migration; it is not part of the default optimization.
- [ ] Release and compare cold/warm latency, event-loop responsiveness, CPU, and memory using the Phase 0 measurements.
- [ ] Inspect the Cloudflare rule responsible for the four-hour browser TTL. Narrow its override so public API responses honor the origin freshness policy while immutable static assets retain their intended caching.
- [ ] Verify the policy across summary, Explore, weekend, detail, and history endpoints. Confirm private/admin/write responses are excluded. Purge only affected edge URLs if necessary; already cached browser responses cannot be remotely purged.
- [ ] Test a snapshot-generation change and stale-boundary transition through the public host. Check client age handling as well as headers: browser TTL, edge TTL, and stale-while-revalidate can combine.

Gate: at least 50% improvement in comparable origin p95 against the baseline, or documented profiling evidence identifying the remaining bottleneck; no increased error rate or sustained memory regression. Public API no longer advertises the unintended four-hour browser TTL. Under-one-second warm p95 remains a stretch goal.

Rollback: deploy the previous response implementation independently of the edge configuration. Preserve a known-correct short-TTL fallback; do not restore the known four-hour freshness defect as the default recovery action.

## Phase 4 — Reduce deployment churn and close monitoring gaps

Suggested third PR: targeted workflow changes. This work can be prepared while earlier releases accumulate measurement data.

- [x] Add dependency-aware path filters to API/frontend deployments. Ensure shared packages, root dependency files, route data, static assets, build configuration, and workflow changes trigger every affected deployment.
- [x] Narrow the snapshot-worker filter after mapping its actual imports. Route/catalog changes still publish a current worker through `src/lib/**`, `src/data/**`, and the worker entrypoint.
- [x] Add production deployment concurrency per target. Deployments do not cancel a deployment already mutating production.
- [ ] Validate representative change sets: documentation-only, mobile-only, route-data, shared package, dependency lockfile, and deployment configuration. Keep manual dispatch available.
- [ ] Restore intended snapshot alerts after resolving the specific permission gaps identified in Phase 0. Validate alert queries with historical failures or non-disruptive test data rather than forcing a production failure.
- [ ] Evaluate enabling App Service health checks at `/api/health/ready`; confirm single-instance behavior and distinguish process readiness from snapshot freshness.

Gate: irrelevant edits do not redeploy the service; required changes still do; only one deployment mutates each target at a time; intended monitoring is verifiably enabled or tracked as an explicit remaining access dependency.

Rollback: restore previous workflow triggers/concurrency or use manual deployment. Keep alert/health-check changes independently reversible.

## Phase 5 — Reduce history writes after measuring the simpler changes

Suggested fourth PR: history storage/read-path changes, only after a short design review of sampling semantics.

Primary files: `src/server/history-snapshot.ts`, `src/lib/history.ts`, snapshot contracts, and the history workflow.

- [ ] Measure history-specific reads/writes and route-hours. Attribute its share of the account cost before investing in a storage redesign.
- [ ] Determine whether the published snapshot contains all fields required for history. If it does not, define a compatible compact history input from the successful worker generation; do not assume the public summary is a lossless scoring result.
- [ ] Decide whether history should represent observation time or capture time. Reuse only a sufficiently fresh, complete generation; do not repeatedly record stale data as a new observation.
- [ ] Preserve hourly samples. Derive today's daily summary on reads and finalize completed daily summaries once per day, with idempotent catch-up for missed runs.
- [ ] Deploy backward-compatible readers before changing writers. Preserve the original persisted data during rollout; use fixtures or a non-production prefix for comparison.
- [ ] Validate midnight/DST boundaries, duplicate and overlapping jobs, delayed generations, missing runs, partial writes, and existing mobile/web history charts.

Gate: history correctness holds and normalized daily-summary writes fall from up to 24 to approximately one per route-day, excluding retries/catch-up. This saves about 48% of history writes, not of all storage writes. Measure the actual dollar benefit at Hot rates.

Rollback: restore the prior writer and compatible reader; reconcile missing daily aggregates from retained hourly records before relying on the old reader. No history deletion is needed for this optimization.

## Phase 6 — Review optional changes using new evidence

After seven complete days of comparable post-change usage, publish a before/after result with route counts, successful refreshes, request volume, origin p95, memory, normalized transactions, and posted costs. Separate one-time migration charges, normal growth, and any newly provisioned alert costs.

Only then decide whether to pursue:

- A separate Hot LRS/ZRS account for reconstructible snapshots, with a restore procedure and explicit recovery expectations. Preserve stronger protection for user data/history.
- A smaller Explore payload, using a versioned/additive contract and compatible web/mobile rollout.
- A compiled Node runtime, if profiling shows meaningful startup or memory overhead from `tsx`.
- Telemetry deduplication, if overlap is demonstrated. Current workspace charges were zero, so do not claim immediate savings from arbitrary sampling.
- Lifecycle rules for old history after retention requirements are settled; no blanket deletion policy.
- Worker sizing or registry changes only if they address measured billed costs. Registry cleanup alone currently saves no storage overage.

## Execution checklist

| Work item | Depends on | Completion evidence |
| --- | --- | --- |
| Baseline and access verification | Audit | Redacted baseline, deployed revisions, rollback references |
| Hot-tier rollout | Blob tier inventory | Tier checks, successful jobs, posted unit-cost reduction |
| Snapshot/Explore cache PR | Baseline | Correctness tests, bounded memory, benchmark and production comparison |
| Response optimization PR | Cache profiling | Improved latency and equivalent HTTP behavior |
| Public TTL correction | Rule access and load monitoring | Public headers, generation/staleness verification |
| Workflow/monitoring improvements | Dependency map and platform permissions | Trigger matrix and live monitoring evidence |
| History optimization PR | Post-Hot attribution and sampling decision | Historical correctness and fewer normalized writes |
| Follow-up decision | Seven complete days of new evidence | Measured outcomes and justified optional backlog |

Start with Phase 0, then the Hot-tier rollout and snapshot/Explore PR. Keep each production change identifiable in the measurements. The observation windows are validation requirements for a future execution of this plan; creating this document does not schedule a monitor or deploy changes.
