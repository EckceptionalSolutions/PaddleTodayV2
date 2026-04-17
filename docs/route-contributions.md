# Route Contributions Storage

Paddle Today now supports Azure-backed storage for:

- pending route report + photo submissions
- approved community photos
- approved community trip reports

## App Service settings

Set these on the Node API App Service:

- `ROUTE_CONTRIBUTIONS_CONTAINER_SAS_URL`
- `ROUTE_CONTRIBUTIONS_BLOB_PREFIX=route-contributions`
- `PADDLETODAY_ADMIN_PASSWORD`
- `PADDLETODAY_ADMIN_SESSION_SECRET`

If `ROUTE_CONTRIBUTIONS_CONTAINER_SAS_URL` is not set, the app falls back to local storage under `.local/route-contributions`.

## Recommended Azure shape

Use one Azure Storage container with a container-level SAS URL that allows the app to read and write blobs.

If Azure CLI is authenticated, you can provision the container and print the needed App Service settings with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\provision-route-contributions.ps1 -StorageAccount <storage-account-name>
```

Suggested blob layout:

- `route-contributions/submissions/index.json`
- `route-contributions/submissions/<submission-id>/submission.json`
- `route-contributions/submissions/<submission-id>/files/<filename>`
- `route-contributions/approved/photos/<river-slug>.json`
- `route-contributions/approved/reports/<river-slug>.json`
- `route-contributions/approved/files/<river-slug>/<submission-id>-<filename>`

Approved photos are served through the API at `/api/community-photos/...`, so the blob container does not need to be public.

## Admin review page

Admin review lives at `/admin/`.

The page is password-protected through the API using:

- `PADDLETODAY_ADMIN_PASSWORD`
- `PADDLETODAY_ADMIN_SESSION_SECRET`

The admin page can:

- sign in
- view pending, approved, or rejected submissions
- preview submitted images
- approve submissions
- reject submissions

Approving a submission does two things:

- photos become available in the route gallery
- trip reports become available in the route page community reports section
