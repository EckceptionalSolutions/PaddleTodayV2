# Deployment Readiness

## Runtime shape

- Build the static app with `npm run build`.
- Serve the built app and `/api` endpoints from one Node process with `npm run start`.
- The Node server reads:
  - `PORT` or `CANOE_API_PORT`
  - `CANOE_API_HOST`

## Health endpoints

- `/health`
- `/health/ready`

Use `/health/ready` for deploy-time readiness checks because it verifies the static index is present when running in one-origin mode.

Both endpoints now also expose in-memory cache stats so a deploy can distinguish "server is up" from "server is repeatedly missing cache and upstreams."

## API runtime notes

- `/api/rivers/summary.json` returns a lean summary envelope for the homepage, not the full scoring object for every river.
- `/api/rivers/:slug.json` returns a slimmer detail envelope that keeps live scoring data but drops static editorial fields already baked into the HTML.
- Every JSON response includes a `requestId`, and the same value is sent in the `x-request-id` response header.
- Request logs now include the request ID so browser/API failures can be matched to server logs quickly.

## Recommended deploy flow

1. Install dependencies with `npm ci`.
2. Build with `npm run build`.
3. Start with `npm run start`.
4. Probe `/health/ready`.
5. Probe `/api/rivers/summary.json`.

## Pre-release checklist

- `npm test` passes.
- `npm run build` passes.
- `/health/ready` returns `200`.
- `/api/rivers/summary.json` returns live river JSON.
- `/health` shows sane cache counters and no runaway `loadErrors`.
- Logo and map assets load under the deploy origin.
- At least one detail page loads score, checklist, outlooks, map, and gauge chart.
- Logs show normal request flow without repeated upstream failures.

## Current constraints

- Cache is in-memory only.
- No persistent job runner yet.
- No database yet.
- Upstream USGS and Open-Meteo failures still degrade the app in real time rather than falling back to historical snapshots.
