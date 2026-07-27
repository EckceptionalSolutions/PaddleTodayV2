import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendRiverAlertPush } from './alert-push';
import type { RiverThresholdAlert } from './alerts';
import type { RiverDetailSnapshot } from './river-snapshots';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('sendRiverAlertPush', () => {
  it('returns an acceptance ticket and includes a delivery key for correlation', async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({ data: { status: 'ok', id: 'ticket_123' } })
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await sendRiverAlertPush({ alert: buildAlert(), snapshot: buildSnapshot() });

    expect(result).toMatchObject({
      provider: 'expo',
      id: 'ticket_123',
      deliveryStatus: 'accepted',
    });
    const request = fetchMock.mock.calls[0]?.[1];
    const payload = JSON.parse(String(request?.body));
    expect(payload.data.deliveryKey).toBe(result.deliveryKey);
    expect(payload.data.alertId).toBe('alert_123');
  });

  it('rejects an ambiguous success response without a receipt id', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ data: { status: 'ok' } })));

    await expect(
      sendRiverAlertPush({ alert: buildAlert(), snapshot: buildSnapshot() })
    ).rejects.toThrow('missing acceptance ticket id');
  });
});

function buildAlert() {
  return {
    id: 'alert_123',
    expoPushToken: 'ExponentPushToken[test-token]',
    threshold: 'good',
    riverSlug: 'rice-creek-peltier-to-long-lake',
  } as RiverThresholdAlert;
}

function buildSnapshot() {
  return {
    generatedAt: '2026-07-26T12:00:00.000Z',
    result: {
      score: 75,
      rating: 'Good',
      gaugeBandLabel: 'Good flow',
      river: { name: 'Rice Creek' },
    },
  } as RiverDetailSnapshot;
}
