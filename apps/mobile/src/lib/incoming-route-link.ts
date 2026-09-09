/** Map verified website route links without changing custom-scheme/internal links. */
export function incomingRouteLink(path: string): string {
  try {
    const url = new URL(path, 'https://paddletoday.com');
    if (url.protocol !== 'https:' || url.host !== 'paddletoday.com') return path;
    const match = /^\/rivers\/([a-z0-9-]+)\/?$/.exec(url.pathname);
    if (!match) return path;
    url.searchParams.delete('openApp');
    const query = url.searchParams.toString();
    return `/river/${match[1]}${query ? `?${query}` : ''}${url.hash}`;
  } catch {
    return path;
  }
}
