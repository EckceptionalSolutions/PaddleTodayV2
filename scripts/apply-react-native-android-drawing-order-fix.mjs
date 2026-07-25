import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// React Native 0.81.5 clears its drawing-order field when Android reports a
// stale child index, but keeps using the stale local array for that frame.
// Refreshing the local value makes the existing rebuild branch run immediately.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target = resolve(
  root,
  'node_modules/react-native/ReactAndroid/src/main/java/com/facebook/react/uimanager/ViewGroupDrawingOrderHelper.kt'
);

const staleDrawingOrder = `      update()
    }

    if (currentDrawingOrderIndices == null) {`;

const refreshedDrawingOrder = `      update()
      currentDrawingOrderIndices = null
    }

    if (currentDrawingOrderIndices == null) {`;

const source = await readFile(target, 'utf8');

if (source.includes(refreshedDrawingOrder)) {
  console.log('React Native Android drawing-order fix is already applied.');
  process.exit(0);
}

if (!source.includes(staleDrawingOrder)) {
  throw new Error(
    'React Native ViewGroupDrawingOrderHelper.kt no longer matches the expected source. ' +
      'Review the upstream implementation before changing React Native versions.'
  );
}

if (process.argv.includes('--check')) {
  throw new Error('React Native Android drawing-order fix has not been applied.');
}

await writeFile(target, source.replace(staleDrawingOrder, refreshedDrawingOrder), 'utf8');
console.log('Applied React Native Android drawing-order fix.');
