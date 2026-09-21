// Verify the deployed HTTP behavior; inspecting build configuration alone is insufficient.
const origin = new URL(process.env.DEPLOYMENT_BASE_URL || 'https://paddletoday.com').origin;
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
    const response = await fetch(`${origin}${path}?search-serving-check=${nonce}`, {
      redirect: 'manual', signal: AbortSignal.timeout(30000),
    });
    const html = await response.text();
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
