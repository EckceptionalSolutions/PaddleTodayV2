import { describe, expect, it } from 'vitest';
import { riverAlertDeliveryKey } from './alert-delivery';

describe('riverAlertDeliveryKey', () => {
  it('is a stable UUID for the same alert crossing snapshot', () => {
    const alert = { id: 'alert_123', threshold: 'good' as const };
    const snapshot = { generatedAt: '2026-07-26T10:00:00.000Z' };

    const first = riverAlertDeliveryKey(alert, snapshot);
    const second = riverAlertDeliveryKey(alert, snapshot);

    expect(first).toBe(second);
    expect(first).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('changes when the snapshot or threshold changes', () => {
    const first = riverAlertDeliveryKey(
      { id: 'alert_123', threshold: 'good' },
      { generatedAt: '2026-07-26T10:00:00.000Z' }
    );
    const later = riverAlertDeliveryKey(
      { id: 'alert_123', threshold: 'good' },
      { generatedAt: '2026-07-26T10:30:00.000Z' }
    );
    const stronger = riverAlertDeliveryKey(
      { id: 'alert_123', threshold: 'strong' },
      { generatedAt: '2026-07-26T10:00:00.000Z' }
    );

    expect(later).not.toBe(first);
    expect(stronger).not.toBe(first);
  });
});
