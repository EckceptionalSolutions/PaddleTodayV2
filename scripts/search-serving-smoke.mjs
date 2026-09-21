import { request } from 'node:https';
import { lookup } from 'node:dns';

// Verify the deployed HTTP behavior; inspecting build configuration alone is insufficient.
const origin = new URL(process.env.DEPLOYMENT_BASE_URL || 'https://paddletoday.com').origin;
const originHost = process.env.DEPLOYMENT_ORIGIN_HOST;
const nonce = Date.now().toString(36);
const cases = [
  ['/', 200],
  ['/rivers/little-miami-river-kelley-milford/', 200],
  ['/rivers/pine-river-lincoln-pine-river-park-county-w/', 404],
  ['/rivers/juniata-river-newport-green-valley/', 404],
  [`/rivers/search-check-missing-${nonce}/`, 404],
];
let failures = 0;
for (const [path, expected] of cases) {
  try {
    const response = await readPage(`${origin}${path}?search-serving-check=${nonce}`);
    const html = response.html;
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
      .find(([tag]) => /\brel=["']canonical["']/i.test(tag))?.[0]
      .match(/\bhref=["']([^"']*)["']/i)?.[1];
    const ok = response.status === expected
      && (expected !== 200 || canonical === `${origin}${path}`)
      && (expected !== 404 || !canonical || canonical !== `${origin}/`);
    console.log(`${ok ? 'ok' : 'FAIL'} ${path}: HTTP ${response.status}, canonical ${canonical || '(none)'}`);
    if (!ok) failures++;
  } catch (error) { console.error(`FAIL ${path}: ${error.message}`); failures++; }
}
if (failures) process.exitCode = 1;

async function readPage(url) {
  if (!originHost) {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    return { status: response.status, html: await response.text() };
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
      response.on('end', () => resolve({ status: response.statusCode, html }));
      response.on('error', reject);
    });
    req.on('error', reject);
    req.end();
  });
}
