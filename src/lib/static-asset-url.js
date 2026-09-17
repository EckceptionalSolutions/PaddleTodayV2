/** Public gallery/map files live locally in development and in Blob Storage in frontend releases. */
export function staticAssetUrl(path, base = import.meta.env?.PUBLIC_ASSET_BASE_URL || '') {
  if (typeof path !== 'string' || !/^\/(?:gallery|data)\//.test(path) || !base) return path;
  return `${base.replace(/\/+$/, '')}${path}`;
}
