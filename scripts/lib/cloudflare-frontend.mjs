import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Convert only understood SWA controls; unsupported routing must fail closed. */
export function translateStaticConfig(config) {
  assert.ok(config && !config.navigationFallback, 'SPA fallback is not supported for this static site.');
  assert.ok(Object.keys(config).every(key => ['routes', 'globalHeaders', 'responseOverrides'].includes(key)), 'Unknown SWA setting.');
  assert.ok(!config.responseOverrides || Object.keys(config.responseOverrides).every(key => key === '404'), 'Unknown response override.');
  if (config.responseOverrides?.['404']) {
    const override = config.responseOverrides['404'];
    assert.ok(Object.keys(override).every(key => ['rewrite', 'statusCode'].includes(key)));
    assert.equal(override.rewrite, '/404.html'); assert.ok(override.statusCode === undefined || override.statusCode === 404);
  }
  const redirects = [], headers = [];
  const headerBlock = (route, values) => {
    assert.ok(!/[\r\n]/.test(route)); const lines = [route];
    for (const [key, value] of Object.entries(values)) {
      assert.match(key, /^[a-z0-9-]+$/i); assert.equal(typeof value, 'string');
      assert.ok(!/[\r\n]/.test(value), 'Unsafe header value.'); lines.push(`  ${key}: ${value}`);
    }
    headers.push(lines.join('\n'));
  };
  headerBlock('/*', config.globalHeaders || {});
  const sources = new Set();
  const explicit = new Set((config.routes || []).map(route => route.route));
  for (const route of config.routes || []) {
    assert.ok(Object.keys(route).every(key => ['route', 'redirect', 'rewrite', 'statusCode', 'headers'].includes(key)), 'Unsupported SWA route policy.');
    assert.match(route.route || '', /^\/[^\s]*$/); assert.ok(!sources.has(route.route), 'Duplicate route.'); sources.add(route.route);
    if (route.headers) headerBlock(route.route, route.headers);
    if (route.redirect) {
      assert.match(route.redirect, /^(?:\/[^\s]*|https:\/\/[^\s]+)$/);
      assert.ok([301, 302, 303, 307, 308].includes(route.statusCode || 302));
      redirects.push({ dynamic: route.route.includes('*') || /:[a-z]/i.test(route.route),
        line: `${route.route} ${route.redirect.replaceAll('{*path}', ':splat')} ${route.statusCode || 302}` });
      if (!/[.*:]/.test(route.route) && !route.route.endsWith('/') && !explicit.has(route.route + '/')) {
        redirects.push({ dynamic: false, line: `${route.route}/ ${route.redirect} ${route.statusCode || 302}` });
      }
    } else if (route.rewrite) {
      // SWA's explicit clean-path -> index.html rewrites are already served by
      // Workers Assets HTML handling. Keep exact path semantics and all files.
      assert.equal(route.rewrite, `${route.route}/index.html`, 'Non-filesystem rewrite needs a separate migration.');
    }
  }
  assert.ok(redirects.filter(r => !r.dynamic).length <= 2000 && redirects.filter(r => r.dynamic).length <= 100, 'Redirect limit exceeded.');
  assert.ok(redirects.every(r => r.line.length <= 1000), 'Redirect line limit exceeded.');
  return { redirects: redirects.filter(r => !r.dynamic).concat(redirects.filter(r => r.dynamic)).map(r => r.line).join('\n') + '\n',
    headers: headers.join('\n\n') + '\n', redirectCount: redirects.length };
}

export async function prepareCloudflareFrontend(directory, configPath, revision = null) {
  assert.ok(revision === null || /^[a-f0-9]{40}$/.test(revision), 'Expected a full frontend source revision.');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  const translated = translateStaticConfig(config);
  await readFile(join(directory, '404.html')); // Require an actual 404 page; never substitute index.html.
  const legacy = '/gallery/* https://paddletoday.blob.core.windows.net/web-assets/legacy/gallery/:splat 302\n'
    + '/data/* https://paddletoday.blob.core.windows.net/web-assets/legacy/data/:splat 302\n';
  assert.ok(!(config.routes || []).some(route => ['/gallery/*', '/data/*'].includes(route.route)), 'Legacy asset redirects require review.');
  await writeFile(join(directory, '_redirects'), translated.redirects + legacy);
  await writeFile(join(directory, '_headers'), translated.headers);
  await writeFile(join(directory, '.assetsignore'), 'staticwebapp.config.json\n');
  await mkdir(join(directory, '.well-known'), { recursive: true });
  await writeFile(join(directory, '.well-known/paddletoday-frontend-release.json'),
    JSON.stringify({ format: 'PaddleTodayFrontendRelease', sourceRevision: revision }) + '\n');
  return { redirectCount: translated.redirectCount + 2, apiPaths: ['/api', '/api/*'], spaFallback: false };
}
