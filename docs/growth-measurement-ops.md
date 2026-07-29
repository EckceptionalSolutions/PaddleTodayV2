# Growth Measurement Operations

Use this runbook to answer where Paddle Today traffic comes from, which pages create organic entry points, and which visitors convert into route requests, saves, alerts, shares, app downloads, or mobile installs. The automated report is the primary weekly review surface; provider dashboards remain useful for investigation.

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

### Umami Cloud Web Analytics

Umami Cloud tracking is enabled with the public PaddleToday website ID:

```html
<script
  defer
  src="https://cloud.umami.is/script.js"
  data-website-id="ce97ebc3-44ba-4c12-898e-666c904bc6b6"
></script>
```

`src/layouts/BaseLayout.astro` uses that public ID by default. `PUBLIC_UMAMI_WEBSITE_ID` can override it for another environment, and `PUBLIC_UMAMI_SCRIPT_SRC` can override the script URL for a custom or self-hosted installation:

```sh
PUBLIC_UMAMI_WEBSITE_ID=another-website-id
PUBLIC_UMAMI_SCRIPT_SRC=https://cloud.umami.is/script.js
```

An Umami API key is not available on the current plan. Tracking and the Umami dashboard still work, but the automated weekly report marks Umami as a manual-review source. Do not upgrade solely for reporting: Search Console supplies automated web acquisition quality, Cloudflare supplies validated traffic volume, and Firebase/GA4 supplies automated native product behavior.

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

Web uses Umami Cloud for page and conversion events. Native mobile uses Firebase Analytics and Crashlytics through `apps/mobile/src/lib/observability.ts`.

Firebase is enabled only for preview and production native builds when the native config files exist:

- `apps/mobile/firebase/GoogleService-Info.plist`
- `apps/mobile/firebase/google-services.json`

Use Firebase for app opens, route opens, saves, directions, reports, alerts, support links, and crash-free sessions. Use Umami for web acquisition, landing pages, guide clicks, route-detail entry points, and web conversions. Use Cloudflare to cross-check total edge traffic and API health.

The weekly report treats Firebase/GA4 `first_open` as the install proxy. It is available from the same Analytics Data API as the other mobile metrics and avoids separate App Store Connect and Google Play reporting credentials. It measures first app opens observed by analytics, not store-page downloads.

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

| Event                     | Trigger                                                  | Required properties                                          | Optional properties                                            | Expected page context            |
| ------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------------------------------- |
| `Route view`              | Route detail script initializes                          | `path`, `route`, `river`, `state`, `region`                  | none                                                           | Route detail page                |
| `Share route`             | X, Facebook, or copy route action click                  | `path`, `route`, `river`, `state`, `region`, `label`         | `href`                                                         | Route detail page                |
| `Toggle favorite`         | Save/unsave route button succeeds locally                | `path`, `route`, `river`, `state`, `region`, `label`         | none                                                           | Route cards and route detail     |
| `Submit route alert`      | Alert API accepts the alert request                      | `path`, `route`, `river`, `state`, `region`, `threshold`     | `label` for created/duplicate                                  | Route detail page                |
| `Submit route request`    | Route request API stores the request                     | `path`, `state`, `label`                                     | none                                                           | Request route page               |
| `Submit condition report` | Route contribution API stores the report                 | `path`, `route`, `river`, `state`, `region`, `label`         | none                                                           | Route detail contribution panel  |
| `Submit route photos`     | Route contribution API stores photo submission           | `path`, `route`, `river`, `state`, `region`, `label`         | `photo_count`                                                  | Route detail contribution panel  |
| `View app download`       | Mobile web app prompt becomes visible                    | `path`, `platform`                                           | none                                                           | Any non-excluded mobile web page |
| `Open app download`       | App prompt download link click                           | `path`, `platform`, `label`, `href`                          | none                                                           | Any non-excluded mobile web page |
| `Dismiss app download`    | App prompt dismiss button click                          | `path`, `platform`                                           | none                                                           | Any non-excluded mobile web page |
| `Guide-to-route click`    | Guide route link click                                   | `path`, `guide`, `route`, `river`, `source_page`             | `state`, `region`, `href`                                      | Guide pages                      |
| `Open route directions`   | Google or Apple directions link click                    | `path`, `route`, `river`, `state`, `region`, `label`, `href` | none                                                           | Route detail access plan         |
| `Open route planner`      | Discovery card opens a route with a selected access pair | `path`, `route`, `river`, `state`, `region`, `label`, `href` | none                                                           | Home or Explore                  |
| `Route planner view`      | Access planner initializes on a route detail page        | `path`, `route`, `river`, `state`, `region`                  | `put_in_id`, `take_out_id`, `segment_distance_miles`, `source` | Route detail access plan         |
| `Select route segment`    | Paddler changes the put-in or take-out                   | `path`, `route`, `river`, `state`, `region`                  | `put_in_id`, `take_out_id`, `segment_distance_miles`, `source` | Route detail access planner      |
| `river_hub_viewed`        | A successfully loaded river hub becomes usable           | `path`, `river`, `state`, `region`                           | `river_id`, `trip_option_count`                                | Web/mobile river hub             |
| `corridor_trip_selected`  | Paddler chooses a trip option inside a corridor          | `path`, `river`, `state`, `region`, `label`                  | `corridor_id`, `trip_option_count`, `source`                   | Web/mobile river hub             |
| `Open site search`        | Header search button click                               | `path`                                                       | `source_page`                                                  | Any page                         |
| `Submit location search`  | Homepage location search form submit                     | `path`                                                       | `source_page`                                                  | Homepage                         |
| `Use current location`    | Current-location button click                            | `path`                                                       | `source_page`                                                  | Homepage                         |

Non-conversion helper events may exist for product diagnostics, such as `Open route alert`, `Open route request`, `Open condition report`, `Open route map`, `Open related route`, and `Open route update`.

## Dashboard And Reporting Spec

### Automated weekly product report

Run locally:

```sh
npm run metrics:weekly
npm run metrics:weekly -- --output-dir reports/weekly
```

The command emits Markdown by default. With an output directory it also writes a machine-readable JSON report. Every source is isolated: missing Umami or Google setup is reported as `pending`, and a provider outage is reported as `error`, while the remaining sections still render.

`.github/workflows/weekly-product-report.yml` runs Wednesday morning and publishes both files as a 90-day GitHub Actions artifact. The Markdown is also placed in the workflow run summary. Wednesday is intentional: it reports the latest completed Sunday-Saturday week after Search Console's normal processing delay.

Repository configuration:

| Type     | Name                               | Purpose                                                                    |
| -------- | ---------------------------------- | -------------------------------------------------------------------------- |
| Variable | `GOOGLE_ANALYTICS_PROPERTY_ID`     | Optional override; Firebase-linked GA4 property `538058487` is the default |
| Variable | `SEARCH_CONSOLE_SITE_URL`          | Optional override; defaults to `sc-domain:paddletoday.com`                 |
| Secret   | `UMAMI_API_KEY`                    | Optional future enhancement if API access becomes available                |
| Variable | `UMAMI_WEBSITE_ID`                 | Optional override; the current public website ID is the default            |
| Secret   | `CLOUDFLARE_API_TOKEN`             | Existing Cloudflare read token                                             |
| Secret   | `CLOUDFLARE_ZONE_ID`               | Existing Cloudflare zone ID                                                |
| Secret   | `AZURE_CREDENTIALS`                | Optional Azure service principal JSON for cost data                        |
| Secret   | `RIVER_ALERTS_CONTAINER_SAS_URL`   | Existing read-capable alerts SAS URL                                       |
| Secret   | `ROUTE_REQUESTS_CONTAINER_SAS_URL` | Existing read-capable route-requests SAS URL                               |

Google authentication is keyless:

- Service account: `paddletoday-metrics@paddletoday-9933a.iam.gserviceaccount.com`
- Workload identity provider: `projects/378411608143/locations/global/workloadIdentityPools/github-actions/providers/github`
- Trust condition: only `EckceptionalSolutions/PaddleTodayV2`
- GitHub workflow permission: `id-token: write`
- OAuth scopes: read-only Google Analytics and Search Console access

The Analytics Data, Search Console, IAM Credentials, and Security Token Service APIs are enabled. The service account must remain a Viewer on GA4 property `538058487` and a user on the `sc-domain:paddletoday.com` Search Console property. No downloadable JSON key or GitHub secret is required.

The report covers acquisition quality, Search Console queries/pages, GA4 first opens, active users, engagement, channel quality, river-hub conversion, week-1 cohort retention, conversion events, Cloudflare volume, Azure cost, alerts, and route requests.

### Corridor pilot report

The automated weekly report is the default funnel view. For a state-level pilot breakdown, export `river_hub_viewed`, `corridor_trip_selected`, and route-detail opens (`Route view` / `route_opened`) from Umami/Firebase as JSON, then run `npm run routes:report:corridor-funnel -- path/to/export.json`. The report separates Minnesota, Wisconsin, and Iowa by state and calculates both trip-option selections and route-detail opens divided by river-hub views. Keep session or user identifiers in the export so the report can deduplicate the funnel at the user/session level.

Do not build a dashboard unless the product adds an internal reporting surface. For now, report from Umami, Search Console, Cloudflare, Firebase, and API/server health.

### Acquisition

- Organic search from Search Console and Umami source/medium.
- Referral, direct, and social visits from Umami.
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
- `river_hub_viewed`.
- `corridor_trip_selected`.
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

Every Wednesday, review the prior complete Sunday-Saturday report:

1. Search Console: top queries, top pages, new indexed route/guide pages, coverage issues.
2. Umami: acquisition mix, top landing pages, route entry pages, conversion counts.
3. Guides: guide page visits, `Guide-to-route click`, downstream route conversions.
4. Routes: top organic route landing pages, `Route view`, alerts, saves, shares, reports.
5. App download: prompt views and opens by platform; Firebase `first_open` is the install proxy.
6. Firebase: mobile first opens, active users, acquisition channels, engagement, week-1 retention, route opens, saves, alerts, and reports.
7. Cloudflare/API: request volume, 4xx/5xx, health checks, suspicious spikes.

## External Setup Status

- Google Search Console domain ownership is verified for `paddletoday.com`.
- The reporting service account has Viewer access to GA4 property `538058487` and Restricted access to `sc-domain:paddletoday.com`.
- Keyless GitHub Actions authentication is configured through the repository-scoped Workload Identity provider listed above.
- Submit `https://paddletoday.com/sitemap-index.xml` if it is not already present in Search Console.
- Review Umami manually until API access is available on the chosen plan.
- Set `PUBLIC_UMAMI_SCRIPT_SRC` only if a custom/self-hosted script is used.
- Confirm Cloudflare API token and zone ID for operational summaries.
- Confirm Firebase events are arriving for production mobile builds after store release.
