import { evaluateRiverAlerts } from '../lib/alert-evaluator';

async function main() {
  const stats = await evaluateRiverAlerts();
  console.log(
    `[alerts] evaluated ${stats.evaluated}, triggered ${stats.triggered}, reset ${stats.resetToBelow}, skipped ${stats.skipped}, emails ${stats.emailsSent}, failures ${stats.emailFailures}`
  );
}

main().catch((error) => {
  console.error('[alerts] evaluation failed', error);
  process.exitCode = 1;
});
