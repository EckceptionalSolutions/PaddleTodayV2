import { captureRiverSnapshots } from '../lib/river-snapshots';
import { getAllRiverScores } from '../lib/rivers';

async function main() {
  const results = await getAllRiverScores();
  const captured = await captureRiverSnapshots({ results });
  console.log(
    `[snapshots] captured ${captured.routeCount} routes and ${captured.groupCount} groups at ${captured.generatedAt} using ${captured.storage} storage`
  );
}

main().catch((error) => {
  console.error('[snapshots] refresh failed', error);
  process.exitCode = 1;
});
