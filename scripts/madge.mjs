import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const madge = require('madge');

const roots = [
  'src',
  'scripts',
  'apps/mobile/app',
  'apps/mobile/src',
  'packages/api-client/src',
  'packages/api-contract/src',
  'packages/design-tokens/src',
  'packages/geo/src',
  'packages/trip-pack/src',
];

const config = {
  fileExtensions: ['ts', 'tsx', 'js', 'mjs'],
  tsConfig: 'tsconfig.json',
  // Type-only barrel imports do not create runtime cycles. Ignoring them keeps
  // the graph focused on cycles that can affect module initialization.
  detectiveOptions: {
    ts: { skipTypeImports: true },
    tsx: { skipTypeImports: true },
  },
};

let failed = false;

for (const root of roots) {
  console.log(`\n[madge] ${root}`);

  try {
    const graph = await madge(root, config);
    const cycles = graph.circular();
    const skipped = graph.warnings().skipped;

    if (cycles.length > 0) {
      failed = true;
      console.error(`Found ${cycles.length} circular dependencies!`);
      cycles.forEach((cycle, index) => console.error(`${index + 1}) ${cycle.join(' > ')}`));
    } else {
      console.log('No circular dependency found!');
    }

    if (skipped.length > 0) {
      console.warn(`Skipped ${skipped.length} unresolved dependencies:`);
      skipped.forEach((file) => console.warn(file));
    }
  } catch (error) {
    failed = true;
    console.error(error instanceof Error ? error.message : error);
  }
}

process.exitCode = failed ? 1 : 0;
