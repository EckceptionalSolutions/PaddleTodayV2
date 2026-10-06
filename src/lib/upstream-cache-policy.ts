const MAX_UPSTREAM_CACHE_ENTRIES = 20_000;

/** Fit the catalog's distinct provider keys while retaining a configurable memory ceiling. */
export function upstreamCacheLimit(keyCount: number, configured?: string): number {
  const parsed = Number(configured);
  const requested = configured?.trim() && Number.isInteger(parsed) && parsed > 0
    ? parsed : Math.max(256, keyCount);
  return Math.min(MAX_UPSTREAM_CACHE_ENTRIES, requested);
}
