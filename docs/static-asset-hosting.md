# Gallery and map assets in Azure Blob Storage

The frontend publishes `public/gallery` and `public/data` to the `web-assets`
container of the existing `paddletoday` storage account. Only this container is
public; request, alert, history, and snapshot containers remain private.

## Deployment order

1. Run tests and `npm run prebuild:app` to generate the map overview.
2. Run `node scripts/static-assets.mjs prepare`. It stages files under
   `tmp/static-assets/upload`, records their hashes, and exports
   `PUBLIC_ASSET_BASE_URL` and `ASSET_RELEASE` through `GITHUB_ENV`.
3. Build Astro with that URL. The URL contains a SHA-256 release identifier
   derived from every asset path and its contents. Local builds with no
   `PUBLIC_ASSET_BASE_URL` keep the original local paths.
4. Package `tmp/frontend` without `gallery` or `data`. Packaging checks that
   the built assets exactly match the prepared inventory. Full `dist` is left
   intact for the separate API deployment, which reads geometry files locally.
5. Upload assets with explicit MIME types and transport MD5 validation. Release
   paths have one-year immutable caching. `legacy` paths have five-minute caching;
   uploads retain old file names needed by installed mobile releases.
6. Verify every versioned asset with an anonymous HEAD request, including size,
   type, cache policy and CORS. Also verify sample content hashes and legacy URLs.
   Network failures, interrupted GET bodies, HTTP 408/429 and server errors get
   up to three attempts with one- and two-second backoff. Errors include the
   asset URL and underlying cause. Permanent HTTP failures and incorrect asset
   contents or headers still fail verification immediately.
   A bounded HTTP keep-alive pool reuses connections for HEAD probes. Node's
   built-in fetch closes HEAD connections, which exhausted CI connection capacity
   during the full inventory check; retries alone did not fix that failure.
7. Deploy `tmp/frontend` to Static Web Apps only after those checks pass.

For rollout validation, manually dispatch the frontend workflow with
`deploy_frontend=false`. This runs tests, builds, publishes, and verifies assets
using the real CI identity, but skips the compatibility gate and frontend
deployment. Pushes to main always run the compatibility gate before deployment.

To diagnose public verification without repeating builds and uploads, dispatch
with `verify_existing_assets=true`. This prepares the expected inventory and
checks existing versioned and legacy assets plus the compatibility redirects.
It always skips frontend deployment, even if `deploy_frontend` is true. Use it
only after the selected revision's asset release has already been uploaded.

## Azure setup

The workflow uses its existing `AZURE_CREDENTIALS` with `azure/login@v2`.
Its principal needs **Storage Blob Data Contributor**, scoped only to:

`/subscriptions/a2cc52c3-7f4e-4de7-bf59-9cc6f99bc8e2/resourceGroups/paddletoday/providers/Microsoft.Storage/storageAccounts/paddletoday/blobServices/default/containers/web-assets`

The container permits anonymous blob reads (not anonymous listing or writes).
Blob CORS permits public GET/HEAD reads from any origin so SWA previews and web
clients can read map JSON. CORS does not grant access to private containers.
Preserve other CORS rules when applying this rule. No new storage account or
billable compute service is required; storage and transfer usage still apply.

## Existing mobile releases and cached pages

Existing mobile releases use `https://paddletoday.com/gallery/...`. Their URLs
must keep working after the frontend stops carrying the files. A Cloudflare
Single Redirect sends `/gallery/*` and `/data/*` on the apex host to
`https://paddletoday.blob.core.windows.net/web-assets/legacy` plus the original
path, retaining query parameters. It uses HTTP 302. The existing `www` host
already redirects to the apex host with the path preserved.

After uploading assets, run:

```sh
export AZURE_STORAGE_ACCOUNT=paddletoday
export AZURE_ASSET_CONTAINER=web-assets
# CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID supplied securely in the environment.
node scripts/static-asset-redirect.mjs show
node scripts/static-asset-redirect.mjs apply
node scripts/static-asset-redirect.mjs verify
```

The Cloudflare token needs **Dynamic URL Redirects: Edit** for paddletoday.com.
`apply` creates or updates only the rule with ref
`paddletoday_legacy_static_assets`, or the dashboard-created rule with the same
name and match expression; other rules are preserved. Routine deployments
only verify the public redirect and do not require Cloudflare credentials.
The frontend workflow intentionally fails if compatibility is not active.

If the API rejects the token, create a Single Redirect through the Cloudflare
dashboard using the name, custom filter, dynamic destination, status code and
query-string setting printed by `show`, then run `verify`. The initial rollout
used this dashboard path on September 17, 2026 after the account-owned token
continued returning HTTP 403 despite its scoped redirect-edit permission.
Both public compatibility probes passed after activation.

## Rollback and retention

Old frontend deployments continue to use their original immutable release URLs.
Do not delete a release while it is deployed, eligible for rollback, or referenced
by supported cached pages. Do not automatically delete legacy gallery paths:
installed mobile apps may still reference them. No cleanup is included here.
Content-addressed release folders avoid duplicating identical asset inventories,
but changing the inventory creates another complete release; monitor storage
growth and introduce a separately reviewed retention policy as needed.

For a local retry, use a fresh staging/package directory (or explicitly remove
only `tmp/static-assets` and `tmp/frontend`). This deliberate requirement prevents
stale files from leaking into uploads. Do not change immutable release contents.

## References

- [Azure Blob authorization](https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-data-operations-cli)
- [Cloudflare Single Redirects API](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-api/)
