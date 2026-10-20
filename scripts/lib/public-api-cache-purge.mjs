const routeSlug = '[a-z0-9]+(?:-[a-z0-9]+)*';
const publicPath = new RegExp(`^/api/(?:river-groups/${routeSlug}\\.json|rivers/${routeSlug}(?:\\.json|/(?:geometry\\.json|trip\\.(?:gpx|ics))))$`);

export function publicApiCacheUrls(input) {
  if (typeof input !== 'string' || input.length > 4096) throw new Error('Supply up to ten public route API paths.');
  const paths = input.split(/\r?\n/).map(path => path.trim()).filter(Boolean);
  if (!paths.length || paths.length > 10 || paths.some(path => !publicPath.test(path))) {
    throw new Error('Only up to ten exact public river/river-group API paths are allowed, without queries or fragments.');
  }
  return [...new Set(paths)].map(path => `https://paddletoday.com${path}`);
}

export async function purgePublicApiCache({ paths, token, zoneId, fetchImpl = fetch }) {
  const files = publicApiCacheUrls(paths);
  if (!token?.trim() || !/^[a-zA-Z0-9_-]{1,32}$/.test(zoneId?.trim() ?? '')) throw new Error('Cloudflare API token and zone ID must be configured.');
  const response = await fetchImpl(`https://api.cloudflare.com/client/v4/zones/${encodeURIComponent(zoneId.trim())}/purge_cache`, {
    method: 'POST', headers: { authorization: `Bearer ${token.trim()}`, 'content-type': 'application/json' },
    body: JSON.stringify({ files }), signal: AbortSignal.timeout(30000),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.success !== true) {
    const codes = (payload?.errors ?? []).map(error => error.code).filter(code => typeof code === 'number');
    // Do not print credentials, response bodies or reflected error messages.
    throw new Error(`Cloudflare cache purge was not accepted (HTTP ${response.status}; codes: ${codes.join(',') || 'unavailable'}).`);
  }
  // Acceptance is not proof of delivery. Verify the ordinary public URLs next.
  return { status: 'purge-accepted', files, requestId: payload.result?.id ?? null };
}
