const baseUrl = normalizeBaseUrl(process.env.MOBILE_API_BASE_URL ?? 'https://paddletoday.com');
const timeoutMs = Number(process.env.MOBILE_API_TIMEOUT_MS ?? 12000);

const checks = [];
const summary = await checkJson('summary board', '/api/rivers/summary.json', validateSummary);
await checkJson('weekend board', '/api/weekend/summary.json', validateWeekend);

const firstSlug = summary?.rivers?.[0]?.river?.slug;
if (firstSlug) {
  await checkJson('river detail', `/api/rivers/${encodeURIComponent(firstSlug)}.json`, validateRiverDetail);
  await checkJson('river history', `/api/rivers/${encodeURIComponent(firstSlug)}/history.json?days=7`, validateRiverHistory);
  await checkJson('route community', `/api/rivers/${encodeURIComponent(firstSlug)}/community.json`, validateRouteCommunity);
} else {
  record('river-dependent endpoints', false, 'summary board did not include a route slug');
}

await checkOptions('alerts endpoint accepts preflight', '/api/alerts');
await checkOptions('route reports endpoint accepts preflight', '/api/route-photo-submissions');
await checkOptions('river request endpoint accepts preflight', '/api/river-request');

for (const check of checks) {
  const marker = check.ok ? 'ok' : 'fail';
  console.log(`${marker} - ${check.name}${check.detail ? ` (${check.detail})` : ''}`);
}

const failed = checks.filter((check) => !check.ok);
if (failed.length > 0) {
  console.error(`\n${failed.length} mobile API smoke check${failed.length === 1 ? '' : 's'} failed for ${baseUrl}.`);
  process.exit(1);
}

console.log(`\n${checks.length} mobile API smoke checks passed for ${baseUrl}.`);

async function checkJson(name, path, validate) {
  try {
    const response = await fetchWithTimeout(new URL(path, baseUrl));
    const text = await response.text();
    const payload = parseJson(text);

    if (!response.ok) {
      record(name, false, `HTTP ${response.status}`);
      return null;
    }

    const validation = validate(payload);
    record(name, validation.ok, validation.detail);
    return validation.ok ? payload : null;
  } catch (error) {
    record(name, false, error instanceof Error ? error.message : 'unknown error');
    return null;
  }
}

async function checkOptions(name, path) {
  try {
    const response = await fetchWithTimeout(new URL(path, baseUrl), { method: 'OPTIONS' });
    record(name, response.ok || response.status === 204, `HTTP ${response.status}`);
  } catch (error) {
    record(name, false, error instanceof Error ? error.message : 'unknown error');
  }
}

function validateSummary(payload) {
  if (!isObject(payload) || !Array.isArray(payload.rivers)) return fail('missing rivers array');
  if (payload.rivers.length === 0) return fail('empty rivers array');
  const first = payload.rivers[0];
  if (typeof first?.river?.slug !== 'string') return fail('first river missing slug');
  if (typeof first?.score !== 'number') return fail('first river missing score');
  return pass(`${payload.rivers.length} rivers`);
}

function validateWeekend(payload) {
  if (!isObject(payload) || !Array.isArray(payload.rivers)) return fail('missing rivers array');
  if (typeof payload.label !== 'string') return fail('missing label');
  return pass(`${payload.rivers.length} rivers`);
}

function validateRiverDetail(payload) {
  if (!isObject(payload) || !isObject(payload.result)) return fail('missing result');
  if (typeof payload.result.river?.slug !== 'string') return fail('missing result river slug');
  if (!Array.isArray(payload.result.checklist)) return fail('missing checklist');
  return pass(payload.result.river.slug);
}

function validateRiverHistory(payload) {
  if (!isObject(payload) || !isObject(payload.result)) return fail('missing result');
  if (!Array.isArray(payload.result.days)) return fail('missing days');
  if (!Array.isArray(payload.result.todayHourly)) return fail('missing todayHourly');
  return pass(`${payload.result.days.length} days`);
}

function validateRouteCommunity(payload) {
  if (!isObject(payload)) return fail('missing payload');
  if (!Array.isArray(payload.photos)) return fail('missing photos');
  if (!Array.isArray(payload.reports)) return fail('missing reports');
  return pass(`${payload.photos.length} photos, ${payload.reports.length} reports`);
}

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      headers: {
        accept: 'application/json',
        origin: 'https://paddletoday.com',
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    });
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
  if (!trimmed) throw new Error('MOBILE_API_BASE_URL cannot be empty.');
  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
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
