export type FetchJsonDecoder<T> = (value: unknown) => T;

type FetchJsonOptions<T = unknown> = {
  timeoutMs?: number;
  retries?: number;
  headers?: Record<string, string>;
  decoder?: FetchJsonDecoder<T>;
};

export async function fetchJson<T>(url: string, options: FetchJsonOptions<T> & { decoder: FetchJsonDecoder<T> }): Promise<T>;
export async function fetchJson<T = unknown>(url: string, options?: FetchJsonOptions<T>): Promise<T>;
export async function fetchJson<T = unknown>(url: string, options: FetchJsonOptions<T> = {}): Promise<T> {
  const timeoutMs = options.timeoutMs ?? 10_000;
  const retries = Math.max(1, options.retries ?? 2);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          accept: 'application/json',
          ...(options.headers ?? {}),
        },
      });

      if ((response.status === 429 || response.status >= 500) && attempt < retries) {
        await backoff(attempt);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (!contentType.includes('json')) {
        throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
      }

      const body: unknown = await response.json();
      return decodeJson<T>(body, options.decoder);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await backoff(attempt);
        continue;
      }
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError ?? new Error(`Request failed for ${url}`);
}

async function backoff(attempt: number): Promise<void> {
  const delayMs = 250 * Math.pow(2, Math.max(0, attempt - 1));
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}

function decodeJson<T>(value: unknown, decoder?: FetchJsonDecoder<T>): T {
  if (decoder) {
    return decoder(value);
  }

  return value as T;
}
