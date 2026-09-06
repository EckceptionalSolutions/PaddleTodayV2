# Daily workflow

## Daily brief

Run `npm run operations:brief` from the repository root. Node dependencies must be
installed with `npm ci`, and `gh auth status` should confirm GitHub access. The
command still produces a local brief when GitHub is unavailable, explicitly marking
CI health unknown. Missing task or run ledgers cause a nonzero exit after the report
is written. Output and the previous task baseline are in `.local/operations/`.

The **PaddleToday daily workflow brief** follow-up in this Codex task runs at
20:00 America/Chicago and owns the daily metadata refresh:

1. Run `npm run operations:dossiers`.
2. Run `npm run operations:freshness`.
3. Run `npm run operations:adoption`.
4. Run `npm run operations:brief`.
5. Read the brief and investigate at most the highest-priority new failure.
6. Save one dated brief under `docs/operations/daily-reports/`, including source
   timestamps, refresh failures, the exact decision needed, and the next eligible work.

Execute refreshes sequentially. If one fails, continue gathering the other reports
and preserve the failure in the final brief. Never treat an older artifact as a
successful refresh. Local analytics export absence is unknown usage, not zero usage.
Metadata checks do not verify current gauge observations or closures. The separate
freshness monitor remains responsible for evidence review.

The reporting command does not append to the shared operations ledger or schedule
work. The scheduled reporter can record one concise run using the existing ledger
schema, re-reading the file immediately before appending to preserve recent entries.
Do not append fabricated successful runs for commands that failed.
The brief also validates task structure. Inspect `npm run operations:tasks:check`
when it flags schema errors, quarantined status conflicts, or future-dated history.
It also runs bounded CI triage and includes the newest failure's diagnosis. Use
`npm run operations:ci:triage` to refresh that diagnosis separately. Follow the
[deployment workflow guide](deployment-workflow.md) for configuration checks and
Azure permission recovery. Use the included diagnosis before downloading another log.

## Queue discipline

The consolidation reviewer runs once daily at 08:00 America/Chicago. The old overlap
auditor ID is absent from the app; its leftover local configuration is not proof of
a running schedule. Run `npm run routes:audit:overlap` then
`npm run operations:overlap-queue` manually when a fresh queue is needed.
The reviewer checks eligibility before doing
research or verification. An unchanged empty queue is a no-work outcome; it must
not trigger a full build. Blocked work needs fresh evidence or a satisfied retry
condition before reopening. Route-addition workers remain paused.

The old daily reporter, standalone dossier refresh, and metrics refresh IDs are
also absent from the app. Their local files were preserved as historical configuration;
they were not re-created. The commands remain available for manual use.
Local scheduled tasks require the computer and app to be running. The new daily
follow-up reports meaningful changes and owner decisions, using this task's context
to avoid repeating unchanged findings.
Timestamp-only report regeneration, unchanged empty queues, and previously reported
missing analytics exports do not by themselves constitute meaningful changes.

## Verification

- `npm run verify`: type checks and audits included in `npm test`, scoring sensitivity,
  all existing workspace tests, then production build without repeating type checks.
- `npm run operations:verify`: existing evidence, safety, independent verification,
  capacity, workspace tests, build, and rollback gates. Build uses `build:app` because
  type checking is already an explicit gate.
- `npm test` and `npm run build`: unchanged standalone behavior.

For route changes, retain the route-specific checks required by the route workflow.
The combined command does not replace those requirements. No deployment, merge,
store submission, or external notification is performed by these commands.

## Audit and rollback

The initial audit is in `workflow-audit-2026-09-06.md`. Original local automation
settings were saved to `.local/workflow-audit/automations-before.json`. Restore
the reviewer's previous settings through the app's automation update tool, preserving
its ID and project target. To undo the new follow-up, delete
`paddletoday-daily-workflow-brief` through the same tool. Do not recreate obsolete
jobs from the backup. All schedule changes use America/Chicago.
