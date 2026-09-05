const baseUrl = normalizeBaseUrl(process.env.DEPLOYMENT_BASE_URL ?? 'https://paddletoday.com');
const timeoutMs = positiveNumber(process.env.DEPLOYMENT_SMOKE_TIMEOUT_MS, 15_000);
const healthPath = normalizePath(process.env.DEPLOYMENT_HEALTH_PATH ?? '/api/health');
const readinessPath = normalizePath(process.env.DEPLOYMENT_READINESS_PATH ?? '/api/health/ready');
const checks = [];

const [ready, health, home, summary, weekend] = await Promise.all([
  checkJson('readiness', readinessPath, validateReadiness),
  checkJson('health telemetry', healthPath, validateHealth),
  checkHtml('homepage', '/'),
  checkJson('summary board', '/api/rivers/summary.json', validateSummary),
  checkJson('weekend board', '/api/weekend/summary.json', validateWeekend),
]);
await checkSecurityHeaders();

const firstSlug = summary?.rivers?.[0]?.river?.slug;
if (firstSlug) {
  await checkJson(
    'river detail',
    `/api/rivers/${encodeURIComponent(firstSlug)}.json`,
    (payload) => validateRiverDetail(payload, firstSlug),
  );
  const putInId = summary.rivers[0]?.river?.putIn?.id;
  const takeOutId = summary.rivers[0]?.river?.takeOut?.id;
  const accessQuery = putInId && takeOutId
    ? `?${new URLSearchParams({ putin: putInId, takeout: takeOutId })}`
    : '';
  await Promise.all([
    checkAttachment(
      'GPX export',
      `/api/rivers/${encodeURIComponent(firstSlug)}/trip.gpx${accessQuery}`,
      'application/gpx+xml',
      '<gpx',
    ),
    checkAttachment(
      'calendar export',
      `/api/rivers/${encodeURIComponent(firstSlug)}/trip.ics${accessQuery}`,
      'text/calendar',
      'BEGIN:VCALENDAR',
    ),
  ]);
} else {
  record('river detail', false, 'summary board did not include a route slug');
  record('GPX export', false, 'summary board did not include a route slug');
  record('calendar export', false, 'summary board did not include a route slug');
}

for (const check of checks) {
  console.log(`${check.ok ? 'ok' : 'fail'} - ${check.name}${check.detail ? ` (${check.detail})` : ''}`);
}

const failed = checks.filter((check) => !check.ok);
if (failed.length > 0) {
  console.error(`\n${failed.length} deployment smoke check${failed.length === 1 ? '' : 's'} failed for ${baseUrl}.`);
  process.exit(1);
}

console.log(`\n${checks.length} deployment smoke checks passed for ${baseUrl}.`);

async function checkJson(name, path, validate) {
  try {
    const response = await fetchWithTimeout(new URL(path, baseUrl), {
      headers: { accept: 'application/json' },
    });
    const text = await response.text();
    const payload = parseJson(text);

    if (!response.ok) {
      record(name, false, `HTTP ${response.status}`);
      return null;
    }

    const responseRequestId = response.headers.get('x-request-id');
    if (typeof payload?.requestId !== 'string' || payload.requestId === 'unknown') {
      record(name, false, 'missing requestId');
      return null;
    }
    if (responseRequestId !== payload.requestId) {
      record(name, false, 'x-request-id does not match response body');
      return null;
    }

    const validation = validate(payload);
    record(name, validation.ok, validation.detail);
    return validation.ok ? payload : null;
  } catch (error) {
    record(name, false, errorMessage(error));
    return null;
  }
}

async function checkHtml(name, path) {
  try {
    const response = await fetchWithTimeout(new URL(path, baseUrl), {
      headers: { accept: 'text/html' },
    });
    const text = await response.text();
    const contentType = response.headers.get('content-type') ?? '';
    const valid =
      response.ok &&
      contentType.toLowerCase().includes('text/html') &&
      /Paddle\s*Today/i.test(text) &&
      text.length > 1_000;
    record(name, valid, valid ? `${text.length} bytes` : `HTTP ${response.status}, ${contentType || 'no content type'}`);
  } catch (error) {
    record(name, false, errorMessage(error));
  }
}

async function checkAttachment(name, path, expectedContentType, marker) {
  try {
    const response = await fetchWithTimeout(new URL(path, baseUrl), {
      headers: { accept: expectedContentType },
    });
    const text = await response.text();
    const contentType = response.headers.get('content-type') ?? '';
    const valid = response.ok && contentType.toLowerCase().includes(expectedContentType) && text.includes(marker);
    record(name, valid, valid ? `${text.length} bytes` : `HTTP ${response.status}, ${contentType || 'no content type'}`);
  } catch (error) {
    record(name, false, errorMessage(error));
  }
}

async function checkSecurityHeaders() {
  try {
    const response = await fetchWithTimeout(new URL('/', baseUrl), { headers: { accept: 'text/html' } });
    const required = [
      ['x-content-type-options', (value) => value === 'nosniff'],
      // same-origin is at least as restrictive as the documented baseline.
      ['referrer-policy', (value) => value === 'strict-origin-when-cross-origin' || value === 'same-origin'],
      ['permissions-policy', (value) => value === 'geolocation=(), microphone=(), camera=()'],
    ];
    for (const [name, validate] of required) {
      if (!validate(response.headers.get(name))) {
        record('security headers', false, `${name} is missing or unexpected`);
        return;
      }
    }
    if (new URL(baseUrl).protocol === 'https:') {
      const hsts = response.headers.get('strict-transport-security') ?? '';
      const maxAge = Number(hsts.match(/(?:^|;)\s*max-age=(\d+)/i)?.[1] ?? 0);
      if (maxAge < 31_536_000 || !/includeSubDomains/i.test(hsts)) {
        record('security headers', false, 'strict-transport-security must includeSubDomains with max-age >= 31536000');
        return;
      }
    }
    record('security headers', true, 'baseline browser headers present');
  } catch (error) {
    record('security headers', false, errorMessage(error));
  }
}

function validateReadiness(payload) {
  if (payload.ok !== true) return fail('not ready');
  if (typeof payload.riverCount !== 'number' || payload.riverCount < 1) return fail('invalid riverCount');
  if (payload.mode === 'one-origin' && payload.staticIndexReady !== true) return fail('static index is not ready');
  return pass(`${payload.mode}, ${payload.riverCount} routes`);
}

function validateHealth(payload) {
  if (payload.ok !== true) return fail('not healthy');
  if (!isObject(payload.cache)) return fail('missing cache telemetry');
  if (!isObject(payload.upstream)) return fail('missing upstream telemetry');
  if (!Array.isArray(payload.upstream.providers)) return fail('missing upstream providers');
  if (typeof payload.upstream.failureRate !== 'number') return fail('missing upstream failureRate');
  return pass(
    `${payload.upstream.requests ?? 0} upstream requests, ${formatPercent(payload.upstream.failureRate)} failures`,
  );
}

function validateSummary(payload) {
  if (!Array.isArray(payload.rivers) || payload.rivers.length < 1) return fail('missing rivers');
  if (payload.riverCount !== payload.rivers.length) return fail('riverCount does not match rivers');
  if (typeof payload.generatedAt !== 'string') return fail('missing generatedAt');
  const first = payload.rivers[0];
  if (typeof first?.river?.slug !== 'string' || typeof first?.score !== 'number') {
    return fail('first route is incomplete');
  }
  return pass(`${payload.riverCount} routes`);
}

function validateWeekend(payload) {
  if (!Array.isArray(payload.rivers)) return fail('missing rivers');
  if (typeof payload.label !== 'string') return fail('missing label');
  if (typeof payload.withheldCount !== 'number') return fail('missing withheldCount');
  return pass(`${payload.rivers.length} shown, ${payload.withheldCount} withheld`);
}

function validateRiverDetail(payload, expectedSlug) {
  if (!isObject(payload.result)) return fail('missing result');
  if (payload.result.river?.slug !== expectedSlug) return fail('route slug mismatch');
  if (!Array.isArray(payload.result.checklist)) return fail('missing checklist');
  if (!isObject(payload.result.liveData)) return fail('missing liveData');
  return pass(`${expectedSlug}, ${payload.result.liveData.overall ?? 'unknown'} data`);
}

async function fetchWithTimeout(url, init) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, redirect: 'follow', signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`invalid JSON: ${text.slice(0, 80)}`);
  }
}

function normalizeBaseUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error('DEPLOYMENT_BASE_URL cannot be empty.');
  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
}

function positiveNumber(value, fallback) {
  const parsed = Number(value ?? fallback);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizePath(value) {
  const normalized = String(value || '').trim();
  if (!normalized) {
    throw new Error('Deployment smoke paths cannot be empty.');
  }
  return normalized.startsWith('/') ? normalized : `/${normalized}`;
}

function formatPercent(value) {
  return `${Math.round(Number(value) * 10_000) / 100}%`;
}

function errorMessage(error) {
  if (error instanceof Error && error.name === 'AbortError') return `timed out after ${timeoutMs}ms`;
  return error instanceof Error ? error.message : 'unknown error';
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function pass(detail) {
  return { ok: true, detail };
}

function fail(detail) {
  return { ok: false, detail };
}

function record(name, ok, detail = '') {
  checks.push({ name, ok, detail });
}
