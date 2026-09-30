# Azure Blob lifecycle policy

The production `paddletoday` storage account now has its lifecycle policy managed by `infra/azure/container-apps-platform.bicep`.

The policy is intentionally limited to `river-history/hourly/`:

- Hourly history blobs move to the Cool tier after two days without modification.
- Hourly history blobs are deleted after 180 days without modification.
- `river-history/daily/`, `river-snapshots/`, user data, alerts, requests, and web assets are not covered.

The application reads hourly history only for the current local day. Daily summaries remain in their existing per-route blobs and are not deleted by this policy. The 180-day window keeps a substantial recovery and audit window while bounding the unbounded growth of one-blob-per-route-per-day hourly history.

## Deployment

The snapshot-worker deployment workflow applies the policy through the platform Bicep deployment. The policy is idempotent and does not require account keys or a data-plane SAS token.

To inspect the effective policy:

```powershell
az storage account management-policy show `
  --account-name paddletoday `
  --resource-group paddletoday
```

Lifecycle processing is asynchronous and normally runs at least once per day. A recently written blob can therefore remain Hot briefly after it crosses the two-day threshold.

## Rollback

Rollback means restoring the previous Bicep revision and redeploying the platform template. Removing the policy stops future tier transitions and deletions; it does not restore blobs already deleted by the service. Preserve any required long-term history outside the hourly prefix before reducing the retention window.
