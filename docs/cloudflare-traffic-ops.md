# Cloudflare Traffic Operations

Use this if `paddletoday.com` or the API origin is proxied through Cloudflare.

For Search Console, Umami, event naming, and dashboard conventions, see `docs/growth-measurement-ops.md`.

## Goal

Use Cloudflare for edge-level traffic analysis:

- request volume
- visits
- data transfer
- regional traffic changes
- outage correlation
- bot or abuse spikes
- cache and origin pressure

Cloudflare should complement Firebase. Firebase tells us what native app users do; Cloudflare tells us what traffic reaches the web/API edge.

## Access

Create a Cloudflare API token with read-only analytics access for the PaddleToday zone.

Required local environment:

```sh
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ZONE_ID=...
```

### Exact-URL cache purges

Keep the traffic credential read-only. The `Purge selected public API cache`
workflow uses a separate repository Actions secret, `CLOUDFLARE_CACHE_PURGE_TOKEN`.
Create a Cloudflare API token named `PaddleToday cache purge` with only
**Zone → Cache Purge → Purge**, scoped to **Include → Specific zone → paddletoday.com**.
Save it at GitHub → EckceptionalSolutions/PaddleTodayV2 → Settings → Secrets and
variables → Actions. Keep the existing `CLOUDFLARE_ZONE_ID`. Do not add the purge
permission to the traffic token or paste credentials into reports or chat.

After configuring the secret and publishing the workflow change to main, dispatch
`public-api-cache-purge.yml` on main with the exact intended public API paths.
The existing default is `/api/rivers/allagash-river-churchill-dam-umsaskis/trip.gpx`.
The script accepts at most ten public route API paths and cannot purge the whole
zone or private account/trip endpoints. Require `purge-accepted` from Cloudflare;
then fetch the ordinary intended URL and verify its response/content separately.
An accepted purge alone does not prove correct content delivery.

November 4, 2026 diagnosis: the local credential successfully reads the active
PaddleToday zone and verifies as an active **account-owned** token using
`/accounts/{account_id}/tokens/verify`. The user-token verification endpoint is
not the correct validity test for this credential. The exact-URL purge still
returns HTTP 401/code 10000. Reading token details/permission groups returns
403/code 9109, so this identity cannot inspect or repair its permissions.
The dedicated purge secret must be provisioned before a successful purge can
be established; token expiry was not the cause shown by these checks.

Optional:

```sh
CLOUDFLARE_LOOKBACK_HOURS=24
```

Run:

```sh
npm run cloudflare:traffic
```

The script uses Cloudflare's GraphQL Analytics API at `https://api.cloudflare.com/client/v4/graphql`.

## Current Script

`scripts/cloudflare-traffic-summary.mjs` queries `httpRequestsAdaptiveGroups` for recent eyeball traffic and prints:

- top Cloudflare colos by request count
- visits
- edge response bytes

The totals are based on the returned top-colo groups, so use them for quick operational checks, not billing or exact accounting.

## Operational Checks

Daily during launch:

1. Compare request volume with Firebase app opens.
2. Look for spikes in failed API diagnostics.
3. Check whether traffic is unusually concentrated in one region.
4. Compare Cloudflare errors with Azure/API health checks.
5. Escalate sudden traffic changes that align with support emails or store reviews.

Weekly:

1. Review traffic trends by launch, app update, and route expansion.
2. Identify high-traffic API paths that may need cache or payload optimization.
3. Check for obvious bot or scraper behavior against route/detail endpoints.
4. Confirm support/contact pages are reachable and not blocked by rules.

## Useful Signals

High value:

- `/api/rivers/summary.json` request volume.
- route detail page traffic.
- contact/support page traffic.
- 4xx/5xx changes.
- traffic spikes after store release or screenshots.
- cache miss increases.

Low value:

- exact unique-user counts.
- bot-filtered traffic as product usage.
- billing-level transfer estimates from analytics queries.

## Sources

- Cloudflare GraphQL Analytics API: https://developers.cloudflare.com/analytics/graphql-api/
- Cloudflare `httpRequestsAdaptiveGroups` migration guide: https://developers.cloudflare.com/analytics/graphql-api/migration-guides/graphql-api-analytics/
