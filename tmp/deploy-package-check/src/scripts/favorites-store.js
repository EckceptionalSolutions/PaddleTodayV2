const STORAGE_KEY = 'paddletoday:favorites:v1';
const STORAGE_VERSION = 1;
const CHANGE_EVENT = 'paddletoday:favorites-change';

function storage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function normalizeFavoriteEntry(input) {
  const slug = typeof input?.slug === 'string' ? input.slug.trim() : '';
  if (!slug) {
    return null;
  }

  const name = typeof input?.name === 'string' ? input.name.trim() : '';
  const reach = typeof input?.reach === 'string' ? input.reach.trim() : '';
  const state = typeof input?.state === 'string' ? input.state.trim() : '';
  const region = typeof input?.region === 'string' ? input.region.trim() : '';
  const savedAt = typeof input?.savedAt === 'number' && Number.isFinite(input.savedAt)
    ? input.savedAt
    : Date.now();
  const defaultUrl = `/rivers/${encodeURIComponent(slug)}/`;
  const url = typeof input?.url === 'string' && input.url.trim() ? input.url.trim() : defaultUrl;

  return {
    slug,
    name,
    reach,
    state,
    region,
    url,
    savedAt,
  };
}

function parseFavorites(raw) {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed)
      ? parsed
      : parsed?.version === STORAGE_VERSION && Array.isArray(parsed.items)
        ? parsed.items
        : [];

    const favoritesBySlug = new Map();
    for (const item of items) {
      const normalized = normalizeFavoriteEntry(item);
      if (!normalized) {
        continue;
      }

      const existing = favoritesBySlug.get(normalized.slug);
      if (!existing || normalized.savedAt >= existing.savedAt) {
        favoritesBySlug.set(normalized.slug, normalized);
      }
    }

    return Array.from(favoritesBySlug.values()).sort((left, right) => right.savedAt - left.savedAt);
  } catch {
    return [];
  }
}

function writeFavorites(items) {
  const store = storage();
  if (!store) {
    return [];
  }

  const normalized = items
    .map(normalizeFavoriteEntry)
    .filter(Boolean)
    .sort((left, right) => right.savedAt - left.savedAt);

  try {
    store.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        items: normalized,
      })
    );
  } catch {
    // Ignore quota errors.
  }

  emitFavoritesChange(normalized);
  return normalized;
}

function emitFavoritesChange(favorites) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, {
      detail: {
        favorites,
      },
    })
  );
}

export function readFavorites() {
  const store = storage();
  if (!store) {
    return [];
  }

  return parseFavorites(store.getItem(STORAGE_KEY));
}

export function favoriteCount() {
  return readFavorites().length;
}

export function hasFavorites() {
  return favoriteCount() > 0;
}

export function isFavorite(slug) {
  const normalizedSlug = typeof slug === 'string' ? slug.trim() : '';
  if (!normalizedSlug) {
    return false;
  }

  return readFavorites().some((item) => item.slug === normalizedSlug);
}

export function toggleFavorite(entry) {
  const normalized = normalizeFavoriteEntry(entry);
  if (!normalized) {
    return false;
  }

  const favorites = readFavorites();
  const index = favorites.findIndex((item) => item.slug === normalized.slug);
  if (index >= 0) {
    favorites.splice(index, 1);
    writeFavorites(favorites);
    return false;
  }

  favorites.unshift(normalized);
  writeFavorites(favorites);
  return true;
}

export function subscribeFavorites(listener) {
  if (typeof window === 'undefined' || typeof listener !== 'function') {
    return () => {};
  }

  const handleCustomEvent = () => {
    listener(readFavorites());
  };
  const handleStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      listener(readFavorites());
    }
  };

  window.addEventListener(CHANGE_EVENT, handleCustomEvent);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, handleCustomEvent);
    window.removeEventListener('storage', handleStorage);
  };
}
