import { reconcileRiverAlertPushReceipts } from '../lib/alert-push-receipts';
import { reconcileAreaNotificationPushReceipts } from '../lib/area-notification-push-receipts';

async function main() {
  const [stats, areaStats] = await Promise.all([
    reconcileRiverAlertPushReceipts(),
    reconcileAreaNotificationPushReceipts(),
  ]);
  console.log(
    `[alerts] push receipts pending ${stats.pending}, checked ${stats.checked}, delivered ${stats.delivered}, failed ${stats.failed}, missing ${stats.missing}, expired ${stats.expired}, deactivated ${stats.alertsDeactivated}`
  );
  console.log(
    `[area-notifications] push receipts pending ${areaStats.pending}, checked ${areaStats.checked}, delivered ${areaStats.delivered}, failed ${areaStats.failed}, missing ${areaStats.missing}, expired ${areaStats.expired}, deactivated ${areaStats.subscriptionsDeactivated}`
  );
}

main().catch((error) => {
  console.error('[alerts] push receipt reconciliation failed', error);
  process.exitCode = 1;
});
