# Daily history summary batching — November 4, 2026

Daily summaries previously changed on every history capture. In `daily-finalize-v1`, hourly samples retain their existing per-route arrays, while each closed day's aggregate is persisted on the next capture. The API derives unfinished summaries from hourly samples, preserving live charts and the existing response format. Legacy daily/hourly files remain readable.

A small journal announces pending route-days before hourly writes and clears them only after durable daily summaries. This permits recovery after partial captures, missed days, route removal, or backdated corrections. Existing summaries are preserved; dates with no samples are not invented. Bootstrap repairs the last known legacy boundary and catches up at most 366 calendar days; older backlogs require an explicit backfill before enabling the mode. UTC-hour deduplication preserves both repeated autumn DST hours. A renewable compare-and-swap lease serializes CLI and protected API captures across processes, and failed work drains before releasing ownership.

The writer defaults to `legacy`. The history workflow supports explicit `legacy` and `daily-finalize-v1` overrides; `auto` follows repository variable `HISTORY_DAILY_SUMMARY_MODE`. Before batched writes, the workflow requires `/api/health` to advertise `historySummaryModes: ["legacy", "daily-finalize-v1"]`. This prevents enabling the writer before compatible readers serve traffic.

Rollout: deploy the compatible API first, run one explicit batched capture, validate live history, then set the repository variable to `daily-finalize-v1`. Rollback: set the variable to `legacy`, run an explicit legacy capture and verify daily summaries before reverting API code. The new legacy writer also finalizes journaled closed days.

At 1,392 routes and the recently observed 32 captures/week, daily summary writes fall from approximately 6,363/day to 1,392/day. Using the earlier observed Hot GRS write price of $0.10/10,000 operations, this is approximately $1.49/month before the small lease/journal overhead. At a full 24 captures/day the estimate is $9.60/month. These are modeled transaction savings, not measured invoice reductions, and exclude reads and bootstrap catch-up work.

Validation: 1,301 API tests passed, including nine storage-backed history integration cases and four lease cases. Additional readiness/calendar tests cover reader gating, invalid dates, leap years, and catch-up bounds. Production activation results will be recorded after rollout.
