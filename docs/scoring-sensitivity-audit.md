# Scoring sensitivity audit

The scoring sensitivity audit evaluates every scored route with deterministic synthetic inputs. It is an engineering safety and stability check, not a substitute for observed paddling outcomes.

## What it checks

- Gauge values immediately around every published threshold.
- Monotonic behavior from hazardous low water toward ideal and from ideal toward hazardous high water.
- Missing and stale gauges always withhold launch readiness.
- Missing weather and cold water never produce `Ready`.
- Minimum-only profiles remain under their score cap.
- Stronger adverse trends do not improve current or forecast scores.
- Weekend uncertainty is not narrower than tomorrow uncertainty.
- Abrupt score changes across threshold boundaries are ranked for review.
- Weather, trend, evidence-source, and threshold-model sensitivity contribute to route review priority.

The fixed evaluation timestamp and synthetic weather inputs make results reproducible. The generated baseline stores only compact outputs: score, rating, readiness, gauge band, and forecast scores.

## Commands

Run the release/CI check:

```sh
npm run scoring:sensitivity:check
```

The check fails when a safety invariant fails or scoring output drifts from the committed baseline.

After reviewing an intentional scoring change in the admin Sensitivity tab, accept the new behavior with:

```sh
npm run scoring:sensitivity:generate
```

This updates:

- `docs/operations/scoring-sensitivity-baseline.json` — full comparison baseline.
- `src/data/generated/scoring-sensitivity-report.json` — compact ranked admin report.

## Interpretation

Invariant failures are release blockers. Ranked discontinuities and high-sensitivity routes are review candidates; they are not automatically defects. Synthetic scenarios cannot establish whether a route is enjoyable or runnable in the real world, so field outcomes and authoritative guidance should replace assumptions whenever they become available.
