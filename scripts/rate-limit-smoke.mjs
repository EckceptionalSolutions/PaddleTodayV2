const baseUrl = normalizeBaseUrl(process.env.RATE_LIMIT_BASE_URL ?? 'http://127.0.0.1:4322');
const expectedMax = positiveInteger(process.env.RATE_LIMIT_EXPECTED_MAX, 5);
const timeoutMs = positiveInteger(process.env.RATE_LIMIT_SMOKE_TIMEOUT_MS, 10_000);
const target = new URL('/api/alerts', baseUrl);

if (isPublicProduction(target) && process.env.RATE_LIMIT_ALLOW_PRODUCTION !== 'true') {
  throw new Error(
    'Refusing to exercise a production rate limit. Use a staging origin, or set RATE_LIMIT_ALLOW_PRODUCTION=true intentionally.'
  );
}

for (let attempt = 1; attempt <= expectedMax + 1; attempt += 1) {
  const response = await fetchWithTimeout(target, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      company: 'rate-limit-smoke',
      email: 'rate-limit-smoke@example.com',
      riverSlug: 'rate-limit-smoke',
      threshold: 'good',
    }),
  });
  const payload = await response.json().catch(() => null);

  if (attempt <= expectedMax) {
    if (response.status !== 202 || payload?.stored !== false) {
      throw new Error(
        `Attempt ${attempt} should be accepted as a honeypot no-op, received HTTP ${response.status}.`
      );
    }
    continue;
  }

  assertHeader(response, 'ratelimit-limit', String(expectedMax));
  assertHeader(response, 'ratelimit-remaining', '0');
  assertPositiveHeader(response, 'ratelimit-reset');
  assertPositiveHeader(response, 'retry-after');
  if (response.status !== 429 || payload?.error !== 'too_many_requests') {
    throw new Error(`Attempt ${attempt} should receive the 429 contract, received HTTP ${response.status}.`);
  }
}

console.log(`Rate-limit smoke passed for ${target.origin}: ${expectedMax} accepted no-ops, then a contract-valid 429.`);

async function fetchWithTimeout(url, init) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function assertHeader(response, name, expected) {
  const actual = response.headers.get(name);
  if (actual !== expected) {
    throw new Error(`Expected ${name}: ${expected}, received ${actual ?? 'no header'}.`);
  }
}

function assertPositiveHeader(response, name) {
  const value = Number(response.headers.get(name));
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Expected a positive ${name} response header.`);
  }
}

function normalizeBaseUrl(value) {
  const url = new URL(value);
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url;
}

function positiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function isPublicProduction(url) {
  return url.hostname === 'paddletoday.com' || url.hostname === 'www.paddletoday.com';
}
