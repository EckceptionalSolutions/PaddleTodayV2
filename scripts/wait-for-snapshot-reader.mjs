import { waitForSnapshotReader } from './lib/snapshot-reader-readiness.mjs';

try {
  if (process.env.SNAPSHOT_DETAIL_LAYOUT === 'legacy') {
    console.log('Legacy detail writes selected; batch reader readiness is not required.');
  } else if (process.env.SNAPSHOT_DETAIL_LAYOUT === 'detail-buckets-v1') {
    await waitForSnapshotReader({ baseUrl: process.env.SNAPSHOT_API_ORIGIN,
      onAttempt: result => console.log(JSON.stringify(result)) });
  } else {
    throw new Error('SNAPSHOT_DETAIL_LAYOUT must be legacy or detail-buckets-v1.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
