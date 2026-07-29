# Route Automation Control Plane Design

## Objective

Increase route-research throughput without reintroducing geographic bias, shallow source work, unsafe additions, or repeated dead-end research.

## Design boundary

The controller is not a route-research agent and does not decide whether evidence is good enough. It assigns work, loads state specialization, prevents duplicate claims, and validates the research record.

The worker remains responsible for evidence judgment under:

- `docs/route-addition-requirements.md`
- `docs/route-safety-policy.md`
- the assigned state memory
- the machine-readable state profile

## Selection model

Each enabled state has a weight and difficulty class.

The score is dominated by weighted fairness deficit within the recent claim window. Candidate priority and implementation readiness are smaller bonuses. This means a ready candidate can break a fair tie, but a mature or easy state cannot permanently starve states whose research is harder.

Additional guards:

- No state may be selected for consecutive claims by default.
- Every third claim is reserved for a `difficult` state when one is available.
- An active state lease prevents another worker from claiming the same state.
- Expired leases return the state to rotation.
- A state with no open candidate receives fresh-discovery work instead of being skipped.

## Persistence model

Every claim records:

- assigned state and mode
- candidate IDs
- claim and lease timestamps
- final outcome
- source attempts and retrieval methods
- facts changed
- blocker and retry condition

The next work order can therefore distinguish:

- a genuinely exhausted source trail
- a transient website failure
- a repeated stale-candidate loop
- a provider-adapter gap
- a candidate that is one fact away from promotion

## Anti-give-up contract

For research work:

- At least three distinct source families are required.
- At least six bounded discovery touches are requested.
- No more than two stale candidates should consume the run.
- A source-access blocker requires at least two retrieval methods.
- A blocked or no-change result requires an exact retry condition.

These are proof-of-work rules, not evidence-quality substitutions. Three weak sources do not satisfy a route gate merely because the worker tried them.

## State specialization

`automations/route-control-plane/state-profiles.json` stores stable, structured knowledge:

- scheduling weight and difficulty
- state memory path
- primary and fallback source families
- mandatory state checks
- source recovery tactics

Long-lived research notes and previously reviewed candidates remain in the state memory and candidate ledger. This keeps the machine-readable profile compact while preserving deep state history.

## Planned next layers

The foundation intentionally stops short of automatically running a worker.

The next layers are:

1. Pilot several manual claims and tune weights/profiles from observed outcomes.
2. Add source adapters for recurring GIS, PDF, API, and JavaScript-heavy state sites.
3. Add a single scheduled controller automation using `automation-prompt.md`.
4. Add a small status report for fairness debt, expired claims, repeated blockers, and promotion/implementation yield by state.
5. Pause or remove the legacy state jobs only after the controller demonstrates equivalent specialization.
