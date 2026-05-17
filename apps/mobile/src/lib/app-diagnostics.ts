import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import { resolveApiBaseUrl } from './api-base-url';
import { observabilityStatus } from './observability';

export interface AppDiagnosticRow {
  label: string;
  value: string;
}

export function appDiagnosticRows(): AppDiagnosticRow[] {
  const observability = observabilityStatus();

  return [
    {
      label: 'App',
      value: `${appName()} ${appVersion()}`,
    },
    {
      label: 'Build',
      value: nativeBuildLabel(),
    },
    {
      label: 'Runtime',
      value: `${Platform.OS} ${runtimeLabel()}`,
    },
    {
      label: 'Environment',
      value: observability.environment,
    },
    {
      label: 'Route feed',
      value: resolveApiBaseUrl(),
    },
    {
      label: 'Errors',
      value: observability.enabled ? 'Diagnostics enabled' : 'Diagnostics not configured',
    },
  ];
}

function appName() {
  return Constants.expoConfig?.name ?? 'PaddleToday';
}

function appVersion() {
  return Constants.nativeApplicationVersion ?? Constants.expoConfig?.version ?? 'unknown';
}

function nativeBuildLabel() {
  const nativeBuild = Constants.nativeBuildVersion;
  if (nativeBuild) {
    return nativeBuild;
  }

  const iosBuild = Constants.expoConfig?.ios?.buildNumber;
  const androidBuild = Constants.expoConfig?.android?.versionCode;
  return iosBuild ?? androidBuild?.toString() ?? 'unknown';
}

function runtimeLabel() {
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    return 'Expo Go';
  }

  if (Constants.executionEnvironment === ExecutionEnvironment.Bare) {
    return __DEV__ ? 'development build' : 'native build';
  }

  if (Constants.executionEnvironment === ExecutionEnvironment.Standalone) {
    return 'standalone';
  }

  return __DEV__ ? 'development' : 'release';
}
