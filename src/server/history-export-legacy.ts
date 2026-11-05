import { exportHistoryBucketsToLegacy } from '../lib/history';

exportHistoryBucketsToLegacy().then(result => {
  console.log('[history] legacy export verified', JSON.stringify(result));
}).catch(error => {
  console.error('[history] legacy export failed:', error instanceof Error ? error.message : 'Unknown storage failure');
  process.exitCode = 1;
});
