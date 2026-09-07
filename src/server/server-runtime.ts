export function readArgValue(flag: string): string | null {
  const args = process.argv.slice(2);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] ?? null : null;
}

export function parseRequestUrl(target: string | undefined, host: string | undefined): URL {
  if (host) {
    if (/[\s\/?#@]/.test(host)) throw new Error('Invalid Host header.');
    const parsedHost = new URL(`http://${host}`);
    if (!parsedHost.hostname || parsedHost.pathname !== '/') throw new Error('Invalid Host header.');
  }
  // Routing uses only path/query; a client-supplied Host must not affect it.
  const url = new URL(target || '/', 'http://paddletoday.internal');
  // Validate escapes before route-specific decoding, without changing the path.
  decodeURIComponent(url.pathname);
  return url;
}

export function shouldLogRequest(pathname: string, statusCode: number): boolean {
  return pathname === '/' || pathname.startsWith('/api/') || pathname.startsWith('/health') || statusCode >= 400;
}

export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_resolve, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`${label} timed out after ${timeoutMs}ms`));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export function createRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
