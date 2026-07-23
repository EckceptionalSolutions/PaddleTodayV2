import { captureRiverSnapshots, getStoredRiverDetailSnapshot } from '../lib/river-snapshots';
import { getAllRiverScores } from '../lib/rivers';

async function main() {
  const results = await getAllRiverScores();
  const captured = await captureRiverSnapshots({ results });

  if (process.env.RIVER_SNAPSHOT_CONTAINER_SAS_URL?.trim() && captured.storage !== 'blob') {
    throw new Error('RIVER_SNAPSHOT_CONTAINER_SAS_URL is configured, but snapshots were not written to Blob Storage.');
  }

  const probe = await getStoredRiverDetailSnapshot('rice-creek-peltier-to-long-lake');
  if (!probe || probe.generatedAt !== captured.generatedAt) {
    throw new Error('Snapshot write verification failed: the Rice Creek detail blob was not readable from the configured storage target.');
  }

  console.log(
    `[snapshots] captured ${captured.routeCount} routes and ${captured.groupCount} groups at ${captured.generatedAt} using ${captured.storage} storage; readback verified`
  );
}

main().catch((error) => {
  console.error('[snapshots] refresh failed', error);
  process.exitCode = 1;
});
