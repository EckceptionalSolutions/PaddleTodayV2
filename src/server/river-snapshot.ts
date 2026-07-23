import { appendFileSync } from 'node:fs';
import { captureRiverSnapshots, getStoredRiverDetailSnapshot } from '../lib/river-snapshots';
import { getAllRiverScores } from '../lib/rivers';

async function main() {
  const scoreConcurrency = positiveInteger(process.env.RIVER_SCORE_CONCURRENCY, 24);
  const writeConcurrency = positiveInteger(process.env.RIVER_SNAPSHOT_WRITE_CONCURRENCY, 24);
  const results = await getAllRiverScores({ concurrency: scoreConcurrency });
  assertSnapshotQuality(results);
  const captured = await captureRiverSnapshots({ results, writeConcurrency });

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

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(
      process.env.GITHUB_OUTPUT,
      `generated_at=${captured.generatedAt}\nroute_count=${captured.routeCount}\n`,
    );
  }
}

function assertSnapshotQuality(results: Awaited<ReturnType<typeof getAllRiverScores>>) {
  if (results.length === 0) {
    throw new Error('Snapshot capture returned no river scores.');
  }

  const gaugeUsable = results.filter((result) => result.liveData.gauge.state !== 'unavailable').length;
  const weatherUsable = results.filter((result) => result.liveData.weather.state !== 'unavailable').length;
  const gaugeRatio = gaugeUsable / results.length;
  const weatherRatio = weatherUsable / results.length;

  console.log(
    `[snapshots] quality gauge=${gaugeUsable}/${results.length} (${percent(gaugeRatio)}) weather=${weatherUsable}/${results.length} (${percent(weatherRatio)})`,
  );

  if (gaugeRatio < 0.75 || weatherRatio < 0.85) {
    throw new Error(
      `Snapshot quality gate failed: usable gauge ${percent(gaugeRatio)}, usable weather ${percent(weatherRatio)}. Existing production snapshots were preserved.`,
    );
  }
}

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function percent(value: number) {
  return `${Math.round(value * 1000) / 10}%`;
}

main().catch((error) => {
  console.error('[snapshots] refresh failed', error);
  process.exitCode = 1;
});
