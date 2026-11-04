import { captureHistorySnapshotForResults } from '../lib/history';
import { getAllRiverScores } from '../lib/rivers';
import { flushWeatherFailureLogs } from '../lib/weather-error-logging';

async function main() {
  const results = await getAllRiverScores();
  const captured = await captureHistorySnapshotForResults({ results });
  console.log(
    `[history] captured ${captured.routeCount} routes for ${captured.date} ${captured.hour} using ${captured.storage} storage`
  );
}

main().finally(flushWeatherFailureLogs).catch((error) => {
  console.error('[history] snapshot failed', error);
  process.exitCode = 1;
});
