import { staticAssetUrl } from '../lib/static-asset-url.js';

const STORAGE_KEY = 'paddletoday:route-photo-previews:v1';
const MAX_ENTRIES = 32;
const MAX_STORAGE_CHARACTERS = 32 * 1024;
const FRESH_MS = 24 * 60 * 60 * 1000;
const OFFLINE_MS = 7 * FRESH_MS;

function validPhoto(photo) {
  return photo && typeof photo === 'object'
    && ['id', 'src', 'alt', 'caption'].every(key => typeof photo[key] === 'string' && photo[key].length <= 5000)
    && ['credit', 'takenLabel'].every(key => photo[key] === undefined || (typeof photo[key] === 'string' && photo[key].length <= 5000))
    && typeof photo.isPlaceholder === 'boolean' && ['route', 'river', 'placeholder'].includes(photo.sourceKind);
}

function browserStorage() { try { return globalThis.localStorage; } catch { return undefined; } }

/** Cache only recently displayed previews; storage failures never prevent board rendering. */
export function createRoutePhotoPreviewLoader({ fetchImpl = globalThis.fetch, storage = browserStorage(), now = Date.now, timeoutMs = 5000 } = {}) {
  const cache = new Map();
  const pending = new Map();
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (raw && raw.length <= MAX_STORAGE_CHARACTERS) {
      const entries = JSON.parse(raw);
      if (Array.isArray(entries)) for (const row of entries.slice(-MAX_ENTRIES)) {
        if (Array.isArray(row) && typeof row[0] === 'string' && row[0].length <= 256
          && row[1] && Number.isFinite(row[1].fetchedAt) && row[1].fetchedAt <= now()
          && row[1].fetchedAt > now() - OFFLINE_MS && validPhoto(row[1].photo)) cache.set(...row);
      }
    }
  } catch { /* Corrupt or unavailable local storage is optional. */ }

  function trim() {
    for (const [slug, entry] of cache) if (entry.fetchedAt <= now() - OFFLINE_MS) cache.delete(slug);
    while (cache.size > MAX_ENTRIES) cache.delete(cache.keys().next().value);
    let json = JSON.stringify([...cache]);
    while (json.length > MAX_STORAGE_CHARACTERS && cache.size) { cache.delete(cache.keys().next().value); json = JSON.stringify([...cache]); }
    try { storage?.setItem(STORAGE_KEY, json); } catch { /* Ignore blocked storage and quota exhaustion. */ }
  }

  return async function load(slug) {
    if (typeof slug !== 'string' || slug.length > 256 || !/^[a-z0-9-]+$/.test(slug)) return null;
    const cached = cache.get(slug);
    if (cached && cached.fetchedAt > now() - FRESH_MS) {
      cache.delete(slug); cache.set(slug, cached);
      return { ...cached.photo, src: staticAssetUrl(cached.photo.src) };
    }
    if (pending.has(slug)) return pending.get(slug);
    const loading = (async () => {
      const abort = new AbortController();
      const timer = setTimeout(() => abort.abort(), timeoutMs);
      try {
        const response = await fetchImpl(`/api/rivers/${encodeURIComponent(slug)}/preview-photo.json`, { signal: abort.signal, headers: { accept: 'application/json' } });
        if (!response.ok) throw new Error('Photo preview unavailable');
        const payload = await response.json();
        if (payload.routeId !== slug || !validPhoto(payload.photo)) throw new Error('Invalid photo preview');
        // Copy just the defined public fields, rather than retaining arbitrary response metadata.
        const photo = Object.fromEntries(['id', 'src', 'alt', 'caption', 'credit', 'takenLabel', 'isPlaceholder', 'sourceKind']
          .filter(key => payload.photo[key] !== undefined).map(key => [key, payload.photo[key]]));
        cache.delete(slug); cache.set(slug, { photo, fetchedAt: now() }); trim();
        return { ...photo, src: staticAssetUrl(photo.src) };
      } catch {
        return cached && cached.fetchedAt > now() - OFFLINE_MS
          ? { ...cached.photo, src: staticAssetUrl(cached.photo.src) } : null;
      } finally { clearTimeout(timer); }
    })().finally(() => pending.delete(slug));
    pending.set(slug, loading);
    return loading;
  };
}

const loadPreview = createRoutePhotoPreviewLoader();

/** Each board has its own generation so delayed responses cannot overwrite another selection. */
export function createRoutePhotoPreviewController(load = loadPreview) {
  let generation = 0;
  return {
    cancel() { generation++; },
    async update(slug, apply) {
      const request = ++generation;
      const photo = await load(slug);
      if (request === generation) apply(photo);
    },
  };
}
