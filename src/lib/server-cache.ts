type CacheEntry<T> = {
  value: T;
  expiresAt: number;
  staleUntil: number;
};

type CacheOptions<T> = {
  key: string;
  ttlMs: number;
  staleWhileErrorMs?: number;
  load: () => Promise<T>;
};

const globalCache = globalThis as typeof globalThis & {
  __canoeAdventuresCache?: Map<string, CacheEntry<unknown>>;
  __canoeAdventuresInflight?: Map<string, Promise<unknown>>;
};

const cache = globalCache.__canoeAdventuresCache ??= new Map<string, CacheEntry<unknown>>();
const inflight = globalCache.__canoeAdventuresInflight ??= new Map<string, Promise<unknown>>();
let cacheHits = 0;
let cacheMisses = 0;
let staleHits = 0;
let loadErrors = 0;

export async function remember<T>(options: CacheOptions<T>): Promise<T> {
  const now = Date.now();
  const staleWhileErrorMs = options.staleWhileErrorMs ?? options.ttlMs * 3;
  const cached = cache.get(options.key) as CacheEntry<T> | undefined;

  if (cached && cached.expiresAt > now) {
    cacheHits += 1;
    return cached.value;
  }

  cacheMisses += 1;

  const inFlight = inflight.get(options.key) as Promise<T> | undefined;
  if (inFlight) {
    return inFlight;
  }

  const loading = options
    .load()
    .then((value) => {
      cache.set(options.key, {
        value,
        expiresAt: now + options.ttlMs,
        staleUntil: now + options.ttlMs + staleWhileErrorMs,
      });
      return value;
    })
    .catch((error) => {
      const stale = cache.get(options.key) as CacheEntry<T> | undefined;
      if (stale && stale.staleUntil > Date.now()) {
        staleHits += 1;
        return stale.value;
      }
      loadErrors += 1;
      throw error;
    })
    .finally(() => {
      inflight.delete(options.key);
    });

  inflight.set(options.key, loading);
  return loading;
}

export function getCacheStats() {
  return {
    entries: cache.size,
    inflight: inflight.size,
    hits: cacheHits,
    misses: cacheMisses,
    staleHits,
    loadErrors,
  };
}
