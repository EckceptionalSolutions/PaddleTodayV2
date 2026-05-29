const { existsSync } = require('node:fs');
const { join } = require('node:path');
const baseAppConfig = require('./app.config.base.json');

const androidGoogleMapsApiKey = process.env.GOOGLE_MAPS_ANDROID_API_KEY?.trim();
const appEnvironment = process.env.EXPO_PUBLIC_APP_ENV?.trim();
const firebaseDiagnosticsEnabled = appEnvironment === 'preview' || appEnvironment === 'production';
const firebaseIosConfig = './firebase/GoogleService-Info.plist';
const firebaseAndroidConfig = './firebase/google-services.json';
const firebaseIosConfigPath = join(__dirname, firebaseIosConfig);
const firebaseAndroidConfigPath = join(__dirname, firebaseAndroidConfig);

if (firebaseDiagnosticsEnabled) {
  const missingFirebaseFiles = [
    [firebaseIosConfig, firebaseIosConfigPath],
    [firebaseAndroidConfig, firebaseAndroidConfigPath],
  ]
    .filter(([, path]) => !existsSync(path))
    .map(([relativePath]) => relativePath);

  if (missingFirebaseFiles.length > 0) {
    throw new Error(
      `Firebase diagnostics are enabled for ${appEnvironment}, but missing ${missingFirebaseFiles.join(', ')}. Add the Firebase iOS and Android config files before building this profile.`
    );
  }
}

module.exports = ({ config }) => {
  const baseConfig = {
    ...config,
    ...baseAppConfig.expo,
    android: {
      ...config.android,
      ...baseAppConfig.expo.android,
      blockedPermissions: [
        ...new Set([
          ...(config.android?.blockedPermissions ?? []),
          ...(baseAppConfig.expo.android?.blockedPermissions ?? []),
          'android.permission.RECORD_AUDIO',
        ]),
      ],
    },
    ios: {
      ...config.ios,
      ...baseAppConfig.expo.ios,
    },
    web: {
      ...config.web,
      ...baseAppConfig.expo.web,
    },
  };

  return {
    expo: {
      ...baseConfig,
      plugins: [
        ...(baseConfig.plugins ?? []),
        ...(firebaseDiagnosticsEnabled
          ? ['@react-native-firebase/app', '@react-native-firebase/crashlytics']
          : []),
      ],
      ios: {
        ...baseConfig.ios,
        ...(firebaseDiagnosticsEnabled
          ? {
              googleServicesFile: firebaseIosConfig,
            }
          : {}),
      },
      android: {
        ...baseConfig.android,
        ...(firebaseDiagnosticsEnabled
          ? {
              googleServicesFile: firebaseAndroidConfig,
            }
          : {}),
        ...(androidGoogleMapsApiKey
          ? {
              config: {
                ...(baseConfig.android?.config ?? {}),
                googleMaps: {
                  ...(baseConfig.android?.config?.googleMaps ?? {}),
                  apiKey: androidGoogleMapsApiKey,
                },
              },
            }
          : {}),
      },
    },
  };
};
