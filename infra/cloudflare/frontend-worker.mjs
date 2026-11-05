import { proxyApi } from './api-proxy.mjs';

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api' || path.startsWith('/api/')) {
      const response = await proxyApi(request);
      if (env.FRONTEND_CANARY !== '1') return response;
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    // Asset hits normally bypass this handler. Missing frontend routes still
    // use the independent asset binding and retain the site's 404 behavior.
    return env.ASSETS.fetch(request);
  },
};
