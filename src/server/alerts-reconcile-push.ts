import { reconcileRiverAlertPushReceipts } from '../lib/alert-push-receipts';

async function main() {
  const stats = await reconcileRiverAlertPushReceipts();
  console.log(
    `[alerts] push receipts pending ${stats.pending}, checked ${stats.checked}, delivered ${stats.delivered}, failed ${stats.failed}, missing ${stats.missing}, expired ${stats.expired}, deactivated ${stats.alertsDeactivated}`
  );
}

main().catch((error) => {
  console.error('[alerts] push receipt reconciliation failed', error);
  process.exitCode = 1;
});
