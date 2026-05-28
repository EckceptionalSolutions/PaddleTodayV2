# River Alerts

Paddle Today supports simple route alerts for threshold crossings:

- Notify me when this route becomes `Good`
- Notify me when this route becomes `Strong`

Paddle Today can send email alerts and phone push alerts for named route pages. It does not send on every score change.
Every alert email includes a signed unsubscribe link, so users can turn off an email alert without creating an account.

## How it works

1. A user submits an email or phone alert from a river detail page.
2. The alert is stored in durable JSON-backed records using the same local/blob storage pattern as snapshots.
3. The scheduled `Paddle Today River Alerts` workflow runs every 30 minutes at `:05` and `:35`.
4. The evaluator reads the latest stored river detail snapshot for each active alert.
5. An alert only sends when the route crosses from `below_threshold` to `at_or_above_threshold`.

## Trigger rules

- `good` alerts fire when the route rating is `Good` or `Strong`
- `strong` alerts fire only when the route rating is `Strong`
- alerts only evaluate when:
  - the snapshot is fresh enough
  - live data is `live`
  - confidence is `Medium` or `High`

Alerts do not resend while the route stays above threshold. They can send again only after:

1. the route drops back below threshold
2. then later crosses back above threshold

An extra 12-hour cooldown is also applied as a guardrail.

## Storage

App/API runtime env:

- `RIVER_ALERTS_CONTAINER_SAS_URL`
- `RIVER_ALERTS_BLOB_PREFIX=river-alerts`
- `ALERTS_SIGNING_SECRET`

Optional local storage:

- `RIVER_ALERTS_DIR`

Stored files:

- `river-alerts/alerts.json`
- `river-alerts/events.json`

## Delivery

The scheduled workflow sends email with Azure Communication Services Email and push notifications through Expo's push API.

GitHub secrets and variables:

- secret: `RIVER_SNAPSHOT_CONTAINER_SAS_URL`
- secret: `RIVER_ALERTS_CONTAINER_SAS_URL`
- secret: `ALERTS_SIGNING_SECRET`
- secret: `ACS_EMAIL_CONNECTION_STRING`
- variable: `RIVER_SNAPSHOT_BLOB_PREFIX`
- variable: `RIVER_ALERTS_BLOB_PREFIX`
- variable: `ALERTS_FROM_EMAIL` (optional, defaults to `river-alerts@paddletoday.com`)
- variable: `ALERTS_REPLY_TO_EMAIL` (optional, defaults to `river-alerts@paddletoday.com`)
- variable: `SITE_URL` (optional, defaults to `https://paddletoday.com`)

App/API runtime env if you also want runtime delivery parity:

- `ACS_EMAIL_CONNECTION_STRING`
- `ALERTS_FROM_EMAIL=river-alerts@paddletoday.com`
- `ALERTS_REPLY_TO_EMAIL=river-alerts@paddletoday.com`

`ALERTS_FROM_EMAIL` must use a sender username configured on the Azure Communication Services Email domain. The current Paddle Today email domain has `river-alerts@paddletoday.com` configured for alert delivery.

## Local testing

Create a route alert locally:

```powershell
Invoke-WebRequest `
  -Method Post `
  -Uri http://127.0.0.1:4322/api/alerts `
  -Headers @{ "accept" = "application/json"; "content-type" = "application/json" } `
  -Body '{"email":"you@example.com","riverSlug":"rice-creek-peltier-to-long-lake","threshold":"good"}'
```

Run the evaluator locally:

```powershell
npm run alerts:evaluate
```

Without `ACS_EMAIL_CONNECTION_STRING`, email delivery falls back to logging so local testing does not require live email credentials.

Send a mock phone push to an Expo push token:

```powershell
npm run alert:mock-push -- --token="ExponentPushToken[...]" --slug=rice-creek-peltier-to-long-lake --threshold=good
```

Add `--dry-run=true` to validate the command without sending through Expo.

Or create a phone alert from an installed iOS preview/TestFlight build, point `RIVER_ALERTS_CONTAINER_SAS_URL` at the same alert store, and send to the latest matching active push alert:

```powershell
npm run alert:mock-push -- --slug=rice-creek-peltier-to-long-lake --threshold=good
```

For iPhone testing, use a real EAS preview or TestFlight build. Expo Go is not enough for this push-notification flow.

## Unsubscribe flow

- emails link to `/alerts/unsubscribe/`
- the page posts to `POST /api/alerts/unsubscribe`
- the alert deactivates only when the signed token matches the stored alert
- deactivation is idempotent, so a second click reports that the alert is already off
