import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import type { ComponentType } from 'react';
import { Platform } from 'react-native';

type EventProperties = Record<string, boolean | number | string | null | undefined>;

let initialized = false;

export function initObservability() {
  if (initialized) {
    return;
  }

  initialized = true;

  if (!isObservabilityEnabled()) {
    return;
  }

  Sentry.init({
    dsn: sentryDsn(),
    environment: appEnvironment(),
    release: appRelease(),
    dist: nativeBuildNumber(),
    tracesSampleRate: numericEnv(process.env.EXPO_PUBLIC_SENTRY_TRACES_SAMPLE_RATE, 0),
    enableAutoSessionTracking: true,
    attachStacktrace: true,
    beforeSend(event) {
      if (event.user) {
        delete event.user.email;
        delete event.user.username;
      }
      return event;
    },
  });

  Sentry.setTags({
    app: 'paddletoday-mobile',
    platform: Platform.OS,
    runtime: __DEV__ ? 'development' : 'release',
  });
}

export function withObservability<P extends Record<string, unknown>>(component: ComponentType<P>) {
  return isObservabilityEnabled() ? Sentry.wrap(component) : component;
}

export function captureAppException(error: unknown, context?: { name?: string; extra?: EventProperties }) {
  if (!isObservabilityEnabled()) {
    return;
  }

  Sentry.withScope((scope) => {
    if (context?.name) {
      scope.setTag('handled_in', context.name);
    }
    if (context?.extra) {
      scope.setExtras(cleanProperties(context.extra));
    }
    Sentry.captureException(error);
  });
}

export function trackAppEvent(name: string, properties?: EventProperties) {
  if (!isObservabilityEnabled()) {
    return;
  }

  Sentry.addBreadcrumb({
    category: 'product',
    level: 'info',
    message: name,
    data: cleanProperties(properties ?? {}),
  });
}

export function observabilityStatus() {
  return {
    enabled: isObservabilityEnabled(),
    environment: appEnvironment(),
    release: appRelease(),
  };
}

function isObservabilityEnabled() {
  return Boolean(sentryDsn());
}

function sentryDsn() {
  return process.env.EXPO_PUBLIC_SENTRY_DSN?.trim() ?? '';
}

function appEnvironment() {
  return process.env.EXPO_PUBLIC_APP_ENV?.trim() || (__DEV__ ? 'development' : 'production');
}

function appRelease() {
  const slug = Constants.expoConfig?.slug ?? 'paddletoday-mobile';
  const version = Constants.expoConfig?.version ?? '0.0.0';
  return `${slug}@${version}`;
}

function nativeBuildNumber() {
  return (
    Constants.expoConfig?.ios?.buildNumber ??
    Constants.expoConfig?.android?.versionCode?.toString() ??
    undefined
  );
}

function numericEnv(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function cleanProperties(properties: EventProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  );
}
