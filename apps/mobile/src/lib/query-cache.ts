export const QUERY_CACHE_STORAGE_KEY = 'paddletoday-mobile-query-cache';

const QUERY_CACHE_SCHEMA_VERSION = 1;

export function queryCacheBuster(
  appVersion: string | null | undefined,
  buildVersion: string | null | undefined
) {
  return [
    'paddletoday-mobile',
    `schema-${QUERY_CACHE_SCHEMA_VERSION}`,
    normalizedVersion(appVersion),
    normalizedVersion(buildVersion),
  ].join(':');
}

function normalizedVersion(value: string | null | undefined) {
  return value?.trim() || 'unknown';
}
