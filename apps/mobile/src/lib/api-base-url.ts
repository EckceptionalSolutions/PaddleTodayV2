import Constants from 'expo-constants';
import * as ExpoLinking from 'expo-linking';

const DEFAULT_API_PORT = 4323;

export function resolveApiBaseUrl() {
  const configured = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  if (configured) {
    return trimTrailingSlash(configured);
  }

  const host = hostFromExpoDevServer() ?? hostFromExpoLink();
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
    return hostFromUrl(url);
  } catch {
    return null;
  }
}

function hostFromExpoDevServer() {
  return firstHost([
    Constants.expoConfig?.hostUri,
    Constants.platform?.hostUri,
    Constants.linkingUri,
    Constants.experienceUrl,
  ]);
}

function firstHost(values: Array<string | null | undefined>) {
  for (const value of values) {
    const host = hostFromUrl(value);
    if (host) {
      return host;
    }
  }

  return null;
}

function hostFromUrl(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    const normalized = value.startsWith('exp://')
      ? value.replace('exp://', 'http://')
      : value.startsWith('exps://')
        ? value.replace('exps://', 'https://')
        : value.includes('://')
          ? value
          : `http://${value}`;

    const host = new URL(normalized).hostname;
    if (!host || host.endsWith('.exp.direct')) {
      return null;
    }

    return host;
  } catch {
    return null;
  }
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}
