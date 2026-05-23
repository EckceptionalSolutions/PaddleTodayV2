const { withPodfile } = require('@expo/config-plugins');

const withoutAdIdSupport = '$RNFirebaseAnalyticsWithoutAdIdSupport = true';

module.exports = function withRnFirebaseIosPrivacy(config) {
  return withPodfile(config, (config) => {
    const contents = config.modResults.contents;

    if (contents.includes(withoutAdIdSupport)) {
      return config;
    }

    config.modResults.contents = contents.replace(
      /^(platform :ios,.*)$/m,
      `$1\n${withoutAdIdSupport}`
    );

    return config;
  });
};
