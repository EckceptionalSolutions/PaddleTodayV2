import { createHash } from 'node:crypto';
import type { RiverThresholdAlert } from './alerts';
import type { RiverDetailSnapshot } from './river-snapshots';

export function riverAlertDeliveryKey(
  alert: Pick<RiverThresholdAlert, 'id' | 'threshold'>,
  snapshot: Pick<RiverDetailSnapshot, 'generatedAt'>
) {
  const digest = createHash('sha256')
    .update(`${alert.id}|${alert.threshold}|${snapshot.generatedAt}`)
    .digest('hex')
    .slice(0, 32)
    .split('');

  digest[12] = '5';
  digest[16] = ((Number.parseInt(digest[16] ?? '0', 16) & 0x3) | 0x8).toString(16);
  const value = digest.join('');
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
}
