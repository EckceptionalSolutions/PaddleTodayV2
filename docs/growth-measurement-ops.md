# Growth Measurement Operations

Use this runbook to answer where Paddle Today traffic comes from, which pages create organic entry points, and which visitors convert into route requests, saves, alerts, shares, app downloads, or mobile installs.

## Production Setup

### Google Search Console

1. Add a `Domain` property for `paddletoday.com` in Google Search Console.
2. Verify with the DNS TXT record at the DNS provider for `paddletoday.com`.
3. Confirm both `https://paddletoday.com/` and any `www` redirect resolve cleanly.
4. Review `Pages`, `Search results`, and `Links` weekly.

### Sitemap

Astro generates the sitemap through `@astrojs/sitemap` in `astro.config.mjs`.

Production sitemap:

```text
https://paddletoday.com/sitemap-index.xml
```

Submit that URL in Search Console after deployment. The sitemap excludes admin and alert-unsubscribe pages.

### Plausible Web Analytics

Plausible is loaded in `src/layouts/BaseLayout.astro` only when `PUBLIC_PLAUSIBLE_DOMAIN` is configured. Local development and builds without this value remain analytics no-op.

Required production env var:

```sh
PUBLIC_PLAUSIBLE_DOMAIN=paddletoday.com
```

Optional when using a custom or proxied Plausible script:

```sh
PUBLIC_PLAUSIBLE_SCRIPT_SRC=https://paddletoday.com/js/script.js
```

If `PUBLIC_PLAUSIBLE_SCRIPT_SRC` is absent, the app uses `https://plausible.io/js/script.js`.

### Cloudflare Traffic Summary

Cloudflare is edge and operational traffic measurement, not product analytics. Use it to validate request volume, visits, transfer, regional spikes, bot pressure, and API/error changes.

Required local env vars:

```sh
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ZONE_ID=...
```

Optional:

```sh
CLOUDFLARE_LOOKBACK_HOURS=24
```

Run:

```sh
npm run cloudflare:traffic
```

See `docs/cloudflare-traffic-ops.md` for details.

### Firebase And Mobile Analytics

Web uses Plausible for page and conversion events. Native mobile uses Firebase Analytics and Crashlytics through `apps/mobile/src/lib/observability.ts`.

Firebase is enabled only for preview and production native builds when the native config files exist:

- `apps/mobile/firebase/GoogleService-Info.plist`
- `apps/mobile/firebase/google-services.json`

Use Firebase for app opens, route opens, saves, directions, reports, alerts, support links, and crash-free sessions. Use Plausible for web acquisition, landing pages, guide clicks, route-detail entry points, and web conversions. Use Cloudflare to cross-check total edge traffic and API health.

## Web Event Registry

All web analytics properties must avoid private user-entered text, email addresses, exact location coordinates, photo filenames, photo metadata, report contents, and notes.

Common safe properties:

- `path`
- `route`
- `river`
- `state`
- `region`
- `source_page`
- `guide`
- `label`
- `platform`
- `href`

| Event | Trigger | Required properties | Optional properties | Expected page context |
| --- | --- | --- | --- | --- |
| `Route view` | Route detail script initializes | `path`, `route`, `river`, `state`, `region` | none | Route detail page |
| `Share route` | X, Facebook, or copy route action click | `path`, `route`, `river`, `state`, `region`, `label` | `href` | Route detail page |
| `Toggle favorite` | Save/unsave route button succeeds locally | `path`, `route`, `river`, `state`, `region`, `label` | none | Route cards and route detail |
| `Submit route alert` | Alert API accepts the alert request | `path`, `route`, `river`, `state`, `region`, `threshold` | `label` for created/duplicate | Route detail page |
| `Submit route request` | Route request API stores the request | `path`, `state`, `label` | none | Request route page |
| `Submit condition report` | Route contribution API stores the report | `path`, `route`, `river`, `state`, `region`, `label` | none | Route detail contribution panel |
| `Submit route photos` | Route contribution API stores photo submission | `path`, `route`, `river`, `state`, `region`, `label` | `photo_count` | Route detail contribution panel |
| `View app download` | Mobile web app prompt becomes visible | `path`, `platform` | none | Any non-excluded mobile web page |
| `Open app download` | App prompt download link click | `path`, `platform`, `label`, `href` | none | Any non-excluded mobile web page |
| `Dismiss app download` | App prompt dismiss button click | `path`, `platform` | none | Any non-excluded mobile web page |
| `Guide-to-route click` | Guide route link click | `path`, `guide`, `route`, `river`, `source_page` | `state`, `region`, `href` | Guide pages |
| `Open route directions` | Google or Apple directions link click | `path`, `route`, `river`, `state`, `region`, `label`, `href` | none | Route detail access plan |
| `Open route planner` | Discovery card opens a route with a selected access pair | `path`, `route`, `river`, `state`, `region`, `label`, `href` | none | Home or Explore |
| `Route planner view` | Access planner initializes on a route detail page | `path`, `route`, `river`, `state`, `region` | `put_in_id`, `take_out_id`, `segment_distance_miles`, `source` | Route detail access plan |
| `Select route segment` | Paddler changes the put-in or take-out | `path`, `route`, `river`, `state`, `region` | `put_in_id`, `take_out_id`, `segment_distance_miles`, `source` | Route detail access planner |
| `Open site search` | Header search button click | `path` | `source_page` | Any page |
| `Submit location search` | Homepage location search form submit | `path` | `source_page` | Homepage |
| `Use current location` | Current-location button click | `path` | `source_page` | Homepage |

Non-conversion helper events may exist for product diagnostics, such as `Open route alert`, `Open route request`, `Open condition report`, `Open route map`, `Open related route`, and `Open route update`.

## Dashboard And Reporting Spec

Do not build a dashboard unless the product adds an internal reporting surface. For now, report from Plausible, Search Console, Cloudflare, Firebase, and API/server health.

### Acquisition

- Organic search from Search Console and Plausible source/medium.
- Referral, direct, and social visits from Plausible.
- Query and page impressions/clicks from Search Console.

### Landing Pages

- Homepage.
- Guide pages.
- Route detail pages.
- State pages.
- River hub pages.

### Engagement

- `Route view`.
- `Guide-to-route click`.
- `Open site search`.
- `Submit location search`.
- `Use current location`.

### Conversions

- `Submit route request`.
- `Toggle favorite` where `label=save`.
- `Submit route alert`.
- `Share route`.
- `Open app download`.
- `Submit condition report`.
- `Submit route photos`.

### Mobile

- App opens.
- Route opens.
- `explore_filter_applied`.
- `route_planner_opened_from_filter`.
- `route_planner_viewed`.
- `route_segment_selected`.
- Saves.
- Alerts.
- Directions.
- Route reports and photo contributions.
- Crash-free sessions/users.

### Operational

- Cloudflare requests, visits, transfer, and regional spikes.
- Cloudflare and server 4xx/5xx changes.
- `/health` and `/health/ready`.
- `/api/rivers/summary.json` and route-detail API health.
- Mobile API diagnostic failures.

### Planner funnel

For the segment-aware discovery release, review this sequence weekly:

`Open route planner` / `route_planner_opened_from_filter` -> `Route planner view` / `route_planner_viewed` -> `Select route segment` / `route_segment_selected` -> route save, directions, share, or alert.

Use the web and mobile event names separately, then compare the rate of planner opens that reach directions or saves. A planner view without a manual segment change is a valid success path when the discovery card already supplied a deep link.

## Weekly Cadence

Every Monday:

1. Search Console: top queries, top pages, new indexed route/guide pages, coverage issues.
2. Plausible: acquisition mix, top landing pages, route entry pages, conversion counts.
3. Guides: guide page visits, `Guide-to-route click`, downstream route conversions.
4. Routes: top organic route landing pages, `Route view`, alerts, saves, shares, reports.
5. App download: prompt views, opens by platform, and store-console install changes.
6. Firebase: mobile app opens, route opens, saves, alerts, reports, crash-free sessions.
7. Cloudflare/API: request volume, 4xx/5xx, health checks, suspicious spikes.

## External Setup Still Required

- Verify `paddletoday.com` in Google Search Console.
- Submit `https://paddletoday.com/sitemap-index.xml`.
- Configure Plausible site for `paddletoday.com`.
- Set `PUBLIC_PLAUSIBLE_DOMAIN` in production.
- Set `PUBLIC_PLAUSIBLE_SCRIPT_SRC` only if a custom/proxied script is used.
- Confirm Cloudflare API token and zone ID for operational summaries.
- Confirm Firebase events are arriving for production mobile builds after store release.
