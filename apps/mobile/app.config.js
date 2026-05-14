const appJson = require('./app.json');

const androidGoogleMapsApiKey = process.env.GOOGLE_MAPS_ANDROID_API_KEY?.trim();

module.exports = {
  expo: {
    ...appJson.expo,
    android: {
      ...appJson.expo.android,
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
