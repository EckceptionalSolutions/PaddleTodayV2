# Paddle Today

`canoe-adventures-v2` is the new codebase for a reset version of Paddle Today.

The product question is simple:

`Can I paddle this river today, and how good will it be?`

This app is intentionally narrow. The MVP currently ships:

 - 15 river reaches
- a live summary page
- a dedicated About page for methodology and trust notes
- a dedicated Request a river page for new reach submissions
- a detail page per river
- a score
- a confidence level
- a concise explanation
- key supporting factors
- explicit live-data status and freshness notes
- a summary-page current-read status strip with last backend scoring time
- a compact summary-page midpoint map with score markers and confidence rings
- a river-detail access map with direct links out to Google Maps and OpenStreetMap
- carried-over put-in and take-out data on river detail pages, including access maps and route logistics
- a Rice Creek access-planner prototype for selecting shorter in/out pairs on the same scored route
- API-backed source badges on summary cards so threshold quality stays visible after live reordering and filtering
- explicit flow-band calls, target bands, and hard bounds on river detail pages
- explicit threshold-model calls, including `minimum-only` guidance when only a low-water floor is defensible
- river detail timestamps for both latest gauge observation and latest score generation
- explicit threshold-evidence quality and confidence rationale on river detail pages
- river-detail gauge trend and compact weather visuals
- summary-page search plus state, region, and chip filters
- summary-page board sort modes plus an always-visible score map
- manual refresh controls plus 5-minute auto-refresh on summary and detail pages
- detail-page Go / Watch / Skip checklist
- detail-page 5-second launch-readiness block
- cautious tomorrow and weekend outlooks that are withheld when confidence is too weak
- summary/detail evidence badges for gauge and threshold quality
- explicit summary and detail reliability banners for `live`, `degraded`, and `offline` states
- stable `riverId` grouping metadata on route objects to prepare for river > route organization

It does not ship:

- route catalog sprawl
- community features
- review systems
- SEO filler content
- broad national coverage

## Stack

- Astro 5
- static Astro UI
- thin Node API/cache layer in `src/server/api-server.ts`
- client fetches app-owned `/api` endpoints instead of talking directly to USGS and Open-Meteo
- lean summary/detail API envelopes with per-request IDs
- lightweight MapLibre map surfaces loaded on demand from CDN
- Azure Blob-backed river-request intake, reusing the old Paddle Today storage pattern
- plain TypeScript
- no React for the MVP

This bootstrap is deliberate. The first slice is proving the river scoring model, not building deployment complexity early. The current backend is intentionally small: a standalone Node process with in-memory caching, fronted by the Astro dev server proxy.

## Commands

```sh
npm install
npm run api
npm run dev
npm run build
npm run preview
npm run preview:local
npm run start
npm run test
```

Run `npm run api` in one terminal and `npm run dev` in another during local development. The Astro dev server proxies `/api` to the local backend on port `4322`.

For a one-origin preview of the built app, run `npm run preview`. That serves the built `dist/` files and the `/api` endpoints from the same Node process on `4321`.

If the Astro dev server is already using `4321`, run `npm run preview:local` instead. That serves the same one-origin runtime on `4323`.

For deployment-style startup after a build, run `npm run start`. The Node server respects `PORT` or `CANOE_API_PORT`.

## Mobile app

The repo now includes an Expo / React Native MVP app in `apps/mobile`.

Shared mobile-safe code is intentionally small:

- `packages/api-contract`: portable API response types
- `packages/api-client`: thin fetch client for the existing PaddleToday JSON endpoints

Mobile commands:

```sh
npm run mobile:start
npm run mobile:android
npm run mobile:ios
npm run mobile:typecheck
```

Set `EXPO_PUBLIC_API_BASE_URL` in `apps/mobile/.env.local` when you want the app to point at a specific local or deployed API origin. If you do not set it, the mobile app falls back to the Expo dev host with port `4322`.

## Azure deployment

Recommended first production shape:

- Azure Static Web App for the frontend
- Azure App Service for the Node `/api` backend

This is intentionally not the exact old PaddleToday deployment shape. The frontend is still static, but the live API is a custom Node server, not an Azure Functions `api/` folder.

Deployment files are included for when this repo is moved into its own GitHub repository:

- [staticwebapp.config.json](./staticwebapp.config.json)
- [frontend workflow](./.github/workflows/azure-static-web-apps.yml)
- [backend workflow](./.github/workflows/azure-app-service-api.yml)
- [deployment plan](./docs/azure-deployment-plan.md)

Use the frontend workflow to deploy `dist/` to Azure Static Web Apps, then link an Azure App Service backend so `/api/*` is proxied to the Node server.

Health and runtime notes:

- `/health` returns uptime, river count, and in-memory cache stats
- `/health/ready` is the deploy-time readiness check
- `/api` responses carry a request ID in both the JSON body and the `x-request-id` response header
- `/api/river-request` and `/api/route-request` both accept the request form payload and write JSON blobs when storage is configured

Request intake env vars:

- `ROUTE_REQUESTS_CONTAINER_SAS_URL`
- `ROUTE_REQUESTS_BLOB_PREFIX`
- `ROUTE_CONTRIBUTIONS_CONTAINER_SAS_URL`
- `ROUTE_CONTRIBUTIONS_BLOB_PREFIX`
- `PADDLETODAY_ADMIN_PASSWORD`
- `PADDLETODAY_ADMIN_SESSION_SECRET`

If request storage is not configured or the write fails, the request page falls back to opening the user's email client with a prefilled message to `routes@paddletoday.com`.

Route contributions and moderation:

- route pages accept trip reports and photo uploads at `/api/route-photo-submissions`
- approved community photos and reports are loaded live from `/api/rivers/:slug/community.json`
- admin moderation lives at `/admin/`
- route contribution storage details are documented in [docs/route-contributions.md](./docs/route-contributions.md)

## Current seed rivers

- Cannon River: Cannon Falls to Welch
- Straight River: Krogh's Landing to Faribault
- Zumbro River: Green Bridge to Zumbro Falls
- Black Hawk Creek: Franck Park to Ranchero Road
- Rice Creek: Peltier Lake to Long Lake
- Kettle River: #5 trailer access to #6 trailer access
- South Fork Zumbro: 90th Street NW to Lake Zumbro
- Upper Iowa River: Kendallville Park to Decorah
- Sugar River: Belleville Community Park to County Road X
- Black Hawk Creek: Ranchero Road to Hope Martin Park
- Bark River: Highway 164 to Merton Millpond
- Kickapoo River: Ontario to Rockton
- Zumbro River: Theilman Access to Kruger Access
- Zumbro River: Kruger Access to West Newton
- Upper Iowa River: Trout Run Park to Lower Dam

Working threshold calibration notes for those seeded rivers live in [docs/seed-river-calibration.md](./docs/seed-river-calibration.md).

## Immediate next actions

1. Slim the detail payload further and make per-source degraded states more explicit when only gauge or only weather is stale.
2. Expand only to additional direct-gauge rivers with defensible thresholds and logistics, including explicit `minimum-only` handling where upper guidance is incomplete.
3. Replace the in-memory cache with a persistent snapshot/cache layer only when production traffic or upstream instability justifies it.
4. Add basic telemetry around upstream failure rates before moving the repo into its own standalone deployment.
