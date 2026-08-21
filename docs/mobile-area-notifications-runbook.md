# Mobile Area Notifications Runbook

Area notifications are separately opted-in nearby Today and Weekend push notifications. They use the selected planning location and travel range; they do not use background location.

## Configuration

- `AREA_NOTIFICATIONS_ENABLED=false` by default in production.
- Set `AREA_NOTIFICATIONS_ENABLED=true` only after the mobile build containing the area-alert UI is available to testers or users.
- Set `AREA_NOTIFICATIONS_DRY_RUN=true` to evaluate subscriptions and log would-send payloads without contacting Expo. Dry-run events use the `log` provider and are not sent to receipt reconciliation.
- Keep the existing `RIVER_ALERTS_CONTAINER_SAS_URL`, `RIVER_ALERTS_BLOB_PREFIX`, and `ALERTS_SIGNING_SECRET` configured. Area subscriptions and events are stored under `area-notifications/` in the alert container.

## Evaluation

```powershell
npm run area-notifications:evaluate
```

The evaluator uses fresh stored Today and Weekend snapshots, filters by the subscription's travel range, and applies live-data, confidence, and readiness gates. Today notifications require a transition from no eligible routes to one or more eligible routes. Weekend notifications send once per local weekend window.

## Release sequence

1. Deploy the backend with `AREA_NOTIFICATIONS_ENABLED=false`.
2. Run the evaluator with `AREA_NOTIFICATIONS_DRY_RUN=true` and review logs.
3. Test a preview/TestFlight/internal build through enrollment, permission, location changes, cold-start taps, and receipt reconciliation.
4. Enable the feature flag after the mobile build is available.
5. Monitor delivery failures, invalid tokens, notification opens, route opens, and disable events.

## Rollback

Set `AREA_NOTIFICATIONS_ENABLED=false` in the workflow/API environment. Existing route-specific alerts continue to operate independently.
