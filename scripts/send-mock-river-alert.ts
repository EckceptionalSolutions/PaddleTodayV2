import { sendRiverAlertEmail } from '../src/lib/alert-email';

function getArg(name: string) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

async function main() {
  const to = getArg('to') ?? process.env.MOCK_ALERT_TO ?? process.env.ACS_EMAIL_TO;
  const from = getArg('from') ?? process.env.MOCK_ALERT_FROM ?? process.env.ALERTS_FROM_EMAIL;
  const thresholdArg = getArg('threshold');
  const threshold = thresholdArg === 'strong' ? 'strong' : 'good';
  const ratingArg = getArg('rating');
  const rating = ratingArg === 'Strong' ? 'Strong' : 'Good';

  if (!to) {
    throw new Error('Missing recipient. Pass --to=you@example.com or set MOCK_ALERT_TO.');
  }

  if (!from && process.env.ALERTS_EMAIL_PROVIDER !== 'log' && !process.env.ACS_EMAIL_CONNECTION_STRING) {
    throw new Error(
      'Missing sender configuration. Set ALERTS_FROM_EMAIL and ACS_EMAIL_CONNECTION_STRING, or set ALERTS_EMAIL_PROVIDER=log.'
    );
  }

  if (from && !process.env.ALERTS_FROM_EMAIL) {
    process.env.ALERTS_FROM_EMAIL = from;
  }

  const now = new Date().toISOString();
  const slug = getArg('slug') ?? 'root-river-rushford-houston';
  const riverName = getArg('river') ?? 'Root River';
  const reach = getArg('reach') ?? 'Rushford to Houston';
  const siteUrl = process.env.SITE_URL ?? 'https://paddletoday.com';

  const alert = {
    id: 'alert_mock_preview',
    email: to,
    type: 'river_threshold',
    riverId: 'root-river',
    riverSlug: slug,
    riverName,
    riverReach: reach,
    threshold,
    isActive: true,
    lastState: 'below_threshold',
    lastTriggeredAt: null,
    createdAt: now,
    updatedAt: now,
  } as const;

  const snapshot = {
    generatedAt: now,
    result: {
      generatedAt: now,
      river: {
        riverId: 'root-river',
        slug,
        name: riverName,
        reach,
      },
      score: rating === 'Strong' ? 84 : 72,
      rating,
      explanation:
        rating === 'Strong'
          ? 'Flows look strong, weather is cooperative, and the route grades out as a standout day.'
          : 'Flows are in range, weather looks manageable, and this route grades out as a solid paddle day.',
      confidence: {
        label: 'Medium',
      },
      weather: {
        rainTimingLabel: 'No rain expected through the paddle window',
      },
    },
  } as any;

  console.log(`Sending mocked ${threshold} alert to ${to}...`);
  console.log(`River page: ${new URL(`/rivers/${slug}/`, siteUrl).toString()}`);

  const result = await sendRiverAlertEmail({
    alert,
    snapshot,
  });

  console.log('Mock alert finished.');
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
