/** Map verified website route links without changing custom-scheme/internal links. */
export function incomingRouteLink(path: string): string {
  try {
    const url = new URL(path, 'https://paddletoday.com');
    if (url.protocol !== 'https:' || url.host !== 'paddletoday.com') return path;
    if (/^\/trips\/?$/.test(url.pathname)) {
      const query = new URLSearchParams();
      for (const key of ['id', 'invite', 'view']) {
        const value = url.searchParams.get(key) || new URLSearchParams(url.hash.slice(1)).get(key);
        if (value && /^[a-zA-Z0-9_-]{16,128}$/.test(value)) query.set(key, value);
      }
      return '/trips?' + query.toString();
    }
    const match = /^\/rivers\/([a-z0-9-]+)\/?$/.exec(url.pathname);
    if (!match) return path;
    url.searchParams.delete('openApp');
    const query = url.searchParams.toString();
    return `/river/${match[1]}${query ? `?${query}` : ''}${url.hash}`;
  } catch {
    return path;
  }
}
