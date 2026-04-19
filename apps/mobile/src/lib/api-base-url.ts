import * as ExpoLinking from 'expo-linking';

const DEFAULT_API_PORT = 4322;

export function resolveApiBaseUrl() {
  const configured = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  if (configured) {
    return trimTrailingSlash(configured);
  }

  const host = hostFromExpoLink();
  if (host) {
    return `http://${host}:${DEFAULT_API_PORT}`;
  }

  return `http://127.0.0.1:${DEFAULT_API_PORT}`;
}

export function resolveApiUrl(path: string) {
  return new URL(path, `${resolveApiBaseUrl()}/`).toString();
}

function hostFromExpoLink() {
  try {
    const url = ExpoLinking.createURL('/');
    const normalized = url.startsWith('exp://')
      ? url.replace('exp://', 'http://')
      : url.startsWith('exps://')
        ? url.replace('exps://', 'https://')
        : null;

    if (!normalized) {
      return null;
    }

    return new URL(normalized).hostname || null;
  } catch {
    return null;
  }
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}
