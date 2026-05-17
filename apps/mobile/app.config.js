const { existsSync } = require('node:fs');
const { join } = require('node:path');
const appJson = require('./app.json');

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

module.exports = {
  expo: {
    ...appJson.expo,
    plugins: [
      ...(appJson.expo.plugins ?? []),
      ...(firebaseDiagnosticsEnabled
        ? ['@react-native-firebase/app', '@react-native-firebase/crashlytics']
        : []),
    ],
    ios: {
      ...appJson.expo.ios,
      ...(firebaseDiagnosticsEnabled
        ? {
            googleServicesFile: firebaseIosConfig,
          }
        : {}),
    },
    android: {
      ...appJson.expo.android,
      ...(firebaseDiagnosticsEnabled
        ? {
            googleServicesFile: firebaseAndroidConfig,
          }
        : {}),
      ...(androidGoogleMapsApiKey
        ? {
            config: {
              ...(appJson.expo.android?.config ?? {}),
              googleMaps: {
                ...(appJson.expo.android?.config?.googleMaps ?? {}),
                apiKey: androidGoogleMapsApiKey,
              },
            },
          }
        : {}),
    },
  },
};
