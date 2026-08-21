import { evaluateAreaNotifications } from '../lib/area-notification-evaluator';

evaluateAreaNotifications()
  .then((stats) => {
    console.log(`[area-notifications] evaluated ${stats.evaluated}, sent ${stats.sent}, failures ${stats.failures}, skipped ${stats.skipped}`);
  })
  .catch((error) => {
    console.error('[area-notifications] evaluation failed', error);
    process.exitCode = 1;
  });
