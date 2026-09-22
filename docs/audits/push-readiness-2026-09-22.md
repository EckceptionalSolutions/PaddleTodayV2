# Push readiness — September 22, 2026

Integrated the working changes with `origin/main` at `07fd75ae`, preserving the newer asset-hosting, search-serving, snapshot-size, and Azure workflow fixes. Removed newline-only churn before integration. The original working tree remains in a local Git stash and a separate filesystem backup.

## Repairs

- Updated the npm lockfile for the mobile NetInfo dependency; a clean-install dry run now succeeds.
- Rounded generated map coordinates to six decimal places (at most half a microdegree per axis) without removing vertices or changing route topology. The generator applies the same serialization to future output. The existing 40 MiB aggregate limits remain in place: route assets total 39.97 MiB and state assets 39.94 MiB.
- Reconciled route assertions with the reviewed access-point classifications and the expanded North Carolina/New York inventories. Same-launch routes may expose a single public access; navigation landmarks are checked separately from public landings.
- Added approved Erie Canal imagery fallback for the new Little Falls round trip.
- Included script-library tests in the root test runner; they were previously excluded.
- Fixed river-hub shortlist/filter loss after opening a compared route and navigating back. State is scoped to the river and retained in the browser session, with an in-memory native fallback.
- Updated browser checks to use the support screen's catalog request and the current Explore filter control.

## Validation

- `npm ci --dry-run --ignore-scripts`: passed.
- `npm test`: passed type checks, generated-file checks, route/geometry audits, scoring sensitivity, and all workspace unit suites. The root suite passed 1,198 tests; shared packages passed 86 tests. After the navigation repair, mobile type checking and all 180 mobile tests passed (1,464 unit tests across the final suite components).
- `npm run build:app`: passed, generating 3,255 pages.
- Built search-indexability audit: passed with no errors or warnings after copying the routing configuration as the deployment workflow does.
- Task-board validation: no errors; one existing quarantined legacy-status warning.
- Gauge evidence gate: 5,356 gauges and 5,356 review records across 21 baselined states.
- Route safety audit: zero issues across 1,833 scored routes.
- Snapshot-capacity check: passed for the available local snapshot; this is not a measurement of a fresh full-production snapshot.
- Affected mobile browser flows passed after the repairs, including offline download/reopen/update, refresh recovery, planning-route discovery, hub comparison/back navigation, Saved search/comparison/trips, and the changed Home/Explore interactions. Broader checks used the production web export. The stale Explore-control assertion was corrected and its two flows rerun successfully.

## Artifact scope and release limits

Compact access-remediation reviews, selections, source metadata, targeted audits, and related documentation are included. Large intermediate audit snapshots, downloaded source captures, and source backups remain local; [the artifact inventory](../access-remediation/local-artifacts-2026-09-22.json) records their paths, sizes, and SHA-256 hashes. The Android build bundle remains local and is excluded from Git and EAS uploads.

Native Android/iOS device checks (including airplane mode, process termination, accessibility, and long-list performance) remain pending as documented in the mobile QA plans. This branch is ready for remote review; these automated results do not constitute store-release approval or a production deployment.
