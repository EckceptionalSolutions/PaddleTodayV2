// Keep the upstream fixed: clients must never choose where credentials go.
export const API_ORIGIN = 'https://paddletodayapi-h7efgxcfg9h7gne9.centralus-01.azurewebsites.net';
export const PROXY_VERSION = 'paddletoday-api-proxy-v1';

function isPublicRead(request, pathname) {
  return ['GET', 'HEAD'].includes(request.method)
    && !request.headers.has('authorization') && !request.headers.has('cookie')
    && /^\/api\/(?:rivers\/|river-groups\/|explore\/|health(?:\/|$)|trips\/capabilities$)/.test(pathname);
}

/** Stream the original API request without retrying mutations or following redirects. */
export async function proxyApi(request, fetchImpl = fetch) {
  const incoming = new URL(request.url);
  if (incoming.pathname !== '/api' && !incoming.pathname.startsWith('/api/')) {
    return new Response('Not found', { status: 404, headers: { 'cache-control': 'no-store' } });
  }
  const target = new URL(API_ORIGIN);
  target.pathname = incoming.pathname;
  target.search = incoming.search;
  const headers = new Headers(request.headers);
  const connectionHeaders = (headers.get('connection') || '').split(',').map(value => value.trim()).filter(Boolean);
  for (const name of [...connectionHeaders, 'host', 'connection', 'keep-alive', 'proxy-authorization', 'proxy-authenticate',
    'transfer-encoding', 'trailer', 'upgrade', 'forwarded', 'x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto']) headers.delete(name);
  headers.set('x-forwarded-host', incoming.host);
  headers.set('x-forwarded-proto', 'https');
  const clientIp = request.headers.get('cf-connecting-ip');
  if (clientIp) headers.set('x-forwarded-for', clientIp);
  const upstreamRequest = new Request(target, { method: request.method, headers, redirect: 'manual',
    signal: request.signal, ...(!['GET', 'HEAD'].includes(request.method) ? { body: request.body, duplex: 'half' } : {}) });
  let response;
  try {
    // No edge storage of private responses. Existing browser cache directives
    // remain intact for anonymous public river data.
    response = await fetchImpl(upstreamRequest, { redirect: 'manual', cache: 'no-store' });
  } catch {
    return new Response(JSON.stringify({ error: 'upstream_unavailable' }), { status: 502,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-paddletoday-api-proxy': PROXY_VERSION } });
  }
  const outgoing = new Headers(response.headers);
  outgoing.set('x-paddletoday-api-proxy', PROXY_VERSION);
  if (!isPublicRead(request, incoming.pathname) || outgoing.has('set-cookie')) {
    outgoing.set('cache-control', 'private, no-store');
    outgoing.set('cdn-cache-control', 'no-store');
    outgoing.set('cloudflare-cdn-cache-control', 'no-store');
    outgoing.set('pragma', 'no-cache');
    outgoing.delete('expires');
  }
  const location = outgoing.get('location');
  if (location) {
    const redirect = new URL(location, API_ORIGIN);
    if (redirect.origin === API_ORIGIN && /^https?:\/\//i.test(location)) {
      outgoing.set('location', incoming.origin + redirect.pathname + redirect.search + redirect.hash);
    }
  }
  return new Response(request.method === 'HEAD' ? null : response.body,
    { status: response.status, statusText: response.statusText, headers: outgoing });
}

