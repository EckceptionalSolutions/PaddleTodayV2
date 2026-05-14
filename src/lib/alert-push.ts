import type { RiverThresholdAlert } from './alerts';
import type { RiverDetailSnapshot } from './river-snapshots';

const EXPO_PUSH_SEND_URL = 'https://exp.host/--/api/v2/push/send';

interface ExpoPushTicket {
  status?: 'ok' | 'error';
  id?: string;
  message?: string;
  details?: {
    error?: string;
  };
}

interface ExpoPushResponse {
  data?: ExpoPushTicket | ExpoPushTicket[];
}

export async function sendRiverAlertPush(args: {
  alert: RiverThresholdAlert;
  snapshot: RiverDetailSnapshot;
}): Promise<{ provider: 'expo'; id: string | null; subject: string }> {
  if (!args.alert.expoPushToken) {
    throw new Error('Missing Expo push token for push alert.');
  }

  const subject = subjectForAlert(args.alert, args.snapshot);
  const response = await fetch(EXPO_PUSH_SEND_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'accept-encoding': 'gzip, deflate',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      to: args.alert.expoPushToken,
      title: subject,
      body: bodyForAlert(args.snapshot),
      data: {
        url: `/river/${args.alert.riverSlug}`,
        riverSlug: args.alert.riverSlug,
        alertId: args.alert.id,
      },
      sound: 'default',
      priority: 'high',
      channelId: 'river-alerts',
    }),
  });

  if (!response.ok) {
    throw new Error(`Expo push send failed: HTTP ${response.status}`);
  }

  const payload = (await response.json()) as ExpoPushResponse;
  const ticket = Array.isArray(payload.data) ? payload.data[0] : payload.data;
  if (ticket?.status === 'error') {
    throw new Error(ticket.message || ticket.details?.error || 'Expo push send failed.');
  }

  return {
    provider: 'expo',
    id: ticket?.id ?? null,
    subject,
  };
}

function subjectForAlert(alert: RiverThresholdAlert, snapshot: RiverDetailSnapshot) {
  return alert.threshold === 'strong'
    ? `${snapshot.result.river.name} is Strong today`
    : `${snapshot.result.river.name} is paddleable today`;
}

function bodyForAlert(snapshot: RiverDetailSnapshot) {
  return `${snapshot.result.score} ${snapshot.result.rating}. ${snapshot.result.gaugeBandLabel}`;
}
