import { readFile } from 'node:fs/promises';
import { assetOrigin, verifyAssets } from './lib/static-assets.mjs';

const ref = 'paddletoday_legacy_static_assets';
const origin = assetOrigin(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_ASSET_CONTAINER);
const rule = {
  ref, description: 'Keep gallery and map URLs working for existing Paddle Today clients', enabled: true,
  expression: '(http.host eq "paddletoday.com" and (starts_with(http.request.uri.path, "/gallery/") or starts_with(http.request.uri.path, "/data/")))',
  action: 'redirect', action_parameters: { from_value: {
    target_url: { expression: `concat("${origin}/legacy", http.request.uri.path)` },
    status_code: 302, preserve_query_string: true,
  } },
};

async function cloudflare(path, method = 'GET', body) {
  if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ZONE_ID) throw new Error('Cloudflare token and zone ID are required.');
  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}${path}`, {
    method, headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(30000),
  });
  const payload = await response.json();
  if (response.status === 404 && method === 'GET') return null;
  if (!response.ok || !payload.success) throw new Error(`Cloudflare ${method} ${path} failed (${response.status}): ${payload.errors?.map((error) => `${error.code ?? ''} ${error.message}`).join('; ') || 'Unknown API error'}. The token needs Dynamic URL Redirects: Edit on paddletoday.com.`);
  return payload.result;
}

try {
  if (process.argv[2] === 'apply') {
    const ruleset = await cloudflare('/rulesets/phases/http_request_dynamic_redirect/entrypoint');
    const manifest = JSON.parse(await readFile('tmp/static-assets/manifest.json', 'utf8'));
    await verifyAssets({ ...manifest, baseUrl: `${origin}/legacy` }, { cacheControl: 'public, max-age=300' });
    if (!ruleset) await cloudflare('/rulesets', 'POST', { name: 'Redirect rules', kind: 'zone', phase: 'http_request_dynamic_redirect', rules: [rule] });
    else {
      const existing = ruleset.rules?.find((entry) => entry.ref === ref || (
        entry.description === rule.description && entry.expression === rule.expression && entry.action === rule.action
      ));
      // Edit only this rule; preserve all other zone rules and their order.
      // A rule created through the dashboard has a generated ref; retain it.
      await cloudflare(`/rulesets/${ruleset.id}/rules${existing ? `/${existing.id}` : ''}`, existing ? 'PATCH' : 'POST', { ...rule, ref: existing?.ref || ref });
    }
    console.log('Legacy asset redirect configured.');
  } else if (process.argv[2] === 'verify') {
    const manifest = JSON.parse(await readFile('tmp/static-assets/manifest.json', 'utf8'));
    for (const path of ['gallery/fallbacks/river-fallback-wide.jpg', 'data/explore-map-overview.json']) {
      const file = manifest.files.find((entry) => entry.path === path);
      if (!file) throw new Error(`Compatibility probe asset missing: ${path}`);
      const response = await fetch(`https://paddletoday.com/${path}`, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(30000) });
      if (response.status !== 302 || response.headers.get('location') !== `${origin}/legacy/${path}`) {
        throw new Error(`Legacy redirect is not active for ${path}; frontend deployment must wait.`);
      }
      const target = await fetch(response.headers.get('location'), { method: 'HEAD', headers: { Origin: 'https://paddletoday.com' }, signal: AbortSignal.timeout(30000) });
      if (!target.ok || Number(target.headers.get('content-length')) !== file.bytes || target.headers.get('access-control-allow-origin') !== '*') {
        throw new Error(`Legacy asset is not readable: ${path}`);
      }
    }
    console.log('Legacy gallery and geometry URLs redirect to readable Blob assets.');
  } else if (process.argv[2] === 'show') console.log(JSON.stringify(rule, null, 2));
  else throw new Error('Choose apply, verify, or show.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
