# Route Score History

Paddle Today can store hourly route score snapshots and roll them up into daily history for each route.

## What it captures

Each snapshot stores the current route call, including:

- score and rating
- river quality
- wind, temperature, rain, and comfort adjustments
- current gauge label/value
- current temperature, wind, and rain chance

Those hourly snapshots are rolled into a daily summary with:

- average score
- min and max score
- latest score and rating
- morning score
- afternoon score

## Runtime configuration

The API supports local file storage and Azure Blob Storage.

### Local development

No setup is required.

Hourly snapshots are written under:

- `.local/river-history/hourly/<slug>/<date>.json`
- `.local/river-history/daily/<slug>.json`

Run a manual capture with:

```powershell
npm run history:snapshot
```

### Production storage

Add these App Service settings for the API/runtime:

- `RIVER_HISTORY_CONTAINER_SAS_URL`
- `RIVER_HISTORY_BLOB_PREFIX`
- `HISTORY_SNAPSHOT_TOKEN`

Recommended prefix:

- `river-history`

The snapshot endpoint is:

- `POST /api/history/snapshot`

When `HISTORY_SNAPSHOT_TOKEN` is set, the request must send the same token in:

- `x-history-token`

## GitHub Actions automation

The scheduled workflow is:

- `.github/workflows/history-snapshots.yml`

It runs hourly and writes history snapshots directly to the configured history blob container.

Configure these GitHub repository settings:

- secret: `RIVER_HISTORY_CONTAINER_SAS_URL`
- variable: `RIVER_HISTORY_BLOB_PREFIX`
- variable: `HISTORY_TIME_ZONE`

Recommended values:

- `RIVER_HISTORY_BLOB_PREFIX=river-history`
- `HISTORY_TIME_ZONE=America/Chicago`

The old `POST /api/history/snapshot` endpoint can still be used manually, but it is no longer the recommended scheduled path.

## Route history API

Each route history can be read from:

- `/api/rivers/<slug>/history.json`

Optional query:

- `?days=7`

Example:

- `/api/rivers/rice-creek-peltier-to-long-lake/history.json?days=7`
