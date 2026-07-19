import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Component, createElement, type ComponentType, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { recordFeedbackUsageEvent } from './feedback-usage';
import { colors, radius, spacing } from '../theme/tokens';

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
  const componentName = component.displayName || component.name || 'screen';

  function ObservedComponent(props: P) {
    return createElement(RenderErrorBoundary, { componentName }, ComponentRenderer(component, props));
  }

  ObservedComponent.displayName = `withObservability(${componentName})`;
  return ObservedComponent;
}

function ComponentRenderer<P extends Record<string, unknown>>(ComponentToRender: ComponentType<P>, props: P) {
  return createElement(ComponentToRender, props);
}

class RenderErrorBoundary extends Component<
  PropsWithChildren<{ componentName: string }>,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    captureAppException(error, {
      name: 'render_error',
      extra: {
        component: this.props.componentName,
        componentStack: errorInfo.componentStack ?? 'unknown',
      },
    });
  }

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return createElement(
      View,
      { style: styles.renderErrorState, accessibilityRole: 'alert' },
      createElement(Text, { style: styles.renderErrorTitle }, 'This screen needs a reset'),
      createElement(
        Text,
        { style: styles.renderErrorBody },
        'PaddleToday hit an unexpected display error. You can return to Today and try again.'
      ),
      createElement(
        Pressable,
        {
          style: styles.renderErrorButton,
          onPress: () => this.setState({ hasError: false }),
          accessibilityRole: 'button',
          accessibilityLabel: 'Try this screen again',
        },
        createElement(Text, { style: styles.renderErrorButtonText }, 'Try again')
      )
    );
  }
}

export function captureAppException(error: unknown, context?: { name?: string; extra?: EventProperties }) {
  if (!isFirebaseDiagnosticsEnabled()) {
    return;
  }

  void firebaseBridge().then((bridge) => bridge?.recordError(toError(error), context));
}

export function trackAppEvent(name: string, properties?: EventProperties) {
  void recordFeedbackUsageEvent(name, properties ?? {});

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

const styles = StyleSheet.create({
  renderErrorState: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  renderErrorTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
  },
  renderErrorBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  renderErrorButton: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  renderErrorButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
});
