import { sendRiverAlertPush } from '../src/lib/alert-push';
import { listRiverAlerts, type RiverAlertThreshold, type RiverThresholdAlert } from '../src/lib/alerts';
import type { RiverDetailSnapshot } from '../src/lib/river-snapshots';

function getArg(name: string) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

async function main() {
  const threshold = thresholdFromArg(getArg('threshold'));
  const slug = getArg('slug') ?? 'root-river-rushford-houston';
  const now = new Date().toISOString();
  const alert = await resolveAlert({ slug, threshold, now });
  const rating = threshold === 'strong' ? 'Strong' : 'Good';
  const riverName = (getArg('river') ?? alert.riverName) || 'Root River';
  const reach = (getArg('reach') ?? alert.riverReach) || 'Rushford to Houston';
  const snapshot = mockSnapshot({
    slug: alert.riverSlug,
    riverName,
    reach,
    rating,
    now,
  });

  console.log(`Sending mocked ${threshold} push alert to ${maskPushToken(alert.expoPushToken)}...`);
  console.log(`River route: ${alert.riverName} - ${alert.riverReach}`);

  if (getArg('dry-run') === 'true') {
    console.log('Dry run finished. No push was sent.');
    return;
  }

  const result = await sendRiverAlertPush({ alert, snapshot });

  console.log('Mock push finished.');
  console.log(JSON.stringify(result, null, 2));
}

async function resolveAlert(args: {
  slug: string;
  threshold: RiverAlertThreshold;
  now: string;
}): Promise<RiverThresholdAlert> {
  const token = getArg('token') ?? process.env.MOCK_ALERT_EXPO_PUSH_TOKEN;
  if (token) {
    return {
      id: 'alert_mock_push_preview',
      email: '',
      expoPushToken: token,
      deliveryMethod: 'push',
      type: 'river_threshold',
      riverId: 'root-river',
      riverSlug: args.slug,
      riverName: getArg('river') ?? 'Root River',
      riverReach: getArg('reach') ?? 'Rushford to Houston',
      threshold: args.threshold,
      isActive: true,
      lastState: 'below_threshold',
      lastTriggeredAt: null,
      lastEvaluatedAt: null,
      createdAt: args.now,
      updatedAt: args.now,
    };
  }

  const alertId = getArg('alert-id');
  const alerts = await listRiverAlerts({ activeOnly: true });
  const alert = alerts
    .filter((candidate) => candidate.deliveryMethod === 'push' && candidate.expoPushToken)
    .filter((candidate) => !alertId || candidate.id === alertId)
    .filter((candidate) => alertId || (candidate.riverSlug === args.slug && candidate.threshold === args.threshold))
    .at(-1);

  if (!alert) {
    throw new Error(
      'No active push alert found. Create one on the phone first, pass --token=ExponentPushToken[...] or set MOCK_ALERT_EXPO_PUSH_TOKEN.'
    );
  }

  return alert;
}

function thresholdFromArg(value: string | undefined): RiverAlertThreshold {
  return value === 'strong' ? 'strong' : 'good';
}

function mockSnapshot(args: {
  slug: string;
  riverName: string;
  reach: string;
  rating: 'Good' | 'Strong';
  now: string;
}): RiverDetailSnapshot {
  return {
    generatedAt: args.now,
    result: {
      generatedAt: args.now,
      river: {
        riverId: 'root-river',
        slug: args.slug,
        name: args.riverName,
        reach: args.reach,
      },
      score: args.rating === 'Strong' ? 84 : 72,
      rating: args.rating,
      gaugeBandLabel: args.rating === 'Strong' ? 'strong flow' : 'good flow',
    },
  } as RiverDetailSnapshot;
}

function maskPushToken(token: string | null) {
  if (!token) {
    return '(missing token)';
  }

  return token.length > 18 ? `${token.slice(0, 18)}...` : token;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
