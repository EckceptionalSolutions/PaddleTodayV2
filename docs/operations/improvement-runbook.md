# Operations improvement runbook

The control plane now has durable reports for the improvements beyond route discovery.

## Durable reports

- `npm run operations:gauges` regenerates the conservative known-evidence gauge inventory and review ledger. Until a state has a frozen provider-wide baseline, its status remains `gauge_baseline_pending` regardless of existing route depth.
- `npm run operations:gauges:refresh` refreshes the frozen USGS and Minnesota DNR provider denominator; `npm run operations:gauges:check` validates keys, route relationships, blockers, and baseline integrity without contacting providers.
- `npm run operations:dossiers` regenerates `saturation-dossiers.json` and `blocker-resolution-queue.json`.
- `npm run operations:freshness` regenerates `route-freshness-report.json` for package/access/safety metadata review. Live gauge freshness remains provider-runtime data and is never inferred from static route records.
- `npm run operations:adoption` imports the latest successful main-branch `weekly-product-report.yml` artifact through the authenticated `gh` CLI and regenerates `adoption-report.json`. This reuses existing Google workload identity; no new analytics credentials or paid plan are required. Only allowlisted event counts, observation dates and provider availability enter the adoption report. Native route opens, hub views, save toggles and directions are reported separately; save toggles include removals. Unknown web/no-result coverage is `null`, not zero. Counts are events, not unique paddlers or completed trips.
- The report records its source run, source generation time and completed observation week. Observations older than ten days are flagged. Failed downloads retain the previous normalized aggregate and its original timestamps, add a warning and exit nonzero. The daily brief surfaces provider and freshness warnings. The existing daily adoption refresh now picks up each completed weekly artifact automatically.
- For an offline provider report, run `npm run operations:adoption -- --weekly-report path/to/weekly-product-report.json`. An optional existing `docs/operations/adoption-events.json` still selects the legacy local-export path; each row can use `count` for aggregate counts instead of repeating events. That input does not combine with the weekly source, and its coverage must be checked before comparisons. Arbitrary properties and identifiers are never copied to the report. Do not put raw provider exports, users, search strings or credentials into tracked files.
- The saturation dossier treats gauge review and direct route coverage as the primary completeness measures. It retains scored/planning route counts only as legacy migration diagnostics, alongside related discovery tasks, recent evidence runs, and the conditions required before a state can be called done.
- The blocker queue groups blocked work by reusable resolution category. It is advisory: it never bypasses evidence or creates routes.

## Product-growth signals

The browser analytics layer uses Umami when configured and records `river_hub_no_results` for filtered river pages with zero results. Existing route views, planner, favorites, alerts, app-download, request, and contribution events remain available. The current Umami plan has no API key; web activity remains a manual dashboard review and is explicitly unknown in automated adoption totals. A missing event row from a successfully queried native event set means zero recorded occurrences for that week, subject to analytics collection limits. Missing providers or unqueried event types do not mean zero usage.

## Research rotation

The Operations Center tracks consecutive no-add route-worker results. At the configured threshold, the orchestrator should pause the active state for a strategy review or rotate to another unsaturated state. A rotation never changes saturation policy and never discards the active state's evidence.

## Safety boundaries

Freshness, overlap, and blocker automations are read-only recommendations. Consolidation, route retirement, provider changes, proxy publication, and safety exceptions require explicit review and the normal evidence, safety, verification, test, and rollback gates.

## Overlap review loop

The overlap auditor runs `npm run routes:audit:overlap`, then `npm run operations:overlap-queue`. The first step writes the detailed geometry evidence under `tmp/`; the second step writes the bounded, deduplicated [overlap-review-queue.json](./overlap-review-queue.json), preserves prior statuses by fingerprint, records a `route_overlap_audit` run, and creates at most six high-confidence `consolidation_review` tasks for the independent verifier. Village Creek is intentionally promoted when its corridor-family evidence is strong enough to merit review.

The orchestrator may assign at most two consolidation reviews concurrently. Reviewers may recommend a canonical route family with validated multi-endpoint variants, reject the finding as intentional adjacent coverage, or escalate a destructive change. No route is merged, retired, deleted, or rewritten from an audit result alone. A route worker must consult the queue before implementing a candidate and record the overlap clearance in its evidence package.
