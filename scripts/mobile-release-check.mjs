import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const mobileRoot = join(root, 'apps/mobile');
const checks = [];

check('apps/mobile/app.config.base.json parses', () => readJson(join(mobileRoot, 'app.config.base.json')));
check('apps/mobile/eas.json parses', () => readJson(join(mobileRoot, 'eas.json')));

const appConfig = readJson(join(mobileRoot, 'app.config.base.json')).expo;
const easConfig = readJson(join(mobileRoot, 'eas.json'));
const mobilePackage = readJson(join(mobileRoot, 'package.json'));

check('Expo app name is set', () => Boolean(appConfig.name));
check('Expo slug is set', () => Boolean(appConfig.slug));
check('iOS bundle identifier is set', () => Boolean(appConfig.ios?.bundleIdentifier));
check('Android package is set', () => Boolean(appConfig.android?.package));
check('iOS buildNumber is set', () => Boolean(appConfig.ios?.buildNumber));
check('Android versionCode is set', () => Number.isInteger(appConfig.android?.versionCode));
check('Location permission copy is configured', () => pluginText('expo-location', 'locationWhenInUsePermission').length > 20);
check('Photo permission copy is configured', () => pluginText('expo-image-picker', 'photosPermission').length > 20);
check('Firebase app dependency is installed', () => hasDependency('@react-native-firebase/app'));
check('Firebase analytics dependency is installed', () => hasDependency('@react-native-firebase/analytics'));
check('Firebase crashlytics dependency is installed', () => hasDependency('@react-native-firebase/crashlytics'));

checkPng('mobile icon', join(mobileRoot, 'assets/images/icon.png'), 1024, 1024, 100_000);
checkPng('mobile adaptive icon', join(mobileRoot, 'assets/images/adaptive-icon.png'), 1024, 1024, 75_000);
checkPng('mobile splash icon', join(mobileRoot, 'assets/images/splash-icon.png'), 1024, 1024, 75_000);
checkPng('mobile favicon', join(mobileRoot, 'assets/images/favicon.png'), 48, 48, 1_000);
checkFile('mobile icon generation script', join(root, 'scripts/generate-mobile-icons.mjs'));
checkFile('source brand icon asset', join(root, 'public/brand/paddle-today-logo-transparent-512-clean.png'));
checkFile('mobile app config', join(mobileRoot, 'app.config.js'));
checkFile('Firebase diagnostics config', join(mobileRoot, 'firebase.json'));
checkFile('Firebase native config instructions', join(mobileRoot, 'firebase/README.md'));
check('Firebase Android config matches app package', () => {
  const firebaseConfig = readJson(join(mobileRoot, 'firebase/google-services.json'));
  return firebaseConfig.client?.some(
    (client) => client.client_info?.android_client_info?.package_name === appConfig.android?.package
  );
});
check('Firebase iOS config matches bundle identifier', () => {
  const plist = readFileSync(join(mobileRoot, 'firebase/GoogleService-Info.plist'), 'utf8');
  return plistValue(plist, 'BUNDLE_ID') === appConfig.ios?.bundleIdentifier;
});
checkFile('Metro config', join(mobileRoot, 'metro.config.js'));

for (const profile of ['development', 'preview', 'production']) {
  const env = easConfig.build?.[profile]?.env ?? {};
  check(`${profile} build uses production API`, () => env.EXPO_PUBLIC_API_BASE_URL === 'https://paddletoday.com');
  check(`${profile} build declares app env`, () => env.EXPO_PUBLIC_APP_ENV === profile);
}

check('production Android build creates app bundle', () => easConfig.build?.production?.android?.buildType === 'app-bundle');
check('production build uses explicit native versions', () => easConfig.build?.production?.autoIncrement !== true);

for (const file of [
  'docs/mobile-store-release-checklist.md',
  'docs/mobile-analytics-mvp-decision.md',
  'docs/mobile-eas-internal-build-runbook.md',
  'docs/mobile-eas-readiness.md',
  'docs/mobile-native-qa-plan.md',
  'docs/mobile-store-listing-draft.md',
  'docs/mobile-store-category-content-rating.md',
  'docs/mobile-store-metadata-decisions.md',
  'docs/mobile-store-privacy-worksheet.md',
  'docs/mobile-store-screenshot-plan.md',
  'docs/mobile-observability.md',
  'docs/mobile-firebase-setup.md',
  'docs/mobile-saved-rivers-mvp-decision.md',
  'docs/mobile-support-triage.md',
  'src/pages/privacy.astro',
  'src/pages/terms.astro',
]) {
  checkFile(file, join(root, file));
}

check('privacy page mentions route reports/photos', () =>
  fileIncludes(join(root, 'src/pages/privacy.astro'), ['route reports', 'photos'])
);
check('terms page mentions route reports/photos', () =>
  fileIncludes(join(root, 'src/pages/terms.astro'), ['Route reports', 'photos'])
);

const failed = checks.filter((item) => !item.ok);
for (const item of checks) {
  const marker = item.ok ? 'ok' : 'fail';
  console.log(`${marker} - ${item.name}${item.detail ? ` (${item.detail})` : ''}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} release readiness check${failed.length === 1 ? '' : 's'} failed.`);
  process.exit(1);
}

console.log(`\n${checks.length} release readiness checks passed.`);

function check(name, fn) {
  try {
    const result = fn();
    checks.push({
      name,
      ok: Boolean(result),
      detail: typeof result === 'string' ? result : '',
    });
  } catch (error) {
    checks.push({
      name,
      ok: false,
      detail: error instanceof Error ? error.message : 'unknown error',
    });
  }
}

function checkFile(name, path) {
  check(name, () => {
    if (!existsSync(path)) return false;
    return statSync(path).size > 0;
  });
}

function checkPng(name, path, expectedWidth, expectedHeight, minBytes) {
  check(name, () => {
    if (!existsSync(path)) return false;

    const buffer = readFileSync(path);
    const isPng = buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    if (!isPng) return 'not a PNG';

    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    const size = statSync(path).size;
    const valid = width === expectedWidth && height === expectedHeight && size >= minBytes;

    return valid ? `${width}x${height}, ${Math.round(size / 1024)}KB` : `${width}x${height}, ${size} bytes`;
  });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function pluginText(pluginName, key) {
  const plugin = appConfig.plugins?.find((candidate) => Array.isArray(candidate) && candidate[0] === pluginName);
  if (!Array.isArray(plugin)) return '';
  const options = plugin[1];
  return typeof options?.[key] === 'string' ? options[key] : '';
}

function hasDependency(packageName) {
  return Boolean(mobilePackage.dependencies?.[packageName] ?? mobilePackage.devDependencies?.[packageName]);
}

function fileIncludes(path, needles) {
  const text = readFileSync(path, 'utf8');
  return needles.every((needle) => text.includes(needle));
}

function plistValue(text, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = text.match(new RegExp(`<key>${escapedKey}</key>\\s*<string>([^<]+)</string>`));
  return match?.[1] ?? '';
}
