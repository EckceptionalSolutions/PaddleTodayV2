# Azure Container Apps snapshot worker

River snapshot generation runs as a scheduled Azure Container Apps Job. The
job is the authoritative production scheduler; the GitHub Actions snapshot
workflow remains available for manual fallback and verification.

## Architecture

```text
Azure Container Apps scheduled job
  -> snapshot-worker container
  -> npm run snapshots:refresh
  -> existing river-snapshots Blob container
  -> API reads the published summary/detail blobs
```

The worker uses one replica, a 30-minute UTC schedule at minute 7 and 37,
a 1,800-second replica timeout, and three replica retries. The schedule is
intentionally offset from the GitHub Actions load boundaries that caused the
previous gaps.

Resources are defined in:

- `infra/azure/container-apps-platform.bicep`
- `infra/azure/container-apps-job.bicep`
- `infra/azure/snapshot-worker/Dockerfile`
- `.github/workflows/azure-container-apps-snapshot-worker.yml`

The deployment creates the `paddletodayjobs` Azure Container Registry, a
`paddletoday-jobs` Container Apps environment with Log Analytics, and the
`paddletoday-river-snapshots` scheduled job. The job's system-assigned
identity pulls the private image through the `AcrPull` role.

The same deployment creates an Azure Monitor log-search alert and action
group. It evaluates terminal job executions every 15 minutes and emails the
operations mailbox only when the two most recent executions both exhausted
their retry limit. A later successful execution automatically resolves the
alert. Set the optional GitHub Actions variable `SNAPSHOT_ALERT_EMAIL` to
override the default `hello@paddletoday.com` recipient.

## Deployment

Pushes to `main` that affect the worker, source, dependencies, or Bicep
definition run the deployment workflow. It provisions the platform, builds a
commit-pinned image with Azure Container Registry, deploys the job, and starts
one verification execution.

The worker currently receives the existing
`RIVER_SNAPSHOT_CONTAINER_SAS_URL` through a Container Apps secret. The next
security hardening step is replacing that SAS-based Blob adapter with Azure
Entra authentication and assigning the job and API only the required Blob
data roles. Azure-hosted runs also treat the NOAA MRMS rainfall endpoint as an
optional provider because its Azure responses currently return HTTP 403;
NWS weather and gauge coverage remain protected by the normal quality gates.

## Operations

List recent executions:

```sh
az containerapp job execution list \
  --name paddletoday-river-snapshots \
  --resource-group paddletoday
```

Start a manual execution:

```sh
az containerapp job start \
  --name paddletoday-river-snapshots \
  --resource-group paddletoday
```

The existing manual GitHub workflow can be run from the Actions tab when a
runner-based verification is needed. It should not be used as the normal
production schedule.

## Failure behavior

The snapshot command already retries individual upstream reads and publishes
the summary blobs last. If a run fails, the previous complete summary remains
available. Once it is more than two hours old, public summary, weekend, group,
and detail endpoints keep serving it with `snapshotStatus: "stale"`, an age,
and degraded live-data states instead of recomputing the full board inside a
request. Clients show a visible stale-data warning. Container Apps retries the
failed replica, and Azure Monitor alerts after two consecutive failed
executions.
