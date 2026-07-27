import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { reconcileRiverAlertPushReceipts } from './alert-push-receipts';
import {
  appendRiverAlertEvent,
  createRiverThresholdAlert,
  getRiverAlertById,
  listRiverAlertEvents,
} from './alerts';

let alertsDir = '';
let previousAlertsDir: string | undefined;
let previousContainerUrl: string | undefined;

beforeEach(async () => {
  alertsDir = await mkdtemp(join(tmpdir(), 'paddletoday-alert-receipts-'));
  previousAlertsDir = process.env.RIVER_ALERTS_DIR;
  previousContainerUrl = process.env.RIVER_ALERTS_CONTAINER_SAS_URL;
  process.env.RIVER_ALERTS_DIR = alertsDir;
  delete process.env.RIVER_ALERTS_CONTAINER_SAS_URL;
});

afterEach(async () => {
  if (previousAlertsDir === undefined) delete process.env.RIVER_ALERTS_DIR;
  else process.env.RIVER_ALERTS_DIR = previousAlertsDir;
  if (previousContainerUrl === undefined) delete process.env.RIVER_ALERTS_CONTAINER_SAS_URL;
  else process.env.RIVER_ALERTS_CONTAINER_SAS_URL = previousContainerUrl;
  await rm(alertsDir, { recursive: true, force: true });
});

describe.sequential('push receipt reconciliation', () => {
  it('marks a successful Expo receipt delivered', async () => {
    const alert = await createPushAlert();
    await appendAcceptedPushEvent(alert.alert.id, 'ticket_ok');
    const fetchImpl = vi.fn(async () =>
      Response.json({ data: { ticket_ok: { status: 'ok' } } })
    ) as typeof fetch;

    const stats = await reconcileRiverAlertPushReceipts({
      now: new Date('2026-07-26T12:30:00.000Z'),
      fetchImpl,
    });

    expect(stats).toMatchObject({ checked: 1, delivered: 1, failed: 0 });
    expect((await listRiverAlertEvents())[0]).toMatchObject({
      deliveryStatus: 'delivered',
      deliveryError: null,
    });
  });

  it('records provider errors and deactivates an unregistered device alert', async () => {
    const alert = await createPushAlert();
    await appendAcceptedPushEvent(alert.alert.id, 'ticket_gone');
    const fetchImpl = vi.fn(async () =>
      Response.json({
        data: {
          ticket_gone: {
            status: 'error',
            message: 'The device is no longer registered.',
            details: { error: 'DeviceNotRegistered' },
          },
        },
      })
    ) as typeof fetch;

    const stats = await reconcileRiverAlertPushReceipts({
      now: new Date('2026-07-26T12:30:00.000Z'),
      fetchImpl,
    });

    expect(stats).toMatchObject({ checked: 1, failed: 1, alertsDeactivated: 1 });
    expect((await listRiverAlertEvents())[0]).toMatchObject({
      deliveryStatus: 'failed',
      deliveryError: 'DeviceNotRegistered',
    });
    expect((await getRiverAlertById(alert.alert.id))?.isActive).toBe(false);
  });

  it('expires tickets after the provider receipt window without calling Expo', async () => {
    const alert = await createPushAlert();
    await appendAcceptedPushEvent(alert.alert.id, 'ticket_expired', '2026-07-25T10:00:00.000Z');
    const fetchImpl = vi.fn() as unknown as typeof fetch;

    const stats = await reconcileRiverAlertPushReceipts({
      now: new Date('2026-07-26T12:30:00.000Z'),
      fetchImpl,
    });

    expect(stats).toMatchObject({ failed: 1, expired: 1 });
    expect(fetchImpl).not.toHaveBeenCalled();
    expect((await listRiverAlertEvents())[0]).toMatchObject({
      deliveryStatus: 'failed',
      deliveryError: 'receipt_expired',
    });
  });
});

async function createPushAlert() {
  return createRiverThresholdAlert({
    expoPushToken: 'ExponentPushToken[test-token]',
    deliveryMethod: 'push',
    riverSlug: 'rice-creek-peltier-to-long-lake',
    riverName: 'Rice Creek',
    riverReach: 'Peltier Lake to Long Lake',
    threshold: 'good',
    initialState: 'below_threshold',
    now: '2026-07-26T10:00:00.000Z',
  });
}

async function appendAcceptedPushEvent(
  alertId: string,
  deliveryId: string,
  sentAt = '2026-07-26T12:00:00.000Z'
) {
  await appendRiverAlertEvent({
    alertId,
    riverSlug: 'rice-creek-peltier-to-long-lake',
    threshold: 'good',
    triggeredScore: 75,
    triggeredLabel: 'Good',
    message: 'Rice Creek is paddleable today',
    sentAt,
    deliveryMethod: 'push',
    provider: 'expo',
    deliveryId,
    deliveryKey: `key_${deliveryId}`,
    deliveryStatus: 'accepted',
  });
}
