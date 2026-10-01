export const QUERY_CACHE_STORAGE_KEY = 'paddletoday-mobile-query-cache';
export const QUERY_CACHE_FILE_NAME = 'paddletoday-route-cache-v2.json';

const QUERY_CACHE_SCHEMA_VERSION = 2;

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
