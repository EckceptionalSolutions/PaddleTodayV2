import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { listRiverAlerts } from '../src/lib/alerts';
import { listRouteRequests } from '../src/lib/route-requests';

const execFileAsync = promisify(execFile);

const SUBSCRIPTION_ID = process.env.AZURE_SUBSCRIPTION_ID?.trim() || 'a2cc52c3-7f4e-4de7-bf59-9cc6f99bc8e2';
const RESOURCE_GROUP = process.env.PADDLETODAY_RESOURCE_GROUP?.trim() || 'paddletoday';
const APP_SERVICE_NAME = process.env.PADDLETODAY_APP_SERVICE_NAME?.trim() || 'paddletodayapi';
const CLOUDFLARE_MAX_CHUNK_HOURS = 24;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;

type MetricResult<T> = { ok: true; value: T } | { ok: false; error: string };

type CloudflareTotals = {
  requests: number;
  visits: number;
  bytes: number;
};

type WindowTotals = CloudflareTotals & {
  start: string;
  end: string;
  chunks: number;
};

type AppSetting = {
  name: string;
  value: string;
};

async function main() {
  const generatedAt = new Date();
  const outputJson = process.argv.includes('--json');

  const appSettings = await capture('Azure App Service settings', loadAppSettings);
  if (appSettings.ok) {
    applyStorageSettings(appSettings.value);
  }

  const [cloudflare, azureCost, paddleToday] = await Promise.all([
    capture('Cloudflare traffic', loadCloudflareTraffic),
    capture('Azure monthly cost', loadAzureMonthToDateCost),
    capture('PaddleToday storage metrics', loadPaddleTodayMetrics),
  ]);

  const report = {
    generatedAt: generatedAt.toISOString(),
    cloudflare,
    azureCost,
    paddleToday,
    omitted: {
      iphoneInstalls: 'Skipped until App Store Connect API credentials are configured.',
      androidInstalls: 'Skipped until Google Play Console export credentials are configured.',
    },
  };

  if (outputJson) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  printHumanReport(report);
}

async function capture<T>(label: string, loader: () => Promise<T>): Promise<MetricResult<T>> {
  try {
    return { ok: true, value: await loader() };
  } catch (error) {
    return { ok: false, error: `${label} failed: ${error instanceof Error ? error.message : String(error)}` };
  }
}

async function loadAppSettings(): Promise<AppSetting[]> {
  const { stdout } = await runAz([
    'webapp',
    'config',
    'appsettings',
    'list',
    '--resource-group',
    RESOURCE_GROUP,
    '--name',
    APP_SERVICE_NAME,
    '--output',
    'json',
  ]);
  const parsed: unknown = JSON.parse(stdout);
  if (!Array.isArray(parsed)) {
    throw new Error('Azure CLI returned an unexpected app settings payload.');
  }
  return parsed.filter(isAppSetting);
}

function applyStorageSettings(settings: AppSetting[]) {
  const needed = [
    'RIVER_ALERTS_CONTAINER_SAS_URL',
    'RIVER_ALERTS_BLOB_PREFIX',
    'ROUTE_REQUESTS_CONTAINER_SAS_URL',
    'ROUTE_REQUESTS_BLOB_PREFIX',
  ];

  for (const name of needed) {
    const setting = settings.find((candidate) => candidate.name === name);
    if (setting?.value && !process.env[name]) {
      process.env[name] = setting.value;
    }
  }
}

function isAppSetting(value: unknown): value is AppSetting {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as AppSetting).name === 'string' &&
    typeof (value as AppSetting).value === 'string'
  );
}

async function loadCloudflareTraffic() {
  const now = new Date();
  const last24h = await loadCloudflareWindow(new Date(now.getTime() - MS_PER_DAY), now);
  const previous24h = await loadCloudflareWindow(new Date(now.getTime() - 2 * MS_PER_DAY), new Date(now.getTime() - MS_PER_DAY));
  const last7d = await loadCloudflareWindow(new Date(now.getTime() - 7 * MS_PER_DAY), now);
  const previous7d = await capture('Cloudflare previous 7d trend', () =>
    loadCloudflareWindow(new Date(now.getTime() - 14 * MS_PER_DAY), new Date(now.getTime() - 7 * MS_PER_DAY))
  );
  const last30d = await capture('Cloudflare last 30d', () => loadCloudflareWindow(new Date(now.getTime() - 30 * MS_PER_DAY), now));

  return {
    last24h,
    last7d,
    last30d,
    trend: {
      visits24hVsPrevious24h: percentChange(last24h.visits, previous24h.visits),
      visits7dVsPrevious7d: previous7d.ok ? percentChange(last7d.visits, previous7d.value.visits) : null,
      previous24h,
      previous7d,
    },
  };
}

async function loadCloudflareWindow(start: Date, end: Date): Promise<WindowTotals> {
  const chunks = dailyChunks(start, end);
  const totals = { requests: 0, visits: 0, bytes: 0 };

  for (const chunk of chunks) {
    const chunkTotals = await queryCloudflare(chunk.start, chunk.end);
    totals.requests += chunkTotals.requests;
    totals.visits += chunkTotals.visits;
    totals.bytes += chunkTotals.bytes;
  }

  return {
    ...totals,
    start: start.toISOString(),
    end: end.toISOString(),
    chunks: chunks.length,
  };
}

function dailyChunks(start: Date, end: Date) {
  const chunks: { start: Date; end: Date }[] = [];
  let cursor = start.getTime();
  const endMs = end.getTime();

  while (cursor < endMs) {
    const next = Math.min(cursor + CLOUDFLARE_MAX_CHUNK_HOURS * MS_PER_HOUR, endMs);
    chunks.push({ start: new Date(cursor), end: new Date(next) });
    cursor = next;
  }

  return chunks;
}

async function queryCloudflare(start: Date, end: Date): Promise<CloudflareTotals> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();
  const zoneTag = process.env.CLOUDFLARE_ZONE_ID?.trim();

  if (!apiToken || !zoneTag) {
    throw new Error('Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID.');
  }

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
      authorization: `Bearer ${apiToken}`,
      'content-type': 'application/json',
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
  const payload: unknown = await response.json();

  if (!response.ok || hasGraphqlErrors(payload)) {
    throw new Error(readGraphqlErrorMessage(payload) ?? JSON.stringify(payload));
  }

  const totalsGroup = readNested(payload, ['data', 'viewer', 'zones', 0, 'totals', 0]);
  return {
    requests: Number(readNested(totalsGroup, ['count']) ?? 0),
    visits: Number(readNested(totalsGroup, ['sum', 'visits']) ?? 0),
    bytes: Number(readNested(totalsGroup, ['sum', 'edgeResponseBytes']) ?? 0),
  };
}

function hasGraphqlErrors(value: unknown) {
  return Array.isArray(readNested(value, ['errors'])) && (readNested(value, ['errors']) as unknown[]).length > 0;
}

function readGraphqlErrorMessage(value: unknown) {
  const message = readNested(value, ['errors', 0, 'message']);
  return typeof message === 'string' ? message : null;
}

async function loadAzureMonthToDateCost() {
  const body = {
    type: 'ActualCost',
    timeframe: 'MonthToDate',
    dataset: {
      granularity: 'None',
      aggregation: {
        totalCost: {
          name: 'Cost',
          function: 'Sum',
        },
      },
    },
  };
  const tempDir = await mkdtemp(join(tmpdir(), 'paddletoday-cost-'));
  const bodyPath = join(tempDir, 'query.json');

  try {
    await writeFile(bodyPath, JSON.stringify(body), 'utf8');
    const { stdout } = await runAz([
      'rest',
      '--method',
      'post',
      '--url',
      `https://management.azure.com/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.CostManagement/query?api-version=2023-03-01`,
      '--body',
      `@${bodyPath}`,
      '--headers',
      'Content-Type=application/json',
      '--output',
      'json',
    ]);
    const parsed: unknown = JSON.parse(stdout);
    const row = readNested(parsed, ['properties', 'rows', 0]);
    const cost = Array.isArray(row) ? Number(row[0] ?? 0) : 0;
    const currency = Array.isArray(row) ? String(row[1] ?? 'USD') : 'USD';

    return {
      resourceGroup: RESOURCE_GROUP,
      timeframe: 'MonthToDate',
      cost,
      currency,
    };
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function loadPaddleTodayMetrics() {
  assertStorageEnv();

  const now = Date.now();
  const [alerts, routeRequests] = await Promise.all([listRiverAlerts(), listRouteRequests()]);

  return {
    alerts: {
      total: alerts.length,
      active: alerts.filter((alert) => alert.isActive).length,
      createdLast24h: countSince(alerts, 'createdAt', now - MS_PER_DAY),
      createdLast7d: countSince(alerts, 'createdAt', now - 7 * MS_PER_DAY),
      createdLast30d: countSince(alerts, 'createdAt', now - 30 * MS_PER_DAY),
    },
    routeRequests: {
      total: routeRequests.length,
      createdLast24h: countSince(routeRequests, 'submittedAt', now - MS_PER_DAY),
      createdLast7d: countSince(routeRequests, 'submittedAt', now - 7 * MS_PER_DAY),
      createdLast30d: countSince(routeRequests, 'submittedAt', now - 30 * MS_PER_DAY),
    },
  };
}

function assertStorageEnv() {
  const missing = [
    'RIVER_ALERTS_CONTAINER_SAS_URL',
    'ROUTE_REQUESTS_CONTAINER_SAS_URL',
  ].filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing production storage settings: ${missing.join(', ')}`);
  }
}

function countSince<T extends Record<string, unknown>>(items: T[], dateKey: keyof T, sinceMs: number) {
  return items.filter((item) => {
    const value = item[dateKey];
    return typeof value === 'string' && Date.parse(value) >= sinceMs;
  }).length;
}

function percentChange(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }
  return ((current - previous) / previous) * 100;
}

function readNested(value: unknown, path: Array<string | number>): unknown {
  let cursor = value;
  for (const segment of path) {
    if (cursor === null || cursor === undefined) return undefined;
    if (typeof segment === 'number') {
      if (!Array.isArray(cursor)) return undefined;
      cursor = cursor[segment];
      continue;
    }
    if (typeof cursor !== 'object') return undefined;
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor;
}

function printHumanReport(report: Awaited<ReturnType<typeof buildReportShape>>) {
  console.log(`PaddleToday daily metrics (${report.generatedAt})`);
  console.log('');

  if (report.cloudflare.ok) {
    const value = report.cloudflare.value;
    console.log('Cloudflare');
    printWindow('Last 24h', value.last24h);
    printWindow('Last 7d', value.last7d);
    if (value.last30d.ok) {
      printWindow('Last 30d', value.last30d.value);
    } else {
      console.log(`Last 30d: unavailable (${value.last30d.error})`);
    }
    console.log(`24h visit trend: ${formatPercent(value.trend.visits24hVsPrevious24h)} vs previous 24h`);
    if (value.trend.previous7d.ok) {
      console.log(`7d visit trend: ${formatPercent(value.trend.visits7dVsPrevious7d)} vs previous 7d`);
    } else {
      console.log(`7d visit trend: unavailable (${value.trend.previous7d.error})`);
    }
  } else {
    console.log(`Cloudflare: ${report.cloudflare.error}`);
  }
  console.log('');

  if (report.azureCost.ok) {
    const value = report.azureCost.value;
    console.log(`Azure cost: ${formatCurrency(value.cost, value.currency)} ${value.timeframe} (${value.resourceGroup})`);
  } else {
    console.log(`Azure cost: ${report.azureCost.error}`);
  }
  console.log('');

  if (report.paddleToday.ok) {
    const value = report.paddleToday.value;
    console.log('PaddleToday');
    console.log(
      `Alerts: ${formatNumber(value.alerts.total)} total, ${formatNumber(value.alerts.active)} active, ${formatNumber(
        value.alerts.createdLast24h
      )} new 24h, ${formatNumber(value.alerts.createdLast7d)} new 7d, ${formatNumber(value.alerts.createdLast30d)} new 30d`
    );
    console.log(
      `River requests: ${formatNumber(value.routeRequests.total)} total, ${formatNumber(
        value.routeRequests.createdLast24h
      )} new 24h, ${formatNumber(value.routeRequests.createdLast7d)} new 7d, ${formatNumber(
        value.routeRequests.createdLast30d
      )} new 30d`
    );
  } else {
    console.log(`PaddleToday: ${report.paddleToday.error}`);
  }
  console.log('');
  console.log(`iPhone installs: ${report.omitted.iphoneInstalls}`);
  console.log(`Android installs: ${report.omitted.androidInstalls}`);
}

function buildReportShape() {
  return Promise.resolve({
    generatedAt: '',
    cloudflare: {} as MetricResult<Awaited<ReturnType<typeof loadCloudflareTraffic>>>,
    azureCost: {} as MetricResult<Awaited<ReturnType<typeof loadAzureMonthToDateCost>>>,
    paddleToday: {} as MetricResult<Awaited<ReturnType<typeof loadPaddleTodayMetrics>>>,
    omitted: {
      iphoneInstalls: '',
      androidInstalls: '',
    },
  });
}

async function runAz(args: string[]) {
  if (process.platform === 'win32') {
    return await execFileAsync('cmd.exe', ['/d', '/c', ['az', ...args].map(quoteCmdArg).join(' ')]);
  }

  try {
    return await execFileAsync('az', args);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return await execFileAsync('az.cmd', args);
    }
    throw error;
  }
}

function quoteCmdArg(value: string) {
  if (/^[a-zA-Z0-9_./:=@?\\-]+$/.test(value)) {
    return value;
  }

  return `"${value.replace(/(["^&|<>])/g, '^$1')}"`;
}

function printWindow(label: string, totals: WindowTotals) {
  console.log(
    `${label}: ${formatNumber(totals.visits)} visits, ${formatNumber(totals.requests)} requests, ${formatBytes(
      totals.bytes
    )} transfer`
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(Number(value ?? 0));
}

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number | null) {
  if (value === null) return 'n/a';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

function formatBytes(value: number) {
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

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
});
