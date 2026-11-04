import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile } from 'node:fs/promises';
import { planRegistryImports, verifyRegistryCopy } from './lib/registry-consolidation.mjs';

const run = promisify(execFile);
const source = 'paddletodayjobs';
const destination = 'ahmqiry64didw24';
const repository = 'paddletoday/snapshot-worker';
const sourceId = '/subscriptions/a2cc52c3-7f4e-4de7-bf59-9cc6f99bc8e2/resourceGroups/paddletoday/providers/Microsoft.ContainerRegistry/registries/paddletodayjobs';
async function az(args) {
  const windows = process.platform === 'win32';
  const { stdout } = await run(windows ? (process.env.ComSpec || 'cmd.exe') : 'az',
    windows ? ['/d', '/s', '/c', 'az.cmd', ...args] : args,
    { windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  return stdout.trim() ? JSON.parse(stdout) : null;
}
async function inventory(registry) {
  const repositories = await az(['acr', 'repository', 'list', '--name', registry, '-o', 'json', '--only-show-errors']);
  return repositories.includes(repository)
    ? az(['acr', 'manifest', 'list-metadata', '--registry', registry, '--name', repository, '-o', 'json', '--only-show-errors']) : [];
}

try {
  await mkdir('.local/registry-consolidation', { recursive: true });
  const original = await inventory(source);
  const target = await inventory(destination);
  const plan = planRegistryImports(original, target);
  await writeFile('.local/registry-consolidation/source-manifests.json', JSON.stringify(original, null, 2));
  await writeFile('.local/registry-consolidation/import-plan.json', JSON.stringify({ source, sourceId, destination, repository, plan }, null, 2));
  console.log(JSON.stringify({ source, destination, manifests: plan.length, importsNeeded: plan.filter(item => item.missingTags.length).length, apply: process.argv.includes('--apply') }));
  if (!process.argv.includes('--apply')) process.exit(0);
  let cursor = 0, completed = 0, failed = false;
  const pending = plan.filter(item => item.missingTags.length);
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (!failed && cursor < pending.length) {
      const item = pending[cursor++];
      try {
        await az(['acr', 'import', '--name', destination, '--registry', sourceId, '--source', `${repository}@${item.digest}`,
          ...item.missingTags.flatMap(tag => ['--image', `${repository}:${tag}`]), '--only-show-errors', '--output', 'none']);
        completed++;
        if (completed % 10 === 0 || completed === pending.length) console.log(`Copied ${completed}/${pending.length} manifests.`);
      } catch (error) { failed = true; throw error; }
    }
  }));
  const verification = verifyRegistryCopy(original, await inventory(destination));
  await writeFile('.local/registry-consolidation/copy-verification.json', JSON.stringify({ verifiedAt: new Date().toISOString(), source, destination, repository, ...verification }, null, 2));
  console.log(JSON.stringify(verification));
  console.log('Images preserved. Registry retirement requires a separate active-reference and pull verification.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
