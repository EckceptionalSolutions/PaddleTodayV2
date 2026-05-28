# Route Requests Storage

Route requests are written by `/api/river-request` and `/api/route-request`, then read by the admin page at `/admin/`.

## App Service Settings

Set these on the Node API App Service:

- `ROUTE_REQUESTS_CONTAINER_SAS_URL`
- `ROUTE_REQUESTS_BLOB_PREFIX=route-requests`

The SAS must be container-scoped and include at least read, create, write, and list permissions. Use `racwdl` so the admin page can list requests and reply metadata can be written back to the request blob.

If `ROUTE_REQUESTS_CONTAINER_SAS_URL` is not set, the app falls back to local storage under `.local/route-requests`.

## Provisioning

If Azure CLI is authenticated, provision the container and print the needed App Service settings with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\provision-route-requests.ps1 -StorageAccount <storage-account-name>
```
