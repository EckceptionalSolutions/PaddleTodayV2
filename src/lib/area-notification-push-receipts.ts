import {
  getAreaNotificationSubscription,
  listAreaNotificationEvents,
  updateAreaNotificationEvent,
  updateAreaNotificationSubscription,
} from './area-notifications';

const EXPO_PUSH_RECEIPTS_URL = 'https://exp.host/--/api/v2/push/getReceipts';
const DEFAULT_RECEIPT_MIN_AGE_MS = 15 * 60 * 1000;
const DEFAULT_RECEIPT_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_RECEIPTS_PER_REQUEST = 1_000;

interface ExpoPushReceipt {
  status?: 'ok' | 'error';
  message?: string;
  details?: { error?: string };
}

export async function reconcileAreaNotificationPushReceipts(args: {
  now?: Date;
  fetchImpl?: typeof fetch;
  minAgeMs?: number;
  maxAgeMs?: number;
} = {}) {
  const now = args.now ?? new Date();
  const fetchImpl = args.fetchImpl ?? fetch;
  const minAgeMs = args.minAgeMs ?? DEFAULT_RECEIPT_MIN_AGE_MS;
  const maxAgeMs = args.maxAgeMs ?? DEFAULT_RECEIPT_MAX_AGE_MS;
  const events = await listAreaNotificationEvents();
  const accepted = events.filter((event) => event.provider === 'expo' && event.deliveryStatus === 'accepted' && event.deliveryId);
  const stats = { pending: accepted.length, checked: 0, delivered: 0, failed: 0, missing: 0, expired: 0, subscriptionsDeactivated: 0 };
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
    if (ageMs >= minAgeMs) ready.push(event);
  }

  for (let offset = 0; offset < ready.length; offset += MAX_RECEIPTS_PER_REQUEST) {
    const batch = ready.slice(offset, offset + MAX_RECEIPTS_PER_REQUEST);
    const ids = batch.map((event) => event.deliveryId).filter((id): id is string => Boolean(id));
    const response = await fetchImpl(EXPO_PUSH_RECEIPTS_URL, {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    const payload = (await response.json().catch(() => null)) as { data?: Record<string, ExpoPushReceipt>; errors?: Array<{ message?: string }> } | null;
    if (!response.ok || !payload?.data) throw new Error(payload?.errors?.[0]?.message || `Expo area receipt lookup failed: HTTP ${response.status}`);

    for (const event of batch) {
      const receipt = event.deliveryId ? payload.data[event.deliveryId] : undefined;
      if (!receipt) {
        stats.missing += 1;
        continue;
      }
      stats.checked += 1;
      if (receipt.status === 'ok') {
        await updateAreaNotificationEvent(event.id, { deliveryStatus: 'delivered', deliveryUpdatedAt: now.toISOString(), deliveryError: null });
        stats.delivered += 1;
        continue;
      }
      const errorCode = String(receipt.details?.error || receipt.message || 'push_delivery_failed').slice(0, 500);
      await markEventFailed(event.id, now, errorCode);
      stats.failed += 1;
      if (receipt.details?.error === 'DeviceNotRegistered') {
        const subscription = await getAreaNotificationSubscription(event.subscriptionId);
        if (subscription?.isActive) {
          await updateAreaNotificationSubscription(subscription.id, { isActive: false }, now.toISOString());
          stats.subscriptionsDeactivated += 1;
        }
      }
    }
  }
  return stats;
}

async function markEventFailed(eventId: string, now: Date, error: string) {
  await updateAreaNotificationEvent(eventId, { deliveryStatus: 'failed', deliveryUpdatedAt: now.toISOString(), deliveryError: error });
}
