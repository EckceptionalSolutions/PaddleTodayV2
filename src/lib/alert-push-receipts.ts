import {
  getRiverAlertById,
  listRiverAlertEvents,
  updateRiverAlert,
  updateRiverAlertEvent,
} from './alerts';

const EXPO_PUSH_RECEIPTS_URL = 'https://exp.host/--/api/v2/push/getReceipts';
const DEFAULT_RECEIPT_MIN_AGE_MS = 15 * 60 * 1000;
const DEFAULT_RECEIPT_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_RECEIPTS_PER_REQUEST = 1_000;

interface ExpoPushReceipt {
  status?: 'ok' | 'error';
  message?: string;
  details?: {
    error?: string;
  };
}

interface ExpoPushReceiptsResponse {
  data?: Record<string, ExpoPushReceipt>;
  errors?: Array<{ message?: string }>;
}

export async function reconcileRiverAlertPushReceipts(args: {
  now?: Date;
  fetchImpl?: typeof fetch;
  minAgeMs?: number;
  maxAgeMs?: number;
} = {}) {
  const now = args.now ?? new Date();
  const fetchImpl = args.fetchImpl ?? fetch;
  const minAgeMs = args.minAgeMs ?? DEFAULT_RECEIPT_MIN_AGE_MS;
  const maxAgeMs = args.maxAgeMs ?? DEFAULT_RECEIPT_MAX_AGE_MS;
  const events = await listRiverAlertEvents();
  const accepted = events.filter(
    (event) => event.provider === 'expo' && event.deliveryStatus === 'accepted' && event.deliveryId
  );
  const stats = {
    pending: accepted.length,
    checked: 0,
    delivered: 0,
    failed: 0,
    missing: 0,
    expired: 0,
    alertsDeactivated: 0,
  };
  const ready = [];

  for (const event of accepted) {
    const sentAt = Date.parse(event.sentAt);
    const ageMs = now.getTime() - sentAt;
    if (!Number.isFinite(sentAt) || ageMs > maxAgeMs) {
      await markEventFailed(event.id, now, 'receipt_expired');
      stats.failed += 1;
      stats.expired += 1;
      continue;
    }
    if (ageMs >= minAgeMs) {
      ready.push(event);
    }
  }

  for (let offset = 0; offset < ready.length; offset += MAX_RECEIPTS_PER_REQUEST) {
    const batch = ready.slice(offset, offset + MAX_RECEIPTS_PER_REQUEST);
    const ids = batch.map((event) => event.deliveryId).filter((id): id is string => Boolean(id));
    const response = await fetchImpl(EXPO_PUSH_RECEIPTS_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });
    const payload = (await response.json().catch(() => null)) as ExpoPushReceiptsResponse | null;
    if (!response.ok || !payload?.data) {
      const providerMessage = payload?.errors?.[0]?.message;
      throw new Error(providerMessage || `Expo push receipt lookup failed: HTTP ${response.status}`);
    }

    for (const event of batch) {
      const receipt = event.deliveryId ? payload.data[event.deliveryId] : undefined;
      if (!receipt) {
        stats.missing += 1;
        continue;
      }

      stats.checked += 1;
      if (receipt.status === 'ok') {
        await updateRiverAlertEvent(event.id, {
          deliveryStatus: 'delivered',
          deliveryUpdatedAt: now.toISOString(),
          deliveryError: null,
        });
        stats.delivered += 1;
        continue;
      }

      const errorCode = cleanError(receipt.details?.error || receipt.message || 'push_delivery_failed');
      await markEventFailed(event.id, now, errorCode);
      stats.failed += 1;

      if (receipt.details?.error === 'DeviceNotRegistered') {
        const alert = await getRiverAlertById(event.alertId);
        if (alert?.isActive) {
          await updateRiverAlert(alert.id, {
            isActive: false,
            updatedAt: now.toISOString(),
          });
          stats.alertsDeactivated += 1;
        }
      }
    }
  }

  return stats;
}

async function markEventFailed(eventId: string, now: Date, error: string) {
  await updateRiverAlertEvent(eventId, {
    deliveryStatus: 'failed',
    deliveryUpdatedAt: now.toISOString(),
    deliveryError: cleanError(error),
  });
}

function cleanError(value: string) {
  return String(value || 'push_delivery_failed').trim().slice(0, 500);
}
