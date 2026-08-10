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

State selection uses a transparent closeness-to-saturation ranking: scored routes divided by scored-plus-planning inventory, with scored-route depth as the tie-breaker. Planning routes never count in the numerator. A state with no remaining planning inventory is marked `coverage_complete_review`, not automatically saturated. To mark a state `done`/saturated, the orchestrator must complete both the inventory-quality audit and a bounded fresh discovery sweep across distinct candidate families, with no candidate clearing the scored-route gates. The highest-ranked unsaturated state is the next research candidate unless an active ready task or documented blocker controls the queue.
