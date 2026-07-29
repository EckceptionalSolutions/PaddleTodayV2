import { execFile } from "node:child_process";
import { createSign } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const DAY_MS = 24 * 60 * 60 * 1000;
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
].join(" ");
const PRODUCT_EVENTS = [
  "app_opened",
  "river_hub_viewed",
  "corridor_trip_selected",
  "route_opened",
  "saved_river_toggled",
  "native_alert_create_succeeded",
  "directions_opened",
  "route_report_submitted",
  "route_photo_contribution_submitted",
];
const WEB_CONVERSIONS = [
  "Route view",
  "Guide-to-route click",
  "Submit route request",
  "Toggle favorite",
  "Submit route alert",
  "Share route",
  "Open app download",
  "Submit condition report",
  "Submit route photos",
  "river_hub_viewed",
  "corridor_trip_selected",
];

type SourceResult<T> =
  | { status: "ready"; value: T }
  | { status: "manual"; reason: string; value?: T }
  | { status: "pending"; reason: string }
  | { status: "error"; error: string };

type DateWindow = {
  start: Date;
  end: Date;
  startDate: string;
  endDate: string;
};

type AnalyticsRow = {
  dimensions: Record<string, string>;
  metrics: Record<string, number>;
};

type AnalyticsReport = {
  rows: AnalyticsRow[];
  totals: Record<string, number>;
};

type MetricItem = { name: string; value: number };

async function main() {
  const generatedAt = new Date();
  const windows = reportingWindows(readArg("--as-of"));
  const googleToken = await loadGoogleAccessToken();

  const [firebase, searchConsole, umami, operations] = await Promise.all([
    loadFirebaseAnalytics(googleToken, windows),
    loadSearchConsole(googleToken, windows),
    loadUmami(windows),
    loadOperations(),
  ]);

  const report = {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    period: {
      cadence: "weekly",
      timezone: process.env.METRICS_TIME_ZONE?.trim() || "America/Chicago",
      current: windowJson(windows.current),
      previous: windowJson(windows.previous),
      note: "Uses the latest completed Sunday-Saturday week so delayed Search Console data can settle.",
    },
    sources: { firebase, searchConsole, umami, operations },
  };
  const markdown = renderMarkdown(report);
  const outputDir = readArg("--output-dir");

  if (outputDir) {
    const absoluteOutputDir = resolve(outputDir);
    await mkdir(absoluteOutputDir, { recursive: true });
    await Promise.all([
      writeFile(
        join(absoluteOutputDir, "weekly-product-report.md"),
        markdown,
        "utf8",
      ),
      writeFile(
        join(absoluteOutputDir, "weekly-product-report.json"),
        `${JSON.stringify(report, null, 2)}\n`,
        "utf8",
      ),
    ]);
  }

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(markdown);
  }
}

function reportingWindows(asOf?: string) {
  const now = asOf ? new Date(`${asOf}T12:00:00.000Z`) : new Date();
  if (Number.isNaN(now.getTime())) {
    throw new Error(`Invalid --as-of date: ${asOf}`);
  }

  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const daysSinceSaturday = (today.getUTCDay() + 1) % 7;
  const currentEnd = new Date(today.getTime() - daysSinceSaturday * DAY_MS);
  const currentStart = new Date(currentEnd.getTime() - 6 * DAY_MS);
  const previousEnd = new Date(currentStart.getTime() - DAY_MS);
  const previousStart = new Date(previousEnd.getTime() - 6 * DAY_MS);

  return {
    current: dateWindow(currentStart, currentEnd),
    previous: dateWindow(previousStart, previousEnd),
  };
}

function dateWindow(start: Date, end: Date): DateWindow {
  return {
    start,
    end,
    startDate: isoDate(start),
    endDate: isoDate(end),
  };
}

function windowJson(window: DateWindow) {
  return { startDate: window.startDate, endDate: window.endDate };
}

async function loadGoogleAccessToken(): Promise<SourceResult<string>> {
  const supplied = process.env.GOOGLE_ACCESS_TOKEN?.trim();
  if (supplied) return ready(supplied);

  const encodedCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (encodedCredentials) {
    try {
      const credentials = JSON.parse(decodeJsonSecret(encodedCredentials)) as {
        client_email?: string;
        private_key?: string;
        token_uri?: string;
      };
      if (!credentials.client_email || !credentials.private_key) {
        throw new Error(
          "service-account JSON needs client_email and private_key",
        );
      }
      return ready(await exchangeServiceAccountJwt(credentials));
    } catch (error) {
      return failed(error);
    }
  }

  if (process.env.CI !== "true") {
    try {
      const { stdout } = await runCommand("gcloud", [
        "auth",
        "application-default",
        "print-access-token",
      ]);
      const token = stdout.trim();
      if (token) return ready(token);
    } catch {
      // Local ADC is a convenience fallback; the pending message below is more actionable.
    }
  }

  return pending(
    "Set GOOGLE_SERVICE_ACCOUNT_JSON (raw or base64 JSON), or GOOGLE_ACCESS_TOKEN for a local run.",
  );
}

async function exchangeServiceAccountJwt(credentials: {
  client_email?: string;
  private_key?: string;
  token_uri?: string;
}) {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri =
    credentials.token_uri || "https://oauth2.googleapis.com/token";
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: GOOGLE_SCOPES,
      aud: tokenUri,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(credentials.private_key!, "base64url")}`;
  const response = await fetch(tokenUri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const payload = await readJsonResponse(response);
  const token = readString(payload, "access_token");
  if (!token)
    throw new Error(
      `Google token exchange failed: ${apiError(payload, response.status)}`,
    );
  return token;
}

async function loadFirebaseAnalytics(
  token: SourceResult<string>,
  windows: ReturnType<typeof reportingWindows>,
): Promise<SourceResult<unknown>> {
  const propertyId =
    process.env.GOOGLE_ANALYTICS_PROPERTY_ID?.trim() ||
    process.env.FIREBASE_GA4_PROPERTY_ID?.trim() ||
    "538058487";
  if (token.status !== "ready") {
    return token.status === "error"
      ? { status: "error", error: token.error }
      : pending(token.reason);
  }

  try {
    const [current, previous, productEvents, installs, acquisition] =
      await Promise.all([
        runAnalyticsReport(token.value, propertyId, {
          dateRanges: [gaDateRange(windows.current)],
          metrics: gaMetrics(
            "activeUsers",
            "newUsers",
            "sessions",
            "engagedSessions",
          ),
        }),
        runAnalyticsReport(token.value, propertyId, {
          dateRanges: [gaDateRange(windows.previous)],
          metrics: gaMetrics(
            "activeUsers",
            "newUsers",
            "sessions",
            "engagedSessions",
          ),
        }),
        runAnalyticsReport(token.value, propertyId, {
          dateRanges: [gaDateRange(windows.current)],
          dimensions: gaDimensions("eventName"),
          metrics: gaMetrics("eventCount", "totalUsers"),
          dimensionFilter: inListFilter("eventName", PRODUCT_EVENTS),
          limit: "100",
        }),
        runAnalyticsReport(token.value, propertyId, {
          dateRanges: [gaDateRange(windows.current)],
          dimensions: gaDimensions("platform", "operatingSystem"),
          metrics: gaMetrics("eventCount", "totalUsers"),
          dimensionFilter: exactFilter("eventName", "first_open"),
          limit: "20",
        }),
        runAnalyticsReport(token.value, propertyId, {
          dateRanges: [gaDateRange(windows.current)],
          dimensions: gaDimensions("sessionDefaultChannelGroup"),
          metrics: gaMetrics("sessions", "engagedSessions", "keyEvents"),
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: "10",
        }),
      ]);
    const retention = await runRetentionReport(
      token.value,
      propertyId,
      windows.previous,
    ).then(ready, failed);

    const events = Object.fromEntries(
      productEvents.rows.map((row) => [
        row.dimensions.eventName,
        {
          events: row.metrics.eventCount ?? 0,
          users: row.metrics.totalUsers ?? 0,
        },
      ]),
    );
    const hubUsers = eventUsers(events, "river_hub_viewed");
    const tripUsers = eventUsers(events, "corridor_trip_selected");
    const routeUsers = eventUsers(events, "route_opened");

    return ready({
      propertyId,
      summary: {
        current: current.totals,
        previous: previous.totals,
        activeUsersChangePercent: percentChange(
          current.totals.activeUsers,
          previous.totals.activeUsers,
        ),
        engagementRate: divide(
          current.totals.engagedSessions,
          current.totals.sessions,
        ),
      },
      installs: {
        definition:
          "Firebase/GA4 first_open events; this is an analytics install proxy, not store download telemetry.",
        total: installs.rows.reduce(
          (sum, row) => sum + (row.metrics.eventCount ?? 0),
          0,
        ),
        byPlatform: installs.rows,
      },
      acquisition: acquisition.rows.map((row) => ({
        channel: row.dimensions.sessionDefaultChannelGroup,
        sessions: row.metrics.sessions ?? 0,
        engagedSessions: row.metrics.engagedSessions ?? 0,
        engagementRate: divide(
          row.metrics.engagedSessions,
          row.metrics.sessions,
        ),
        keyEvents: row.metrics.keyEvents ?? 0,
      })),
      productEvents: events,
      corridorFunnel: {
        definition:
          "Unique-user reach: river hub viewed → corridor trip selected → route detail opened.",
        hubUsers,
        tripSelectionUsers: tripUsers,
        routeOpenUsers: routeUsers,
        hubToTripRate: divide(tripUsers, hubUsers),
        hubToRouteRate: divide(routeUsers, hubUsers),
      },
      retention,
    });
  } catch (error) {
    return failed(error);
  }
}

async function runRetentionReport(
  token: string,
  propertyId: string,
  cohortWindow: DateWindow,
) {
  const report = await runAnalyticsReport(token, propertyId, {
    dimensions: gaDimensions("cohort", "cohortNthWeek"),
    metrics: gaMetrics("cohortActiveUsers", "cohortTotalUsers"),
    cohortSpec: {
      cohorts: [
        {
          name: "previous_week_acquisition",
          dimension: "firstSessionDate",
          dateRange: gaDateRange(cohortWindow),
        },
      ],
      cohortsRange: { granularity: "WEEKLY", startOffset: 0, endOffset: 1 },
    },
  });
  const weekOne = report.rows.find(
    (row) => row.dimensions.cohortNthWeek === "0001",
  );
  return {
    definition:
      "Week-1 active-user retention for users first seen during the previous complete week.",
    acquiredUsers: weekOne?.metrics.cohortTotalUsers ?? 0,
    retainedUsers: weekOne?.metrics.cohortActiveUsers ?? 0,
    weekOneRate: divide(
      weekOne?.metrics.cohortActiveUsers,
      weekOne?.metrics.cohortTotalUsers,
    ),
  };
}

async function runAnalyticsReport(
  token: string,
  propertyId: string,
  request: Record<string, unknown>,
): Promise<AnalyticsReport> {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );
  const payload = await readJsonResponse(response);
  if (!response.ok)
    throw new Error(
      `Analytics Data API: ${apiError(payload, response.status)}`,
    );

  const dimensionHeaders = readArray(payload, "dimensionHeaders").map(
    (value) => readString(value, "name") || "",
  );
  const metricHeaders = readArray(payload, "metricHeaders").map(
    (value) => readString(value, "name") || "",
  );
  const rows = readArray(payload, "rows").map((row) => {
    const dimensionValues = readArray(row, "dimensionValues");
    const metricValues = readArray(row, "metricValues");
    return {
      dimensions: Object.fromEntries(
        dimensionHeaders.map((name, index) => [
          name,
          readString(dimensionValues[index], "value") || "",
        ]),
      ),
      metrics: Object.fromEntries(
        metricHeaders.map((name, index) => [
          name,
          Number(readString(metricValues[index], "value") || 0),
        ]),
      ),
    };
  });
  const totalValues = readArray(
    readArray(payload, "totals")[0],
    "metricValues",
  );
  const totals = Object.fromEntries(
    metricHeaders.map((name, index) => [
      name,
      Number(readString(totalValues[index], "value") || 0),
    ]),
  );
  if (Object.keys(totals).length === 0 && rows.length === 1) {
    Object.assign(totals, rows[0].metrics);
  }
  return { rows, totals };
}

async function loadSearchConsole(
  token: SourceResult<string>,
  windows: ReturnType<typeof reportingWindows>,
): Promise<SourceResult<unknown>> {
  const siteUrl =
    process.env.SEARCH_CONSOLE_SITE_URL?.trim() || "sc-domain:paddletoday.com";
  if (token.status !== "ready") {
    return token.status === "error"
      ? { status: "error", error: token.error }
      : pending(token.reason);
  }

  try {
    const [current, previous, queries, pages] = await Promise.all([
      searchConsoleQuery(token.value, siteUrl, windows.current, []),
      searchConsoleQuery(token.value, siteUrl, windows.previous, []),
      searchConsoleQuery(token.value, siteUrl, windows.current, ["query"], 10),
      searchConsoleQuery(token.value, siteUrl, windows.current, ["page"], 10),
    ]);
    return ready({
      siteUrl,
      summary: {
        current: current.summary,
        previous: previous.summary,
        clicksChangePercent: percentChange(
          current.summary.clicks,
          previous.summary.clicks,
        ),
        impressionsChangePercent: percentChange(
          current.summary.impressions,
          previous.summary.impressions,
        ),
      },
      topQueries: queries.rows,
      topPages: pages.rows,
      caveat:
        "Search Console returns top rows and may omit anonymized or low-volume queries.",
    });
  } catch (error) {
    return failed(error);
  }
}

async function searchConsoleQuery(
  token: string,
  siteUrl: string,
  window: DateWindow,
  dimensions: string[],
  rowLimit = 1,
) {
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        startDate: window.startDate,
        endDate: window.endDate,
        dimensions,
        rowLimit,
        dataState: "final",
      }),
    },
  );
  const payload = await readJsonResponse(response);
  if (!response.ok)
    throw new Error(
      `Search Console API: ${apiError(payload, response.status)}`,
    );
  const rows = readArray(payload, "rows").map((row) => ({
    key: readArray(row, "keys").map(String).join(" / ") || "(all)",
    clicks: readNumber(row, "clicks"),
    impressions: readNumber(row, "impressions"),
    ctr: readNumber(row, "ctr"),
    position: readNumber(row, "position"),
  }));
  const first = rows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return { summary: first, rows };
}

async function loadUmami(
  windows: ReturnType<typeof reportingWindows>,
): Promise<SourceResult<unknown>> {
  const apiKey = process.env.UMAMI_API_KEY?.trim();
  const websiteId =
    process.env.UMAMI_WEBSITE_ID?.trim() ||
    process.env.PUBLIC_UMAMI_WEBSITE_ID?.trim() ||
    "ce97ebc3-44ba-4c12-898e-666c904bc6b6";
  if (!apiKey) {
    return {
      status: "manual",
      reason:
        "Tracking is enabled, but the current Umami plan does not provide an API key. Review web behavior in the Umami dashboard.",
      value: { websiteId },
    };
  }

  try {
    const baseUrl = (
      process.env.UMAMI_API_URL?.trim() || "https://cloud.umami.is/api"
    ).replace(/\/$/, "");
    const headers = { "x-umami-api-key": apiKey };
    const [current, previous, referrers, paths, events] = await Promise.all([
      umamiGet(baseUrl, headers, websiteId, "stats", windows.current),
      umamiGet(baseUrl, headers, websiteId, "stats", windows.previous),
      umamiGet(baseUrl, headers, websiteId, "metrics", windows.current, {
        type: "referrer",
      }),
      umamiGet(baseUrl, headers, websiteId, "metrics", windows.current, {
        type: "path",
      }),
      umamiGet(baseUrl, headers, websiteId, "metrics", windows.current, {
        type: "event",
      }),
    ]);
    const eventMetrics = metricItems(events);
    const eventMap = Object.fromEntries(
      eventMetrics.map((item) => [item.name, item.value]),
    );
    const hubViews = eventMap.river_hub_viewed ?? 0;
    const tripSelections = eventMap.corridor_trip_selected ?? 0;

    return ready({
      websiteId,
      summary: {
        current,
        previous,
        visitorsChangePercent: percentChange(
          readNumber(current, "visitors"),
          readNumber(previous, "visitors"),
        ),
      },
      acquisition: metricItems(referrers).slice(0, 10),
      topLandingPaths: metricItems(paths).slice(0, 10),
      conversions: WEB_CONVERSIONS.map((name) => ({
        name,
        events: eventMap[name] ?? 0,
      })),
      corridorFunnel: {
        definition: "Event reach: river hub viewed → corridor trip selected.",
        hubViews,
        tripSelections,
        hubToTripRate: divide(tripSelections, hubViews),
      },
    });
  } catch (error) {
    return failed(error);
  }
}

async function umamiGet(
  baseUrl: string,
  headers: Record<string, string>,
  websiteId: string,
  endpoint: string,
  window: DateWindow,
  extra: Record<string, string> = {},
) {
  const query = new URLSearchParams({
    startAt: String(window.start.getTime()),
    endAt: String(window.end.getTime() + DAY_MS - 1),
    timezone: process.env.METRICS_TIME_ZONE?.trim() || "America/Chicago",
    ...extra,
  });
  const response = await fetch(
    `${baseUrl}/websites/${encodeURIComponent(websiteId)}/${endpoint}?${query}`,
    { headers },
  );
  const payload = await readJsonResponse(response);
  if (!response.ok)
    throw new Error(`Umami API: ${apiError(payload, response.status)}`);
  return payload;
}

async function loadOperations(): Promise<SourceResult<unknown>> {
  try {
    const tsxCli = resolve("node_modules", "tsx", "dist", "cli.mjs");
    const { stdout } = await execFileAsync(
      process.execPath,
      [tsxCli, "scripts/daily-site-metrics.ts", "--json"],
      {
        cwd: process.cwd(),
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    return ready(JSON.parse(stdout));
  } catch (error) {
    return failed(error);
  }
}

function renderMarkdown(report: {
  generatedAt: string;
  period: {
    current: { startDate: string; endDate: string };
    previous: { startDate: string; endDate: string };
    note: string;
  };
  sources: Record<string, SourceResult<any>>;
}) {
  const { firebase, searchConsole, umami, operations } = report.sources;
  const lines = [
    "# PaddleToday weekly product report",
    "",
    `**Period:** ${report.period.current.startDate} through ${report.period.current.endDate} (previous: ${report.period.previous.startDate} through ${report.period.previous.endDate})`,
    "",
    report.period.note,
    "",
    "## Decision summary",
    "",
  ];

  if (firebase.status === "ready") {
    const value = firebase.value;
    const retentionSummary =
      value.retention.status === "ready"
        ? `${percent(value.retention.value.weekOneRate)} week-1 retention`
        : `week-1 retention ${sourceMessage(value.retention)}`;
    lines.push(
      `- Mobile: ${integer(value.summary.current.activeUsers)} active users (${signedPercent(value.summary.activeUsersChangePercent)} WoW), ${integer(value.installs.total)} first opens, ${percent(value.summary.engagementRate)} engagement rate, ${retentionSummary}.`,
      `- Mobile corridor: ${integer(value.corridorFunnel.hubUsers)} hub users → ${integer(value.corridorFunnel.tripSelectionUsers)} trip selectors (${percent(value.corridorFunnel.hubToTripRate)}) → ${integer(value.corridorFunnel.routeOpenUsers)} route-detail users.`,
    );
  } else {
    lines.push(
      `- Mobile acquisition, installs, corridor conversion, and retention: ${sourceMessage(firebase)}`,
    );
  }
  if (searchConsole.status === "ready") {
    const value = searchConsole.value;
    lines.push(
      `- Organic search: ${integer(value.summary.current.clicks)} clicks (${signedPercent(value.summary.clicksChangePercent)} WoW), ${integer(value.summary.current.impressions)} impressions, ${percent(value.summary.current.ctr)} CTR.`,
    );
  } else {
    lines.push(`- Organic search quality: ${sourceMessage(searchConsole)}`);
  }
  if (umami.status === "ready") {
    const value = umami.value;
    lines.push(
      `- Web product analytics: ${integer(readNumber(value.summary.current, "visitors"))} visitors (${signedPercent(value.summary.visitorsChangePercent)} WoW); hub-to-trip event conversion ${percent(value.corridorFunnel.hubToTripRate)}.`,
    );
  } else {
    lines.push(`- Web product analytics: ${sourceMessage(umami)}`);
  }

  lines.push("", "## Acquisition quality", "");
  if (searchConsole.status === "ready") {
    lines.push(
      "| Search query | Clicks | Impressions | CTR | Position |",
      "| --- | ---: | ---: | ---: | ---: |",
    );
    for (const row of searchConsole.value.topQueries) {
      lines.push(
        `| ${escapeCell(row.key)} | ${integer(row.clicks)} | ${integer(row.impressions)} | ${percent(row.ctr)} | ${decimal(row.position)} |`,
      );
    }
    lines.push("");
  }
  if (firebase.status === "ready") {
    lines.push(
      "| Mobile channel | Sessions | Engagement | Key events |",
      "| --- | ---: | ---: | ---: |",
    );
    for (const row of firebase.value.acquisition) {
      lines.push(
        `| ${escapeCell(row.channel)} | ${integer(row.sessions)} | ${percent(row.engagementRate)} | ${integer(row.keyEvents)} |`,
      );
    }
    lines.push("");
  }

  lines.push("## Product and retention", "");
  if (firebase.status === "ready") {
    const value = firebase.value;
    lines.push(
      `- Installs proxy: **${integer(value.installs.total)}** first opens.`,
    );
    if (value.retention.status === "ready") {
      lines.push(
        `- Week-1 retention: **${percent(value.retention.value.weekOneRate)}** (${integer(value.retention.value.retainedUsers)} of ${integer(value.retention.value.acquiredUsers)} acquired users active).`,
      );
    } else {
      lines.push(`- Week-1 retention: ${sourceMessage(value.retention)}.`);
    }
    lines.push(
      `- Corridor hub → trip selection: **${percent(value.corridorFunnel.hubToTripRate)}**.`,
      "",
      "| Mobile event | Events | Users |",
      "| --- | ---: | ---: |",
    );
    for (const name of PRODUCT_EVENTS) {
      const metric = value.productEvents[name] ?? { events: 0, users: 0 };
      lines.push(
        `| ${name} | ${integer(metric.events)} | ${integer(metric.users)} |`,
      );
    }
    lines.push("");
  } else {
    lines.push(`${sourceMessage(firebase)}`, "");
  }

  lines.push("## Operations and cost", "");
  if (operations.status === "ready") {
    const value = operations.value;
    if (value.cloudflare?.ok) {
      lines.push(
        `- Cloudflare: ${integer(value.cloudflare.value.last7d.visits)} visits and ${integer(value.cloudflare.value.last7d.requests)} requests in the rolling last 7 days.`,
      );
    } else {
      lines.push(
        `- Cloudflare: ${operationMetricMessage("Cloudflare", value.cloudflare?.error)}`,
      );
    }
    if (value.azureCost?.ok) {
      lines.push(
        `- Azure: ${currency(value.azureCost.value.cost, value.azureCost.value.currency)} month-to-date.`,
      );
    } else {
      lines.push(
        `- Azure cost: ${operationMetricMessage("Azure", value.azureCost?.error)}`,
      );
    }
    if (value.paddleToday?.ok) {
      lines.push(
        `- Product operations: ${integer(value.paddleToday.value.alerts.createdLast7d)} new alerts and ${integer(value.paddleToday.value.routeRequests.createdLast7d)} route requests in the rolling last 7 days.`,
      );
    } else {
      lines.push(
        `- Alerts and requests: ${operationMetricMessage("storage", value.paddleToday?.error)}`,
      );
    }
  } else {
    lines.push(sourceMessage(operations));
  }

  lines.push(
    "",
    "## Data readiness",
    "",
    "| Source | Status |",
    "| --- | --- |",
  );
  for (const [name, source] of Object.entries(report.sources)) {
    const status =
      name === "operations"
        ? operationsReadiness(source)
        : source.status === "ready"
          ? "Ready"
          : sourceMessage(source);
    lines.push(`| ${name} | ${escapeCell(status)} |`);
  }
  lines.push("", `Generated ${report.generatedAt}.`, "");
  return lines.join("\n");
}

function metricItems(payload: unknown): MetricItem[] {
  const raw = Array.isArray(payload) ? payload : readArray(payload, "data");
  return raw.map((item) => ({
    name:
      readString(item, "x") ||
      readString(item, "name") ||
      readString(item, "value") ||
      "(unknown)",
    value:
      readNumber(item, "y") ||
      readNumber(item, "count") ||
      readNumber(item, "total"),
  }));
}

function sourceMessage(source: SourceResult<unknown>) {
  if (source.status === "manual") return `manual review — ${source.reason}`;
  if (source.status === "pending") return `pending setup — ${source.reason}`;
  if (source.status === "error") return `unavailable — ${source.error}`;
  return "ready";
}

function operationMetricMessage(
  kind: "Cloudflare" | "Azure" | "storage",
  error?: string,
) {
  if (!error) return "unavailable";
  if (
    kind === "Cloudflare" &&
    error.includes("CLOUDFLARE_API_TOKEN") &&
    error.includes("CLOUDFLARE_ZONE_ID")
  ) {
    return "pending setup — add the CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID GitHub secrets";
  }
  if (
    kind === "Azure" &&
    (error.includes("az login") ||
      error.includes("AZURE_CREDENTIALS") ||
      error.includes("ENOENT"))
  ) {
    return "pending setup — add the AZURE_CREDENTIALS GitHub secret";
  }
  if (
    kind === "storage" &&
    error.includes("Missing production storage settings")
  ) {
    const missing = error
      .split("Missing production storage settings:")[1]
      ?.trim();
    return `pending setup — add the ${missing || "storage SAS URL"} GitHub secret${missing?.includes(",") ? "s" : ""}`;
  }
  return `unavailable — ${error}`;
}

function operationsReadiness(source: SourceResult<any>) {
  if (source.status !== "ready") return sourceMessage(source);
  const metrics = [
    ["Cloudflare", source.value.cloudflare] as const,
    ["Azure", source.value.azureCost] as const,
    ["storage", source.value.paddleToday] as const,
  ];
  const readyCount = metrics.filter(([, metric]) => metric?.ok).length;
  if (readyCount === metrics.length) return "Ready";
  const unavailable = metrics
    .filter(([, metric]) => !metric?.ok)
    .map(([kind, metric]) => operationMetricMessage(kind, metric?.error));
  return `${readyCount > 0 ? "Partial" : "Pending setup"} — ${unavailable.join("; ")}`;
}

function eventUsers(events: Record<string, { users?: number }>, name: string) {
  return Number(events[name]?.users ?? 0);
}

function ready<T>(value: T): SourceResult<T> {
  return { status: "ready", value };
}

function pending<T = never>(reason: string): SourceResult<T> {
  return { status: "pending", reason };
}

function failed<T = never>(error: unknown): SourceResult<T> {
  return {
    status: "error",
    error: error instanceof Error ? error.message : String(error),
  };
}

function gaDateRange(window: DateWindow) {
  return { startDate: window.startDate, endDate: window.endDate };
}

function gaMetrics(...names: string[]) {
  return names.map((name) => ({ name }));
}

function gaDimensions(...names: string[]) {
  return names.map((name) => ({ name }));
}

function exactFilter(fieldName: string, value: string) {
  return { filter: { fieldName, stringFilter: { matchType: "EXACT", value } } };
}

function inListFilter(fieldName: string, values: string[]) {
  return {
    filter: { fieldName, inListFilter: { values, caseSensitive: true } },
  };
}

function percentChange(current?: number, previous?: number) {
  if (!previous) return current ? null : 0;
  return ((Number(current ?? 0) - previous) / previous) * 100;
}

function divide(numerator?: number, denominator?: number) {
  return denominator ? Number(numerator ?? 0) / denominator : null;
}

function readArg(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function isoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function decodeJsonSecret(value: string) {
  if (value.startsWith("{")) return value;
  return Buffer.from(value, "base64").toString("utf8");
}

function base64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

async function readJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `HTTP ${response.status} returned non-JSON: ${text.slice(0, 200)}`,
    );
  }
}

function apiError(payload: unknown, status: number) {
  const error = readObject(payload, "error");
  return (
    readString(error, "message") ||
    readString(payload, "message") ||
    `HTTP ${status}`
  );
}

function readObject(value: unknown, key: string): Record<string, unknown> {
  if (!value || typeof value !== "object") return {};
  const nested = (value as Record<string, unknown>)[key];
  return nested && typeof nested === "object" && !Array.isArray(nested)
    ? (nested as Record<string, unknown>)
    : {};
}

function readArray(value: unknown, key: string): unknown[] {
  if (!value || typeof value !== "object") return [];
  const nested = (value as Record<string, unknown>)[key];
  return Array.isArray(nested) ? nested : [];
}

function readString(value: unknown, key: string) {
  if (!value || typeof value !== "object") return "";
  const nested = (value as Record<string, unknown>)[key];
  return typeof nested === "string" ? nested : "";
}

function readNumber(value: unknown, key: string) {
  if (!value || typeof value !== "object") return 0;
  return Number((value as Record<string, unknown>)[key] ?? 0);
}

function integer(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number(value ?? 0),
  );
}

function decimal(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
    Number(value ?? 0),
  );
}

function percent(value: number | null) {
  return value === null || !Number.isFinite(value)
    ? "n/a"
    : `${(value * 100).toFixed(1)}%`;
}

function signedPercent(value: number | null) {
  return value === null || !Number.isFinite(value)
    ? "n/a"
    : `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function currency(value: number, code: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code || "USD",
  }).format(value);
}

function escapeCell(value: unknown) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

async function runCommand(command: string, args: string[]) {
  if (process.platform === "win32") {
    return execFileAsync("cmd.exe", [
      "/d",
      "/c",
      [command, ...args].map(quoteCmdArg).join(" "),
    ]);
  }
  return execFileAsync(command, args);
}

function quoteCmdArg(value: string) {
  return /^[a-zA-Z0-9_./:=@?\\-]+$/.test(value)
    ? value
    : `"${value.replace(/(["^&|<>])/g, "^$1")}"`;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
});
