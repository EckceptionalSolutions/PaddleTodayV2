# Azure Deployment Plan

## Recommended production shape

Use two Azure resources:

- Azure Static Web App for the Astro frontend
- Azure App Service for the Node `/api` backend

This is the best fit for the current codebase because the frontend is static, but the live data layer is a custom Node server in `src/server/api-server.ts`, not an Azure Functions `api/` app.

## Why not reuse the old Static Web Apps flow exactly

The old PaddleToday deployment shape was:

- build static app to `dist`
- deploy `dist` to Azure Static Web Apps
- deploy an `api/` Azure Functions folder alongside it

`canoe-adventures-v2` does not currently have an `api/` Functions folder. The live endpoints are served by a standalone Node process:

- `/api/rivers/summary.json`
- `/api/rivers/:slug.json`
- `/api/river-groups/:riverId.json`
- `/api/river-request`
- `/api/route-request`
- `/health`
- `/health/ready`

Rewriting that backend into Azure Functions is possible later, but it is unnecessary work for the first production deployment.

## Recommended Azure resources

### 1. Static Web App

Use Azure Static Web Apps for:

- `https://paddletoday.com`
- static frontend hosting
- custom domain + TLS
- routing + navigation fallback
- proxying `/api/*` to the linked backend

Plan requirement:

- Standard plan

Reason:

- Azure Static Web Apps can proxy `/api` requests to a linked App Service backend, and that integration requires the Standard plan.

Official doc:

- [API support in Azure Static Web Apps with Azure App Service](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-app-service)

### 2. App Service

Use Azure App Service for:

- the Node backend
- health checks
- live USGS and Open-Meteo fetches
- request intake writes to Azure Blob

Recommended baseline:

- Linux App Service
- Node 20
- startup command: `npm start`

## Production request flow

1. Browser loads static Astro pages from Static Web Apps.
2. Browser requests `/api/...` on the same origin.
3. Static Web Apps proxies `/api/*` to the linked App Service app.
4. App Service runs `src/server/api-server.ts` through `npm start`.
5. Backend fetches USGS/Open-Meteo, scores rivers, and returns JSON.

This preserves the current same-origin client behavior, so frontend code does not need to change.

## Repo changes already compatible with this shape

- frontend builds cleanly with `npm run build`
- backend starts cleanly with `npm run start`
- health checks exist:
  - `/health`
  - `/health/ready`
- frontend already talks to app-owned `/api/*` paths

## Required app settings

Set these in App Service:

- `NODE_ENV=production`
- `PORT`
- `ROUTE_REQUESTS_CONTAINER_SAS_URL`
- `ROUTE_REQUESTS_BLOB_PREFIX`

Optional:

- `CANOE_API_HOST`
- `CANOE_API_PORT`

In production, `PORT` should be enough. The server already respects `PORT`.

## GitHub Actions split

Use two workflows once `canoe-adventures-v2` is in its own repo:

### Frontend workflow

Deploys:

- Astro `dist/`
- `staticwebapp.config.json`

Target:

- Azure Static Web App

### Backend workflow

Deploys:

- Node app to Azure App Service

Target:

- Azure Web App

## GitHub secrets needed

### Static Web App

- `AZURE_STATIC_WEB_APPS_API_TOKEN`

### App Service

- `AZUREAPPSERVICE_PUBLISHPROFILE`

If you prefer OIDC later, switch the App Service workflow to `azure/login`, but publish profile is the fastest first pass.

## DNS and custom domain

Recommended order:

1. Deploy frontend to the Static Web App default domain.
2. Deploy backend to the App Service default domain.
3. Link the App Service backend inside the Static Web App.
4. Verify `/api/*` works through the Static Web App domain.
5. Add `paddletoday.com` and `www.paddletoday.com` to Static Web Apps.
6. Cut DNS only after `/health/ready` and `/api/rivers/summary.json` are healthy through the production frontend domain.

## Release checklist

1. Frontend workflow deploys `dist/`.
2. App Service workflow deploys backend and starts successfully.
3. Static Web App is linked to the App Service backend.
4. `https://<swa-domain>/health/ready` returns `200`.
5. `https://<swa-domain>/api/rivers/summary.json` returns live JSON.
6. Homepage loads live calls.
7. A river detail page loads score, map, gauge chart, and access planner.
8. Request form works with Azure Blob storage configured.
9. `paddletoday.com` custom domain is attached only after the above checks pass.

## Later cleanup

After the first production deploy is stable, decide whether to:

- keep `SWA + App Service` as the permanent architecture, or
- port the backend into Azure Functions to return to a single-resource SWA deployment shape

For now, do not rewrite the backend just to match the old deployment model.
