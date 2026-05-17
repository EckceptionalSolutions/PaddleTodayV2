import Constants, { ExecutionEnvironment } from 'expo-constants';
import type { ComponentType } from 'react';

type EventProperties = Record<string, boolean | number | string | null | undefined>;
type FirebaseBridge = {
  logEvent(name: string, properties: EventProperties): Promise<void>;
  recordError(error: Error, context?: { name?: string; extra?: EventProperties }): Promise<void>;
};

let initialized = false;
let firebaseBridgePromise: Promise<FirebaseBridge | null> | null = null;

export function initObservability() {
  if (initialized) {
    return;
  }

  initialized = true;
  void firebaseBridge();
}

export function withObservability<P extends Record<string, unknown>>(component: ComponentType<P>) {
  return component;
}

export function captureAppException(error: unknown, context?: { name?: string; extra?: EventProperties }) {
  if (!isFirebaseDiagnosticsEnabled()) {
    return;
  }

  void firebaseBridge().then((bridge) => bridge?.recordError(toError(error), context));
}

export function trackAppEvent(name: string, properties?: EventProperties) {
  if (!isFirebaseDiagnosticsEnabled()) {
    return;
  }

  void firebaseBridge().then((bridge) => bridge?.logEvent(name, properties ?? {}));
}

export function observabilityStatus() {
  return {
    enabled: isFirebaseDiagnosticsEnabled(),
    environment: appEnvironment(),
    release: appRelease(),
  };
}

function appEnvironment() {
  return process.env.EXPO_PUBLIC_APP_ENV?.trim() || (__DEV__ ? 'development' : 'production');
}

function appRelease() {
  const slug = Constants.expoConfig?.slug ?? 'paddletoday-mobile';
  const version = Constants.expoConfig?.version ?? '0.0.0';
  return `${slug}@${version}`;
}

function isFirebaseDiagnosticsEnabled() {
  const environment = appEnvironment();
  return (
    !__DEV__ &&
    (environment === 'preview' || environment === 'production') &&
    Constants.executionEnvironment !== ExecutionEnvironment.StoreClient
  );
}

function firebaseBridge() {
  if (!isFirebaseDiagnosticsEnabled()) {
    return Promise.resolve(null);
  }

  firebaseBridgePromise ??= loadFirebaseBridge();
  return firebaseBridgePromise;
}

async function loadFirebaseBridge(): Promise<FirebaseBridge | null> {
  try {
    const [analyticsModule, crashlyticsModule] = await Promise.all([
      import('@react-native-firebase/analytics'),
      import('@react-native-firebase/crashlytics'),
    ]);

    const analytics = analyticsModule.getAnalytics();
    const crashlytics = crashlyticsModule.getCrashlytics();

    await Promise.all([
      analyticsModule.setAnalyticsCollectionEnabled(analytics, true),
      crashlyticsModule.setCrashlyticsCollectionEnabled(crashlytics, true),
      crashlyticsModule.setAttributes(crashlytics, {
        app_environment: appEnvironment(),
        app_release: appRelease(),
      }),
    ]);

    return {
      async logEvent(name, properties) {
        const eventName = firebaseEventName(name);
        const params = firebaseProperties(properties);

        await analyticsModule.logEvent(analytics, eventName, params);
        crashlyticsModule.log(crashlytics, eventName);
      },
      async recordError(error, context) {
        const attributes = firebaseStringProperties(context?.extra ?? {});
        if (context?.name) {
          attributes.handled_in = context.name;
        }

        if (Object.keys(attributes).length > 0) {
          await crashlyticsModule.setAttributes(crashlytics, attributes);
        }

        crashlyticsModule.recordError(crashlytics, error, context?.name);
      },
    };
  } catch (error) {
    if (__DEV__) {
      console.warn('Firebase diagnostics unavailable.', error);
    }
    return null;
  }
}

function firebaseEventName(name: string) {
  const normalized = name.replace(/[^A-Za-z0-9_]/g, '_').slice(0, 40);
  return /^[A-Za-z]/.test(normalized) ? normalized : `event_${normalized}`.slice(0, 40);
}

function firebaseProperties(properties: EventProperties) {
  const params: Record<string, number | string> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (value === null || value === undefined) {
      continue;
    }

    params[firebasePropertyName(key)] = firebasePropertyValue(value);
  }

  return params;
}

function firebaseStringProperties(properties: EventProperties) {
  return Object.fromEntries(
    Object.entries(firebaseProperties(properties)).map(([key, value]) => [key, String(value)])
  );
}

function firebasePropertyName(name: string) {
  const normalized = name.replace(/[^A-Za-z0-9_]/g, '_').slice(0, 40);
  return /^[A-Za-z]/.test(normalized) ? normalized : `param_${normalized}`.slice(0, 40);
}

function firebasePropertyValue(value: Exclude<EventProperties[string], null | undefined>) {
  return typeof value === 'boolean' ? String(value) : value;
}

function toError(error: unknown) {
  if (error instanceof Error) {
    return error;
  }

  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
}
