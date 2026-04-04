# River Snapshots

Paddle Today can precompute route snapshots so homepage and river APIs serve stored data instead of recomputing scores for every user request.

## What gets stored

Each refresh writes:

- `summary.json`
- `details/<slug>.json`
- `groups/<riverId>.json`

Those payloads match the existing API shapes for:

- `/api/rivers/summary.json`
- `/api/rivers/<slug>.json`
- `/api/river-groups/<riverId>.json`

## Runtime behavior

The API now works like this:

1. read the latest stored snapshot
2. return it immediately if available
3. fall back to live scoring only when no stored snapshot exists

This keeps page traffic from driving live recomputation under normal operation.

## Local development

No setup is required.

Refresh local snapshots with:

```powershell
npm run snapshots:refresh
```

Local files are written under:

- `.local/river-snapshots/summary.json`
- `.local/river-snapshots/details/<slug>.json`
- `.local/river-snapshots/groups/<riverId>.json`

## Production storage

Add these App Service settings:

- `RIVER_SNAPSHOT_CONTAINER_SAS_URL`
- `RIVER_SNAPSHOT_BLOB_PREFIX`
- `SNAPSHOT_REFRESH_TOKEN`

Recommended prefix:

- `river-snapshots`

The refresh endpoint is:

- `POST /api/snapshots/refresh`

When `SNAPSHOT_REFRESH_TOKEN` is set, the request must send the same token in:

- `x-history-token`

If `SNAPSHOT_REFRESH_TOKEN` is not set, the endpoint falls back to:

- `HISTORY_SNAPSHOT_TOKEN`

## Scheduled refresh

The scheduled workflow is:

- `.github/workflows/river-snapshots.yml`

It runs every 30 minutes and calls the live refresh endpoint.

Configure these GitHub repository secrets:

- `SNAPSHOT_REFRESH_URL`
- `SNAPSHOT_REFRESH_TOKEN`

Recommended URL:

- `https://<your-api-host>/api/snapshots/refresh`

Example:

- `https://paddletodayapi.azurewebsites.net/api/snapshots/refresh`

## Recommended production model

- route history remains an hourly capture
- river snapshots refresh every 30 minutes
- page traffic reads stored snapshots first
- live scoring stays available only as a fallback path
