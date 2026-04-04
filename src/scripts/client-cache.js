const CACHE_PREFIX = 'paddletoday:api-cache:';
const CACHE_VERSION = 1;

function storage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readCachedPayload(key) {
  const store = storage();
  if (!store) {
    return null;
  }

  try {
    const raw = store.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      parsed.version !== CACHE_VERSION ||
      typeof parsed.fetchedAt !== 'number' ||
      !('payload' in parsed)
    ) {
      return null;
    }

    return {
      fetchedAt: parsed.fetchedAt,
      payload: parsed.payload,
    };
  } catch {
    return null;
  }
}

export function writeCachedPayload(key, payload) {
  const store = storage();
  if (!store) {
    return;
  }

  try {
    store.setItem(
      `${CACHE_PREFIX}${key}`,
      JSON.stringify({
        version: CACHE_VERSION,
        fetchedAt: Date.now(),
        payload,
      })
    );
  } catch {
    // Ignore quota and serialization failures.
  }
}

export function freshnessLabel(fetchedAt) {
  if (typeof fetchedAt !== 'number' || !Number.isFinite(fetchedAt)) {
    return 'Updated recently';
  }

  const elapsedMs = Math.max(0, Date.now() - fetchedAt);
  const elapsedMinutes = Math.round(elapsedMs / 60000);

  if (elapsedMinutes < 1) {
    return 'Updated just now';
  }

  if (elapsedMinutes < 60) {
    return `Updated ${elapsedMinutes} min ago`;
  }

  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    return `Updated ${elapsedHours}h ago`;
  }

  const elapsedDays = Math.round(elapsedHours / 24);
  if (elapsedDays === 1) {
    return 'Updated yesterday';
  }

  return `Updated ${elapsedDays}d ago`;
}
