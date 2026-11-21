const authHosts = new Set(['paddletoday-9933a.firebaseapp.com', 'paddletoday-9933a.web.app']);

/** Firebase Hosting wraps the action URL in /__/auth/links?link=... . */
export function incomingEmailLink(value: string): string | null {
  try {
    let url = new URL(value);
    if (url.protocol !== 'https:' || !authHosts.has(url.host) || url.username || url.password) return null;
    if (url.pathname === '/__/auth/links') {
      url = new URL(url.searchParams.get('link') ?? '');
      if (url.protocol !== 'https:' || !authHosts.has(url.host) || url.username || url.password) return null;
    }
    if (url.pathname !== '/__/auth/action' || url.searchParams.get('mode') !== 'signIn' ||
        !url.searchParams.get('oobCode') || !url.searchParams.get('apiKey')) return null;
    return url.href;
  } catch {
    return null;
  }
}
