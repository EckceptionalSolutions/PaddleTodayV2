const required = [
  'PUBLIC_FIREBASE_API_KEY',
  'PUBLIC_FIREBASE_AUTH_DOMAIN',
  'PUBLIC_FIREBASE_PROJECT_ID',
  'PUBLIC_FIREBASE_APP_ID',
];
const missing = required.filter((name) => !process.env[name]?.trim());
if (missing.length) {
  console.error(`Production web sign-in build is missing: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Firebase web sign-in build settings are present.');
