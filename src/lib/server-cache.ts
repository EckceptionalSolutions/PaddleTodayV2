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
  maxEntries?: number;
  maxEntriesPrefix?: string;
  namespace?: string;
};

type CacheBucket = {
  cache: Map<string, CacheEntry<unknown>>;
  inflight: Map<string, Promise<unknown>>;
  generation: number;
};
const globalCache = globalThis as typeof globalThis & { __canoeCacheBuckets?: Map<string, CacheBucket> };
const buckets = globalCache.__canoeCacheBuckets ??= new Map<string, CacheBucket>();
let cacheHits = 0;
let cacheMisses = 0;
let staleHits = 0;
let loadErrors = 0;

export async function remember<T>(options: CacheOptions<T>): Promise<T> {
  const namespace = options.namespace ?? options.maxEntriesPrefix ?? 'default';
  let bucket = buckets.get(namespace);
  if (!bucket) {
    bucket = { cache: new Map(), inflight: new Map(), generation: 0 };
    buckets.set(namespace, bucket);
  }
  const { cache, inflight } = bucket;
  const now = Date.now();
  const staleWhileErrorMs = options.staleWhileErrorMs ?? options.ttlMs * 3;
  const cached = cache.get(options.key) as CacheEntry<T> | undefined;

  if (cached && cached.expiresAt > now) {
    cacheHits += 1;
    cache.delete(options.key);
    cache.set(options.key, cached);
    return cached.value;
  }

  cacheMisses += 1;

  const inFlight = inflight.get(options.key) as Promise<T> | undefined;
  if (inFlight) {
    return inFlight;
  }

  const generation = bucket.generation;
  const loading = options
    .load()
    .then((value) => {
      if (bucket.generation !== generation) return value;
      const loadedAt = Date.now();
      cache.delete(options.key);
      cache.set(options.key, {
        value,
        expiresAt: loadedAt + options.ttlMs,
        staleUntil: loadedAt + options.ttlMs + staleWhileErrorMs,
      });
      pruneCache(cache, options.maxEntries ?? 256, loadedAt);
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
      if (inflight.get(options.key) === loading) inflight.delete(options.key);
    });

  inflight.set(options.key, loading);
  return loading;
}

/** Remove one cached value or a group of values before a published generation is read. */
export function forgetCache(keyOrPrefix: string, options: { prefix?: boolean } = {}) {
  for (const bucket of buckets.values()) {
    const matches = (key: string) => options.prefix ? key.startsWith(keyOrPrefix) : key === keyOrPrefix;
    let changed = false;
    for (const key of bucket.cache.keys()) {
      if (matches(key)) { bucket.cache.delete(key); changed = true; }
    }
    for (const key of bucket.inflight.keys()) {
      if (matches(key)) { bucket.inflight.delete(key); changed = true; }
    }
    if (changed) bucket.generation++;
  }
}

function pruneCache(cache: Map<string, CacheEntry<unknown>>, maxEntries: number, now: number) {
  for (const [key, entry] of cache) {
    if (entry.staleUntil <= now) cache.delete(key);
  }
  const limit = Number.isFinite(maxEntries) ? Math.max(1, Math.floor(maxEntries)) : 256;
  while (cache.size > limit) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === undefined) break;
    cache.delete(oldestKey);
  }
}

export function getCacheStats() {
  const namespaces = Object.fromEntries([...buckets].map(([name, bucket]) => [name, {
    entries: bucket.cache.size, inflight: bucket.inflight.size,
  }]));
  return {
    entries: Object.values(namespaces).reduce((sum, value) => sum + value.entries, 0),
    inflight: Object.values(namespaces).reduce((sum, value) => sum + value.inflight, 0),
    namespaces,
    hits: cacheHits,
    misses: cacheMisses,
    staleHits,
    loadErrors,
  };
}
