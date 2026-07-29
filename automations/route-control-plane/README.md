# Route Automation Control Plane

The control plane schedules state-specialized route work without embedding every state's expertise in one giant automation prompt.

It deliberately separates three concerns:

1. **Scheduling:** `scripts/route-control-plane.ts` chooses a state using weighted deficit rotation, difficult-state reservations, leases, and recent claim history.
2. **Specialization:** `state-profiles.json` and `docs/state-route-memories/<state>.md` tell the worker which sources, caveats, mandatory checks, and recovery tactics apply.
3. **Execution evidence:** a completion report records source families, retrieval methods, changed facts, blockers, and retry conditions.

## Why this does not repeat the old general-prompt failure

A worker does not choose its own geography. The controller assigns exactly one state and the worker must remain there.

Easy states cannot monopolize runs:

- Consecutive claims for the same state are prohibited by default.
- Selection uses weighted fairness debt, not just the number of ready candidates.
- At least one difficult state is reserved in every three claims.
- States with no ready candidates receive bounded discovery work rather than disappearing from the queue.

A failed website is not permission to stop:

- Research completions require at least three distinct source families.
- `blocked_source_access` also requires at least two retrieval methods.
- The next work order injects recovery tactics after a source-access failure.
- Reopening the same failed page does not count as another attempt.
- Blocked/no-change outcomes require an exact blocker and retry condition.

Quality gates remain unchanged. Fairness and persistence decide where to work; they never lower the safety, access, gauge, coordinate, or threshold requirements.

## Commands

Open the local operations dashboard:

```powershell
npm.cmd run routes:control:ui
```

Then open `http://127.0.0.1:4399`. The dashboard is bound to the local computer only.

The controls have plain-language meanings:

- **Start research** adds one research job to the execution queue. The active `Paddle Today route worker` Codex automation checks the queue every five minutes.
- **Implement a ready route** adds one implementation job. It remains disabled until at least one lead is in `implementation_ready`.
- **Preview next state** shows which state the fairness scheduler would choose without starting work.

The dashboard shows whether work is waiting or running and refreshes automatically. It does not expose these controls on the production PaddleToday site.

Preview the next assignment without consuming it:

```powershell
npm.cmd run routes:control:plan
```

Preview output is written to `next-work-order-preview.json` and `next-work-order-preview.md`. It never replaces an active claimed work order.

Claim the next assignment and create a three-hour lease:

```powershell
npm.cmd run routes:control:claim
```

A claim is an internal reservation: it prevents two workers from taking the same state at the same time. Users do not need to claim work manually from the dashboard; the route worker claims it when execution begins.

The current work order is written to:

- `automations/route-control-plane/current-work-order.json`
- `automations/route-control-plane/current-work-order.md`

Complete a claimed assignment:

```powershell
Copy-Item automations/route-control-plane/completion-report.template.json tmp/route-completion.json
# Fill in the report.
npm.cmd run routes:control:complete -- tmp/route-completion.json
```

Claims and outcomes are retained in `state.json`. Completion reports are also copied to an ignored local `reports/` directory for diagnostics.

## Outcome meanings

- `implemented`: a route was added end to end.
- `promoted`: a candidate moved to `likely_addable`.
- `progress`: evidence materially improved, even though the candidate is not ready.
- `blocked_source_access`: a required source could not be retrieved after recovery attempts.
- `blocked_threshold`: numeric gauge guidance remains insufficient.
- `blocked_access`: public endpoint legitimacy or coordinates remain insufficient.
- `blocked_live_provider`: no product-supported current live-data path exists.
- `no_change`: bounded research found nothing new; requires a precise retry condition.
- `invalidated`: new evidence rejects or deprecates a candidate.

## Migration strategy

Do not delete all state automations immediately.

1. Keep them paused as reference during the pilot.
2. Run the controller manually for several claims.
3. Compare its work orders and results with the corresponding state prompts.
4. Move any missing state-specific rule into `state-profiles.json` or the state memory.
5. Only then replace the paused state jobs with one scheduled controller worker.

This makes specialization testable and reusable instead of relying on prompt duplication.
