export type FetchJsonDecoder<T> = (value: unknown) => T;

type FetchJsonOptions<T = unknown> = {
  timeoutMs?: number;
  retries?: number;
  headers?: Record<string, string>;
  decoder?: FetchJsonDecoder<T>;
};

type UpstreamFailureKind =
  | 'timeout'
  | 'network_error'
  | 'rate_limited'
  | 'upstream_server_error'
  | 'http_client_error'
  | 'invalid_content_type'
  | 'invalid_json'
  | 'decode_error';

type UpstreamTelemetryState = {
  requests: number;
  successes: number;
  failures: number;
  attempts: number;
  failedAttempts: number;
  retries: number;
  rateLimitedResponses: number;
  serverErrorResponses: number;
  timeouts: number;
  consecutiveFailures: number;
  totalDurationMs: number;
  maxDurationMs: number;
  lastAttemptAt: string | null;
  lastSuccessAt: string | null;
  lastFailureAt: string | null;
  lastFailureKind: UpstreamFailureKind | null;
};

const globalTelemetry = globalThis as typeof globalThis & {
  __paddleTodayUpstreamTelemetry?: Map<string, UpstreamTelemetryState>;
  __paddleTodayUpstreamTelemetryStartedAt?: number;
};

const upstreamTelemetry =
  globalTelemetry.__paddleTodayUpstreamTelemetry ??= new Map<string, UpstreamTelemetryState>();
globalTelemetry.__paddleTodayUpstreamTelemetryStartedAt ??= Date.now();

export async function fetchJson<T>(url: string, options: FetchJsonOptions<T> & { decoder: FetchJsonDecoder<T> }): Promise<T>;
export async function fetchJson<T = unknown>(url: string, options?: FetchJsonOptions<T>): Promise<T>;
export async function fetchJson<T = unknown>(url: string, options: FetchJsonOptions<T> = {}): Promise<T> {
  const timeoutMs = options.timeoutMs ?? 10_000;
  const retries = Math.max(1, options.retries ?? 2);
  const telemetry = telemetryFor(url);
  const requestStartedAt = Date.now();

  telemetry.requests += 1;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let failureKind: UpstreamFailureKind = 'network_error';

    telemetry.attempts += 1;
    telemetry.lastAttemptAt = new Date().toISOString();

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          accept: 'application/json',
          ...(options.headers ?? {}),
        },
      });

      if (response.status === 429) {
        telemetry.rateLimitedResponses += 1;
        failureKind = 'rate_limited';
      } else if (response.status >= 500) {
        telemetry.serverErrorResponses += 1;
        failureKind = 'upstream_server_error';
      } else if (!response.ok) {
        failureKind = 'http_client_error';
      }

      if ((response.status === 429 || response.status >= 500) && attempt < retries) {
        recordFailedAttempt(telemetry, failureKind);
        telemetry.retries += 1;
        await backoff(attempt);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (!contentType.includes('json')) {
        failureKind = 'invalid_content_type';
        throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
      }

      let body: unknown;
      try {
        body = await response.json();
      } catch (error) {
        failureKind = 'invalid_json';
        throw error;
      }

      let decoded: T;
      try {
        decoded = decodeJson<T>(body, options.decoder);
      } catch (error) {
        failureKind = 'decode_error';
        throw error;
      }

      recordRequestSuccess(telemetry, requestStartedAt);
      return decoded;
    } catch (error) {
      lastError = error;
      if (controller.signal.aborted) {
        failureKind = 'timeout';
        telemetry.timeouts += 1;
      }
      recordFailedAttempt(telemetry, failureKind);
      if (attempt < retries) {
        telemetry.retries += 1;
        await backoff(attempt);
        continue;
      }
      recordRequestFailure(telemetry, requestStartedAt, failureKind);
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError ?? new Error(`Request failed for ${url}`);
}

export function getUpstreamTelemetry() {
  const providers = [...upstreamTelemetry.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([provider, state]) => ({
      provider,
      requests: state.requests,
      successes: state.successes,
      failures: state.failures,
      failureRate: state.requests > 0 ? round(state.failures / state.requests) : 0,
      attempts: state.attempts,
      failedAttempts: state.failedAttempts,
      retries: state.retries,
      rateLimitedResponses: state.rateLimitedResponses,
      serverErrorResponses: state.serverErrorResponses,
      timeouts: state.timeouts,
      consecutiveFailures: state.consecutiveFailures,
      averageDurationMs:
        state.successes + state.failures > 0
          ? Math.round(state.totalDurationMs / (state.successes + state.failures))
          : 0,
      maxDurationMs: state.maxDurationMs,
      lastAttemptAt: state.lastAttemptAt,
      lastSuccessAt: state.lastSuccessAt,
      lastFailureAt: state.lastFailureAt,
      lastFailureKind: state.lastFailureKind,
    }));

  const totals = providers.reduce(
    (summary, provider) => ({
      requests: summary.requests + provider.requests,
      successes: summary.successes + provider.successes,
      failures: summary.failures + provider.failures,
      attempts: summary.attempts + provider.attempts,
      retries: summary.retries + provider.retries,
      rateLimitedResponses: summary.rateLimitedResponses + provider.rateLimitedResponses,
      serverErrorResponses: summary.serverErrorResponses + provider.serverErrorResponses,
      timeouts: summary.timeouts + provider.timeouts,
    }),
    {
      requests: 0,
      successes: 0,
      failures: 0,
      attempts: 0,
      retries: 0,
      rateLimitedResponses: 0,
      serverErrorResponses: 0,
      timeouts: 0,
    },
  );

  return {
    since: new Date(globalTelemetry.__paddleTodayUpstreamTelemetryStartedAt ?? Date.now()).toISOString(),
    ...totals,
    failureRate: totals.requests > 0 ? round(totals.failures / totals.requests) : 0,
    providers,
  };
}

export function resetUpstreamTelemetryForTests() {
  upstreamTelemetry.clear();
  globalTelemetry.__paddleTodayUpstreamTelemetryStartedAt = Date.now();
}

async function backoff(attempt: number): Promise<void> {
  const delayMs = 250 * Math.pow(2, Math.max(0, attempt - 1));
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}

function decodeJson<T>(value: unknown, decoder?: FetchJsonDecoder<T>): T {
  if (decoder) {
    return decoder(value);
  }

  return value as T;
}

function telemetryFor(url: string): UpstreamTelemetryState {
  const provider = upstreamProvider(url);
  const existing = upstreamTelemetry.get(provider);
  if (existing) {
    return existing;
  }

  const state: UpstreamTelemetryState = {
    requests: 0,
    successes: 0,
    failures: 0,
    attempts: 0,
    failedAttempts: 0,
    retries: 0,
    rateLimitedResponses: 0,
    serverErrorResponses: 0,
    timeouts: 0,
    consecutiveFailures: 0,
    totalDurationMs: 0,
    maxDurationMs: 0,
    lastAttemptAt: null,
    lastSuccessAt: null,
    lastFailureAt: null,
    lastFailureKind: null,
  };
  upstreamTelemetry.set(provider, state);
  return state;
}

function upstreamProvider(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase() || 'unknown';
  } catch {
    return 'unknown';
  }
}

function recordFailedAttempt(state: UpstreamTelemetryState, failureKind: UpstreamFailureKind) {
  state.failedAttempts += 1;
  state.lastFailureAt = new Date().toISOString();
  state.lastFailureKind = failureKind;
}

function recordRequestSuccess(state: UpstreamTelemetryState, startedAt: number) {
  state.successes += 1;
  state.consecutiveFailures = 0;
  state.lastSuccessAt = new Date().toISOString();
  recordDuration(state, startedAt);
}

function recordRequestFailure(
  state: UpstreamTelemetryState,
  startedAt: number,
  failureKind: UpstreamFailureKind,
) {
  state.failures += 1;
  state.consecutiveFailures += 1;
  state.lastFailureAt = new Date().toISOString();
  state.lastFailureKind = failureKind;
  recordDuration(state, startedAt);
}

function recordDuration(state: UpstreamTelemetryState, startedAt: number) {
  const durationMs = Math.max(0, Date.now() - startedAt);
  state.totalDurationMs += durationMs;
  state.maxDurationMs = Math.max(state.maxDurationMs, durationMs);
}

function round(value: number) {
  return Math.round(value * 10_000) / 10_000;
}
