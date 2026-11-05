import { proxyApi } from './api-proxy.mjs';

export default {
  fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api' || path.startsWith('/api/')) return proxyApi(request);
    // Asset hits normally bypass this handler. Missing frontend routes still
    // use the independent asset binding and retain the site's 404 behavior.
    return env.ASSETS.fetch(request);
  },
};
