# Operations improvement runbook

The control plane now has durable reports for the improvements beyond route discovery.

## Durable reports

- `npm run operations:gauges` regenerates the conservative known-evidence gauge inventory and review ledger. Until a state has a frozen provider-wide baseline, its status remains `gauge_baseline_pending` regardless of existing route depth.
- `npm run operations:gauges:refresh` refreshes the frozen USGS and Minnesota DNR provider denominator; `npm run operations:gauges:check` validates keys, route relationships, blockers, and baseline integrity without contacting providers.
- `npm run operations:dossiers` regenerates `saturation-dossiers.json` and `blocker-resolution-queue.json`.
- `npm run operations:freshness` regenerates `route-freshness-report.json` for package/access/safety metadata review. Live gauge freshness remains provider-runtime data and is never inferred from static route records.
- `npm run operations:adoption` regenerates `adoption-report.json`. It accepts only a privacy-safe aggregate export matching `adoption-events.schema.json`; without an export it records that adoption data is unavailable rather than inventing metrics.
- The saturation dossier treats gauge review and direct route coverage as the primary completeness measures. It retains scored/planning route counts only as legacy migration diagnostics, alongside related discovery tasks, recent evidence runs, and the conditions required before a state can be called done.
- The blocker queue groups blocked work by reusable resolution category. It is advisory: it never bypasses evidence or creates routes.

## Product-growth signals

The browser analytics layer uses Umami when configured and now records `river_hub_no_results` for filtered river pages with zero results. Existing route views, planner, favorites, alerts, app-download, request, and contribution events remain available. The Operations Center reports operational proxies until an owner-approved analytics aggregation and retention policy is selected.

## Research rotation

The Operations Center tracks consecutive no-add route-worker results. At the configured threshold, the orchestrator should pause the active state for a strategy review or rotate to another unsaturated state. A rotation never changes saturation policy and never discards the active state's evidence.

## Safety boundaries

Freshness, overlap, and blocker automations are read-only recommendations. Consolidation, route retirement, provider changes, proxy publication, and safety exceptions require explicit review and the normal evidence, safety, verification, test, and rollback gates.

## Overlap review loop

The overlap auditor runs `npm run routes:audit:overlap`, then `npm run operations:overlap-queue`. The first step writes the detailed geometry evidence under `tmp/`; the second step writes the bounded, deduplicated [overlap-review-queue.json](./overlap-review-queue.json), preserves prior statuses by fingerprint, records a `route_overlap_audit` run, and creates at most six high-confidence `consolidation_review` tasks for the independent verifier. Village Creek is intentionally promoted when its corridor-family evidence is strong enough to merit review.

The orchestrator may assign at most two consolidation reviews concurrently. Reviewers may recommend a canonical route family with validated multi-endpoint variants, reject the finding as intentional adjacent coverage, or escalate a destructive change. No route is merged, retired, deleted, or rewritten from an audit result alone. A route worker must consult the queue before implementing a candidate and record the overlap clearance in its evidence package.
