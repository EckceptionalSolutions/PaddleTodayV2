import { createHash } from 'node:crypto';
import type { AreaNotificationType } from '@paddletoday/api-contract';
import type { AreaNotificationSubscription } from './area-notifications';

const EXPO_PUSH_SEND_URL = 'https://exp.host/--/api/v2/push/send';

interface ExpoPushResponse {
  data?: { status?: 'ok' | 'error'; id?: string; message?: string; details?: { error?: string } };
}

export async function sendAreaNotificationPush(args: {
  subscription: AreaNotificationSubscription;
  notificationType: AreaNotificationType;
  routeSlugs: string[];
  title: string;
  body: string;
  windowKey: string;
}): Promise<{ provider: 'expo' | 'log'; id: string | null; deliveryKey: string; deliveryStatus: 'accepted' }> {
  const deliveryKey = areaNotificationDeliveryKey(args);
  if (String(process.env.AREA_NOTIFICATIONS_DRY_RUN || '').trim().toLowerCase() === 'true') {
    console.log('[area-notifications] dry run', {
      subscriptionId: args.subscription.id,
      notificationType: args.notificationType,
      routeSlugs: args.routeSlugs,
      title: args.title,
      body: args.body,
    });
    return { provider: 'log', id: null, deliveryKey, deliveryStatus: 'accepted' };
  }
  const url = args.routeSlugs.length === 1
    ? `/river/${args.routeSlugs[0]}`
    : args.notificationType === 'weekend_outlook' ? '/weekend' : '/';
  const response = await fetch(EXPO_PUSH_SEND_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'accept-encoding': 'gzip, deflate',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      to: args.subscription.expoPushToken,
      title: args.title,
      body: args.body,
      data: {
        url,
        notificationType: args.notificationType,
        areaSubscriptionId: args.subscription.id,
        deliveryKey,
      },
      sound: 'default',
      priority: 'default',
      channelId: 'nearby-opportunities',
    }),
  });
  if (!response.ok) throw new Error(`Expo area notification send failed: HTTP ${response.status}`);
  const payload = (await response.json()) as ExpoPushResponse;
  const ticket = payload.data;
  if (ticket?.status === 'error') throw new Error(ticket.message || ticket.details?.error || 'Expo area notification send failed.');
  if (ticket?.status !== 'ok' || !ticket.id) throw new Error('Expo area notification send failed: missing acceptance ticket id.');
  return { provider: 'expo', id: ticket.id, deliveryKey, deliveryStatus: 'accepted' };
}

export function areaNotificationDeliveryKey(args: {
  subscription: Pick<AreaNotificationSubscription, 'id'>;
  notificationType: AreaNotificationType;
  routeSlugs: string[];
  windowKey: string;
}) {
  return createHash('sha256')
    .update(`${args.subscription.id}|${args.notificationType}|${args.windowKey}|${args.routeSlugs.slice().sort().join(',')}`)
    .digest('hex')
    .slice(0, 40);
}
