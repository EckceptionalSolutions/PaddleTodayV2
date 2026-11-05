import { waitForSnapshotReader } from './lib/snapshot-reader-readiness.mjs';
try {
  const layout = process.env.RIVER_HISTORY_STORAGE_LAYOUT || 'auto';
  if (!['auto', 'legacy', 'history-buckets-v1'].includes(layout)) throw new Error('Invalid RIVER_HISTORY_STORAGE_LAYOUT.');
  if (layout !== 'legacy') {
    await waitForSnapshotReader({ baseUrl: process.env.API_ORIGIN,
      capability: 'historyStorageLayouts', requiredFormat: 'history-buckets-v1',
      onAttempt: result => console.log(JSON.stringify({ capability: 'historyStorageLayouts', ...result })) });
  }
  if (process.env.RIVER_HISTORY_DAILY_SUMMARY_MODE === 'legacy') {
    console.log('Legacy daily history writes selected.');
  } else if (process.env.RIVER_HISTORY_DAILY_SUMMARY_MODE === 'daily-finalize-v1') {
    await waitForSnapshotReader({ baseUrl: process.env.API_ORIGIN,
      capability: 'historySummaryModes', requiredFormat: 'daily-finalize-v1',
      onAttempt: result => console.log(JSON.stringify(result)) });
  } else throw new Error('Invalid RIVER_HISTORY_DAILY_SUMMARY_MODE.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
