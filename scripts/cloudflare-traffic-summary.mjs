const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();
const zoneTag = process.env.CLOUDFLARE_ZONE_ID?.trim();
const hours = Number.parseInt(process.env.CLOUDFLARE_LOOKBACK_HOURS ?? '24', 10);

if (!apiToken || !zoneTag) {
  console.error('Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID before running this script.');
  process.exit(1);
}

if (!Number.isFinite(hours) || hours <= 0 || hours > 168) {
  console.error('CLOUDFLARE_LOOKBACK_HOURS must be between 1 and 168.');
  process.exit(1);
}

const end = new Date();
const start = new Date(end.getTime() - hours * 60 * 60 * 1000);

const query = `
  query PaddleTodayTrafficSummary($zoneTag: string, $start: Time, $end: Time) {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        totals: httpRequestsAdaptiveGroups(
          limit: 1
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            requestSource: "eyeball"
          }
        ) {
          count
          avg {
            sampleInterval
          }
          sum {
            edgeResponseBytes
            visits
          }
        }
      }
    }
  }
`;

const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      zoneTag,
      start: start.toISOString(),
      end: end.toISOString(),
    },
  }),
});

const payload = await response.json();

if (!response.ok || payload.errors?.length) {
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
}

const totalsGroup = payload.data?.viewer?.zones?.[0]?.totals?.[0];
const totals = {
  requests: Number(totalsGroup?.count ?? 0),
  visits: Number(totalsGroup?.sum?.visits ?? 0),
  bytes: Number(totalsGroup?.sum?.edgeResponseBytes ?? 0),
};

console.log(`Cloudflare traffic summary (${start.toISOString()} to ${end.toISOString()})`);
console.log(`Requests: ${formatNumber(totals.requests)}`);
console.log(`Visits: ${formatNumber(totals.visits)}`);
console.log(`Data transfer: ${formatBytes(totals.bytes)}`);

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(Number(value ?? 0));
}

function formatBytes(value) {
  const bytes = Number(value ?? 0);
  if (bytes < 1024) return `${bytes} B`;

  const units = ['KB', 'MB', 'GB', 'TB'];
  let amount = bytes / 1024;
  let unitIndex = 0;

  while (amount >= 1024 && unitIndex < units.length - 1) {
    amount /= 1024;
    unitIndex += 1;
  }

  return `${amount.toFixed(amount >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}
