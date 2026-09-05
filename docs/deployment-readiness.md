# Deployment Readiness

## Runtime shape

- Build the static app with `npm run build`.
- Azure Static Web Apps serves the public frontend and proxies `/api/*` to the linked App Service.
- The App Service package also contains `dist/` and serves the built app plus `/api` from one Node process with `npm run start`. This makes the backend origin independently smoke-testable and provides a one-origin fallback without changing browser API paths.
- The Node server reads:
  - `PORT` or `CANOE_API_PORT`
  - `CANOE_API_HOST`
- The API initializes the Azure Monitor OpenTelemetry distro when `APPLICATIONINSIGHTS_CONNECTION_STRING` is present. Production also sets `OTEL_SERVICE_NAME=paddletoday-api` so request, dependency, exception, trace, and metric telemetry is grouped under the API role in Application Insights. The Linux App Service keeps codeless coverage active between deployments with `ApplicationInsightsAgent_EXTENSION_VERSION=~3` and `XDT_MicrosoftApplicationInsights_Mode=recommended`; the managed agent backs off when it detects the deployed SDK.
- Umami Cloud web analytics loads with PaddleToday's public website ID by default. `PUBLIC_UMAMI_WEBSITE_ID` can override the ID and `PUBLIC_UMAMI_SCRIPT_SRC` can select a custom or self-hosted script. The public website ID is not a credential.

## Health endpoints

- Public frontend origin: `/api/health` and `/api/health/ready`
- Direct App Service origin: `/health` and `/health/ready` are aliases; the `/api/...` forms work there too

The public Paddle Today origin is an Azure Static Web App linked to App Service, and that integration proxies `/api/*`. Use `/api/health/ready` for public deploy-time checks. It verifies the static index is present when the App Service is running in one-origin mode.

Both endpoints expose:

- in-memory cache stats, so a deploy can distinguish "server is up" from "server is repeatedly missing cache and upstreams"
- privacy-safe upstream telemetry grouped by hostname, including request success/failure rate, retries, rate limits, 5xx responses, timeouts, latency, consecutive failures, and the most recent failure category

The telemetry is process-local and resets on restart. It intentionally records hostnames rather than full URLs so gauge IDs, coordinates, and query parameters are not copied into health payloads. Readiness remains a process/static-asset check; a transient upstream failure is visible in telemetry but does not restart an otherwise healthy server.

The scheduled river-snapshot job evaluates the same telemetry in the process that actually contacts gauge and weather providers. It preserves the previous production snapshot and fails the workflow when the aggregate failure rate reaches 35% after 50 requests, a provider reaches 75% after 10 requests, a provider reaches eight consecutive failures, or the scoring run produces no telemetry. These deliberately require meaningful samples so a brief upstream wobble does not create a noisy incident. Override them only when needed with:

- `UPSTREAM_MONITOR_MIN_REQUESTS`
- `UPSTREAM_MONITOR_MAX_FAILURE_RATE`
- `UPSTREAM_MONITOR_MIN_PROVIDER_REQUESTS`
- `UPSTREAM_MONITOR_MAX_PROVIDER_FAILURE_RATE`
- `UPSTREAM_MONITOR_MAX_CONSECUTIVE_FAILURES`

## API runtime notes

- `/api/rivers/summary.json` returns a lean summary envelope for the homepage, not the full scoring object for every river.
- `/api/rivers/:slug.json` returns a slimmer detail envelope that keeps live scoring data but drops static editorial fields already baked into the HTML.
- Every JSON response includes a `requestId`, and the same value is sent in the `x-request-id` response header.
- Request logs now include the request ID so browser/API failures can be matched to server logs quickly.
- Manual history and river-snapshot refresh endpoints fail closed in production unless `HISTORY_SNAPSHOT_TOKEN` or `SNAPSHOT_REFRESH_TOKEN` is configured.

## Write-endpoint rate limits

Alerts, feedback, route contributions, and route requests each have an independent per-client sliding-window quota. The default is five attempts per ten minutes. A rejected request returns `429` with `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, and `Retry-After` headers. Rejected attempts do not extend the lockout.

Optional runtime overrides:

- `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX` set the shared defaults.
- `RATE_LIMIT_ALERTS_WINDOW_MS` / `RATE_LIMIT_ALERTS_MAX`
- `RATE_LIMIT_FEEDBACK_WINDOW_MS` / `RATE_LIMIT_FEEDBACK_MAX`
- `RATE_LIMIT_ROUTE_CONTRIBUTIONS_WINDOW_MS` / `RATE_LIMIT_ROUTE_CONTRIBUTIONS_MAX`
- `RATE_LIMIT_ROUTE_REQUESTS_WINDOW_MS` / `RATE_LIMIT_ROUTE_REQUESTS_MAX`
- `RATE_LIMIT_ADMIN_LOGIN_WINDOW_MS` / `RATE_LIMIT_ADMIN_LOGIN_MAX`

When the API is behind a reverse proxy, set `TRUSTED_PROXY_IPS` to a comma-separated list of the proxy socket addresses before enabling forwarded-client attribution. Forwarded headers from unlisted clients are ignored and the limiter uses the direct socket address. Configure a shared edge limit for multi-instance deployments.

The application limiter is a bounded, process-local abuse backstop. Multi-instance deployments must also configure and validate an edge limit at App Gateway, Front Door, Cloudflare, or an equivalent shared ingress layer.

The API deployment package and snapshot worker use committed lockfiles and `npm ci`; the API startup command assumes dependencies were installed during deployment. Run `npm run snapshots:capacity` against a captured summary before release to record payload headroom against the 4 MiB summary budget.

Contribution uploads are decoded, resized, re-encoded as JPEG, and metadata-stripped before they can become public derivatives. Apply the retention windows and deletion procedure in [`contribution-retention-policy.md`](contribution-retention-policy.md) before enabling long-term production retention.

An authenticated administrator can remove a contribution with `DELETE /api/admin/route-contributions/{submissionId}`; the handler removes the submission index entry, source files, and any approved community derivatives.

Exercise the complete HTTP contract against a local or staging API:

```sh
RATE_LIMIT_BASE_URL=https://staging.example.com npm run rate-limit:smoke
```

The command uses honeypot no-op alert submissions, confirms the configured number are accepted, and then validates the `429` payload and retry headers. It refuses to run against the public Paddle Today origin unless `RATE_LIMIT_ALLOW_PRODUCTION=true` is set intentionally. Set `RATE_LIMIT_EXPECTED_MAX` when the target uses a non-default alerts quota.

## Recommended deploy flow

1. Install dependencies with `npm ci`.
2. Build with `npm run build`.
3. Start with `npm run start`.
4. Probe `/api/health/ready` through the public frontend origin.
5. Probe `/api/rivers/summary.json`.

Run the complete smoke suite against any deployed origin:

```sh
DEPLOYMENT_BASE_URL=https://paddletoday.com npm run deployment:smoke
```

The suite checks readiness, health/cache/upstream telemetry, the static homepage, summary and weekend boards, a real route detail, GPX and calendar attachments, JSON request IDs, security headers, and the response-header/body request-ID match. It defaults to `/api/health` and `/api/health/ready`, which work through both the linked frontend origin and the App Service origin. `DEPLOYMENT_HEALTH_PATH` and `DEPLOYMENT_READINESS_PATH` can override those paths for a nonstandard ingress. The API deployment workflow runs the same suite after deployment when the `AZURE_WEBAPP_URL` repository secret is configured, with bounded retries for App Service startup.

## Pre-release checklist

- `npm test` passes.
- `npm run build` passes.
- `/api/health/ready` returns `200` through the public origin.
- `/api/rivers/summary.json` returns live river JSON.
- `/api/health` shows sane cache counters and no runaway `loadErrors`.
- `/api/health` shows upstream `failureRate`, `consecutiveFailures`, `rateLimitedResponses`, and `timeouts` within expected bounds for USGS, NWS, and NOAA hosts.
- Logo and map assets load under the deploy origin.
- At least one detail page loads score, checklist, outlooks, map, and gauge chart.
- The built frontend includes the deferred Umami script with website ID `ce97ebc3-44ba-4c12-898e-666c904bc6b6`.
- Logs and `/api/health` show normal request flow without repeated upstream failures.
- `npm run rate-limit:smoke` passes against staging, and any shared edge limiter has a separately recorded 429 test.
- The public ingress restricts direct App Service access as intended, terminates TLS, sends HSTS, and uses least-privilege SAS/IAM scopes; follow [`deployment-platform-verification.md`](deployment-platform-verification.md) and record the platform-side evidence with the deployment run.

## Current constraints

- The hot response cache is in-memory; scheduled river and history snapshots are persisted separately when blob storage is configured.
- Application rate-limit buckets are process-local; use an edge limit for a shared quota across scaled instances.
- No persistent job runner yet.
- No database yet.
- Summary, weekend, group, and detail endpoints use stored river snapshots when configured. Valid snapshots older than two hours are returned with `snapshotStatus: "stale"`, `snapshotAgeSeconds`, and degraded live-data states; the API does not fan out a full live-board recomputation merely because a stored snapshot is stale. If no valid stored snapshot exists at all, the endpoints retain their live fallback behavior.
