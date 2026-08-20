# PaddleToday Operations Orchestrator

The active control loop has two new automations: the Codex heartbeat **PaddleToday Operations Orchestrator**, which reconciles status every four hours, and the standalone project automation **PaddleToday Hourly Route Worker**, which performs one bounded route-research or route-implementation pass each hour. The older state-specific route-addition automations remain paused and are not part of this operating model.

Each orchestrator pass:

1. Reconciles the task board, run history, route requests, contributions, metrics, and GitHub Actions state.
2. Prioritizes user demand and scored-route saturation over speculative planning routes.
3. Selects at most one bounded work order under the deterministic WIP policy.
4. Assigns the logical worker role needed for that work order.
5. Runs evidence, safety, independent-verification, test/build, and rollback gates before any merge recommendation.
6. Records the result in `docs/operations/tasks.json` and `docs/operations/runs.json`.

Each hourly worker pass claims at most one route task, respects route WIP, finishes Minnesota before expansion, and screens up to five distinct candidates before recording the run as exhausted. It may ship at most one fully evidenced route per pass; blocked candidates should not stop the pass. Every route package must include a gallery-image decision, camping/overnight evidence, practical safety information, canonical river-line geometry when needed, and a coordinate-near-river audit using the repository coordinate workflow. Sparse user feedback is expected; state saturation and high-confidence search coverage supply the baseline route pipeline.

The **PaddleToday Route Worker Supervisor** runs every two hours. It reviews hourly worker runs and memory, repairs stale task lanes, distinguishes legitimate policy blocks from accidental no-work dead ends, and creates at most one next bounded ready task when the board is empty. It never clears active claims, overrides policy, or creates speculative route backlogs.

The orchestrator may prepare work automatically, but it must stop and ask for user judgment when a safety exception, policy change, saturation-rule change, or ambiguous product decision is required. It must never activate the paused route automations or create an unbounded planning backlog.

State selection uses the geographic frontier and gauge-network opportunity rather than the old scored-routes divided by scored-plus-planning ratio. Minnesota is the active focus (tier 0), followed by Wisconsin, Iowa, North Dakota, South Dakota, and Nebraska (tier 1), then Illinois and Michigan (tier 2), with more distant states held until the frontier advances. During migration, the route ratio remains visible as a diagnostic only. Within the active frontier tier, prioritize the smallest remaining disposition gap, then uncovered route-capable gauges, then unreviewed eligible gauges and stale dispositions. User demand may raise a bounded gauge or corridor task above that default ordering.

The unit of state-coverage work is one gauge or a small same-river gauge cluster. Every claimed review must end with a durable `covered`, `blocked`, `screened_out`, or `stale_or_unsupported` disposition, or remain explicitly `researching`; a well-evidenced no-route decision is useful completed research. `covered` requires a direct same-reach scored route and the full route package. `blocked` requires a precise blocker and retry condition and counts as reviewed but not covered. `screened_out` is a durable not-paddle-relevant decision. `stale_or_unsupported` is reserved for unreliable identity, telemetry, or provider support. Proxy-only relationships count as reviewed evidence but never as direct route coverage.

Research completeness and saturation are separate. A state is research-complete only against a frozen, provider-wide inventory after every eligible gauge has a durable disposition. It enters route-coverage review while any route-capable gauge lacks direct scored coverage or an accepted blocker. Saturation still requires the existing route-package quality audit and a bounded fresh discovery sweep across distinct gauge/corridor families, with no candidate clearing the scored-route gates. New gauges, resumed telemetry, cleared blockers, new user demand, provider expansion, or lost direct coverage reopen the state.

## Gauge-derived route opportunities

The planner materializes actionable route opportunities from `docs/operations/gauge-review-ledger.json` into the bounded `docs/operations/route-opportunity-queue.json` and `docs/operations/tasks.json` board. Only `blocked` reviews with `route_capable` eligibility and a non-permanent evidence gap enter this queue. The queue is capped at five opportunities per state and twenty globally; private, prohibited, duplicate, non-paddling, and otherwise permanent blockers are excluded.

Each opportunity becomes a `route_research` task owned by `route-research`. The task is a request to close the listed evidence gap, not permission to publish a route. A worker must still supply named public endpoints, defensible coordinates, a product-supported live gauge and threshold, access/camping/safety/image decisions, geometry and overlap checks, independent verification, tests, build, and rollback evidence. When a gauge becomes covered or permanently screened out, its generated ready task is retired to `blocked` rather than reopened automatically.

Blocked frontier tasks remain visible for auditability but do not hold the geographic frontier open. Ready state-coverage work and ready route opportunities are ranked by frontier tier, so the planner cannot advance past unfinished gauge adjudication or let a distant route task jump ahead of the active frontier.
