# History storage buckets — November 5, 2026

Hourly samples and finalized daily summaries retain their public response format. The new `history-buckets-v1` layout places routes in 32 stable SHA-256 buckets. Hourly objects are partitioned by local date; daily objects by calendar month, keeping normal reads and updates bounded as history grows. Every physical object is validated against a conservative 2 MiB limit and read back after writing. Oversized or malformed payloads stop the capture without truncating records.

## Compatibility and publication

Existing per-route hourly/daily files remain untouched during activation. The first bucket write for a route/day seeds its retained legacy samples, including both repeated autumn DST hours. Past legacy daily summaries are merged with newer bucket summaries. Shared buckets retain routes omitted from later captures; the existing route-day journal still catches up partial and missed runs.

The existing renewable capture lease coordinates API, CLI, and export operations. Bucket writes use ETag preconditions and drain all in-flight requests before lease cleanup. The journal announces possible writes before hourly updates and clears closed days only after every daily bucket is durable. Readers fetch the journal before the layout/month manifest, without stale control caches, so completion cannot hide a newly committed month or recently introduced route. Bucket data is cached only within a request/capture; no persistent bucket cache is added to B1 memory.

The durable `<prefix>/_storage-layout.json` marker records the active format, generation, and object periods. `RIVER_HISTORY_STORAGE_LAYOUT=auto` follows this marker and otherwise uses legacy files. API capture writers therefore adopt an activated generation without another app-setting restart. Explicit `legacy` is rejected while bucket storage is active to prevent a silent split between writers.

## Staged rollout

1. Deploy the compatible API and verify `/api/health` advertises `historyStorageLayouts: ["legacy", "history-buckets-v1"]`. Existing captures continue in legacy storage until activation. The history workflow gates `auto` and explicit bucket captures on this capability.
2. Save representative public history before activation. Dispatch `history-snapshots.yml` with operation `capture`, storage layout `history-buckets-v1`, and the existing daily-summary mode `auto`.
3. Verify all 1,392 routes were captured, at most 32 hourly objects were written, readback passed, and earlier hourly samples and daily history remain available. Repeat through `storage_layout=auto` to verify ordinary scheduling follows the marker.
4. Keep the repository's `HISTORY_STORAGE_LAYOUT` unset or `auto`. Daily-summary finalization remains independently controlled by `HISTORY_DAILY_SUMMARY_MODE`.

The API workflow explicitly restarts App Service only after package upload and settings succeed. Previous releases demonstrated that identical settings could leave an older Node process serving traffic; the existing revision check must observe the new process before reader capability is accepted.

## Verified legacy rollback

Reset any forced layout configuration to `auto`, then dispatch the history workflow with operation `export-legacy`. This storage-only operation skips API readiness gating and has a longer timeout. Under the same lease, it exports every recorded bucket period into legacy arrays, merges older legacy-only records, verifies each write, and switches the marker to `legacy` only after all data is durable. A failed or interrupted export leaves bucket readers active and is resumable; matching files are not rewritten. A later bucket activation uses a fresh generation so archived buckets cannot hide newer legacy samples.

Bucket objects are retained after export. Revert the API to the previous compatible legacy-array reader (`b7eadbe076fde194f1b5e7f6a0e9b943b1e722d5` or newer) only after export verification. Large exports may need a longer manual run; the marker never switches after a partial copy. Hourly export buffers are evicted per day, and daily export memory is bounded by a few route buckets rather than all history at once.

## Expected economics and validation

At 1,392 routes, 32 successful captures/week, and one closed daily summary per route-day, replacing 1,392 data writes with 32 gives approximately `(1392-32) × (32/7+1) × 30 × $0.10/10000 = $2.27` per 30 days. This excludes read and coordination effects and is not a measured invoice reduction. At a full 24 captures/day the analogous write-only estimate is $10.20/month; increasing capture frequency is extra work, not a saving.

Logs distinguish logical `dailySummaryWrites` from physical `hourlyBlobs`/`dailyBlobs`. `layoutControlWrites` counts only the format/period marker; lease and finalization-journal writes are separate. Legacy cleanup is not part of this rollout.

Fifteen bucket integration cases cover existing-data seeding, year/month boundaries, shared-bucket route removal, partial hourly/daily failures, resumable export, failed export readback, lease draining, wrong-path identity, invalid control-file types, DST, size limits, 1,392-route write counts, identical retries, and reactivation. Existing history regression and lease tests also pass. Production activation evidence will follow the compatible-reader rollout.
