import { request } from 'node:https';
import { lookup } from 'node:dns';

// Verify the deployed HTTP behavior; inspecting build configuration alone is insufficient.
const origin = new URL(process.env.DEPLOYMENT_BASE_URL || 'https://paddletoday.com').origin;
const originHost = process.env.DEPLOYMENT_ORIGIN_HOST;
const nonce = Date.now().toString(36);
const cases = [
  { path: '/', status: 200 },
  { path: '/rivers/little-miami-river-kelley-milford/', status: 200 },
  { path: '/rivers/pine-river-lincoln-pine-river-park-county-w/', status: 200 },
  {
    path: '/rivers/juniata-river-newport-green-valley/',
    status: 301,
    location: '/rivers/juniata-river-greenwood-amity-hall/',
  },
  {
    path: '/rivers/barren-river-tailwater-vpa-3/',
    status: 301,
    location: '/rivers/barren-river-tailwater-martinsville/',
  },
  {
    path: '/rivers/minnehaha-creek-grays-bay-knollwood/',
    status: 301,
    location: '/guides/minnehaha-creek-paddling/',
  },
  { path: '/guides/minnehaha-creek-paddling/', status: 200 },
  { path: `/rivers/search-check-missing-${nonce}/`, status: 404 },
];
let failures = 0;
for (const { path, status: expected, location: expectedLocation } of cases) {
  try {
    const response = await readPage(`${origin}${path}?search-serving-check=${nonce}`);
    const html = response.html;
    const location = response.location ? new URL(response.location, origin).pathname : undefined;
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
      .find(([tag]) => /\brel=["']canonical["']/i.test(tag))?.[0]
      .match(/\bhref=["']([^"']*)["']/i)?.[1];
    const ok = response.status === expected
      && (expected !== 200 || canonical === `${origin}${path}`)
      && (expected !== 404 || !canonical || canonical !== `${origin}/`)
      && (!expectedLocation || location === expectedLocation);
    console.log(`${ok ? 'ok' : 'FAIL'} ${path}: HTTP ${response.status}, canonical ${canonical || '(none)'}, location ${location || '(none)'}`);
    if (!ok) failures++;
  } catch (error) { console.error(`FAIL ${path}: ${error.message}`); failures++; }
}
if (failures) process.exitCode = 1;

async function readPage(url) {
  if (!originHost) {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    return { status: response.status, location: response.headers.get('location'), html: await response.text() };
  }
  // Hosted CI runners can be blocked at the public CDN. Resolve the Azure
  // hostname directly while retaining the public Host, SNI, and TLS validation.
  return new Promise((resolve, reject) => {
    const req = request(url, {
      lookup: (_hostname, options, callback) => lookup(originHost, options, callback),
      signal: AbortSignal.timeout(30000),
    }, response => {
      response.setEncoding('utf8');
      let html = '';
      response.on('data', chunk => { html += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, location: response.headers.location, html }));
      response.on('error', reject);
    });
    req.on('error', reject);
    req.end();
  });
}
