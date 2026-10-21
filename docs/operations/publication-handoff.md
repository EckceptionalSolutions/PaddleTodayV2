# Merged-change publication

`Publish merged changes` observes successful `Operations gates` PR runs. It resolves the tested PR through the commit API (the run's PR list can be empty after squash merging), checks that the same head was merged into this repository's `main`, and reconciles the current main commit against each component's most recent verified deployment.

The handoff uses the push-path filters in the frontend, API, and snapshot-worker workflow files. Unknown baselines and comparison lists that may exceed GitHub's 300-file limit conservatively require deployment. This catches changes from an intermediate handoff replaced in GitHub's pending queue. Asset-only checks and historical jobs without the explicit source/deploy title are not accepted as publication baselines.

Each requested workflow receives a full `source_revision` SHA. Checkout, API package identity, API revision gates, worker image tag, and worker `SOURCE_REVISION` use that pinned input. The workflow definition is dispatched on `main`; its GitHub `head_sha` can therefore differ from the pinned source. Use the source in the run title and handoff artifact when inspecting the actual deployed content. Existing deployments for the same source are reused. An existing failed run is surfaced for inspection rather than silently retried.

The handoff lock covers planning and dispatch only. A separate observer follows the exact returned run IDs through success or failure. Observation timeouts do not mean a process stopped and do not start replacements. The worker workflow additionally waits for its exact verification execution to succeed with the expected image; starting an execution alone cannot pass the release.

## Evidence and recovery

- `publication-handoff` records the merged PR, target source, component baselines, selection reasons, and requested or reused run IDs. A partial or unknown dispatch outcome is retained if a request fails.
- `publication-result` records terminal deployment-workflow outcomes. Workflow success is separate from release-specific verification of ordinary public URLs, API content, canonicals, and snapshot provenance.
- `snapshot-verification-execution` records the completed worker execution and image identity.

If a handoff or observation fails, inspect these exact run/execution handles first. A POST timeout may already have created a deployment. Check for that source's named run before requesting another. For a known failed deployment, inspect or rerun that deployment; do not restart a live run because a local observation expired.

The handoff can be resumed with `workflow_dispatch` and the successful `Operations gates` run ID in `gate_run_id`. It repeats merge validation and baseline reconciliation and reuses existing runs. A PR still awaiting merge is recorded as `not-merged`; it is never dispatched as a release. No new personal access token, alert run, or notification send is involved.

Reference: [GitHub workflow event behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) and [workflow dispatch API](https://docs.github.com/en/rest/actions/workflows#create-a-workflow-dispatch-event).
