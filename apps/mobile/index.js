// Keep Expo's entry point inside the mobile workspace. This matters when the
// local dependency tree is junction-linked to a temporary directory on
// Windows: Expo otherwise turns the real dependency path into the web bundle
// URL and Metro cannot resolve it from the monorepo root.
require('expo-router/entry');
